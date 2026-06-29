import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "@lingueto:access_token";
const DEFAULT_TIMEOUT = 15000;

export const API_URL = (process.env.EXPO_PUBLIC_API_URL || "").replace(
  /\/+$/,
  "",
);

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function setAccessToken(token) {
  if (!token) {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }

  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export function removeAccessToken() {
  return AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
}

function buildUrl(endpoint, params) {
  if (!API_URL) {
    throw new ApiError(
      "Defina EXPO_PUBLIC_API_URL no arquivo .env antes de usar a API.",
    );
  }

  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const query = Object.entries(params || {})
    .filter(([, value]) => value !== undefined && value !== null)
    .flatMap(([key, value]) => {
      const values = Array.isArray(value) ? value : [value];

      return values.map(
        (item) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`,
      );
    })
    .join("&");

  return `${API_URL}${path}${query ? `?${query}` : ""}`;
}

async function parseResponse(response) {
  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request(
  endpoint,
  {
    method = "GET",
    data,
    params,
    headers = {},
    authenticated = true,
    timeout = DEFAULT_TIMEOUT,
  } = {},
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const token = authenticated ? await getAccessToken() : null;
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;

    const response = await fetch(buildUrl(endpoint, params), {
      method,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(!isFormData && data !== undefined
          ? { "Content-Type": "application/json" }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...(data !== undefined
        ? { body: isFormData ? data : JSON.stringify(data) }
        : {}),
    });

    const responseData = await parseResponse(response);

    if (!response.ok) {
      const message =
        responseData?.message ||
        responseData?.erro ||
        responseData?.error ||
        `Erro ${response.status} ao acessar a API.`;

      throw new ApiError(message, response.status, responseData);
    }

    return responseData;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error.name === "AbortError") {
      throw new ApiError("A API demorou demais para responder.");
    }

    throw new ApiError(
      "Não foi possível conectar à API. Verifique sua internet e o endereço configurado.",
      0,
      error,
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, data, options) =>
    request(endpoint, { ...options, method: "POST", data }),
  put: (endpoint, data, options) =>
    request(endpoint, { ...options, method: "PUT", data }),
  patch: (endpoint, data, options) =>
    request(endpoint, { ...options, method: "PATCH", data }),
  delete: (endpoint, options) =>
    request(endpoint, { ...options, method: "DELETE" }),
};

export default api;
