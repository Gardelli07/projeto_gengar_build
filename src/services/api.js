import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "@lingueto:access_token";
const LAST_GOOD_API_URL_KEY = "@lingueto:api_url";
const DEFAULT_TIMEOUT = 15000;

// EXPO_PUBLIC_API_URL pode conter varias URLs separadas por virgula
// (ex.: uma por rede/roteador). A primeira que responder vira a atual,
// e essa escolha e lembrada para as proximas requisicoes.
const API_URL_CANDIDATES = (process.env.EXPO_PUBLIC_API_URL || "")
  .split(",")
  .map((url) => url.trim().replace(/\/+$/, ""))
  .filter(Boolean);

export let API_URL = API_URL_CANDIDATES[0] || "";

AsyncStorage.getItem(LAST_GOOD_API_URL_KEY)
  .then((saved) => {
    if (saved && API_URL_CANDIDATES.includes(saved)) API_URL = saved;
  })
  .catch(() => {});

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

function buildUrl(base, endpoint, params) {
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

  return `${base}${path}${query ? `?${query}` : ""}`;
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

async function attempt(base, endpoint, { method, data, params, headers, token, isFormData, timeout }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(buildUrl(base, endpoint, params), {
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
  } finally {
    clearTimeout(timeoutId);
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
  if (API_URL_CANDIDATES.length === 0) {
    throw new ApiError(
      "Defina EXPO_PUBLIC_API_URL no arquivo .env antes de usar a API.",
    );
  }

  const token = authenticated ? await getAccessToken() : null;
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  const orderedBases = [
    API_URL,
    ...API_URL_CANDIDATES.filter((url) => url !== API_URL),
  ].filter(Boolean);

  let lastError = null;

  for (let i = 0; i < orderedBases.length; i += 1) {
    const base = orderedBases[i];
    const isLastCandidate = i === orderedBases.length - 1;
    // Hosts que nao sao o ultimo candidato usam um timeout curto, so
    // para descobrir rapido se estao fora do ar e trocar de rede.
    const attemptTimeout = isLastCandidate ? timeout : Math.min(timeout, 5000);

    try {
      const responseData = await attempt(base, endpoint, {
        method,
        data,
        params,
        headers,
        token,
        isFormData,
        timeout: attemptTimeout,
      });

      if (base !== API_URL) {
        API_URL = base;
        AsyncStorage.setItem(LAST_GOOD_API_URL_KEY, base).catch(() => {});
      }

      return responseData;
    } catch (error) {
      // Erro HTTP real (a API respondeu) — nao adianta tentar outro host.
      if (error instanceof ApiError) throw error;

      lastError = error;
      // Falha de rede/conexao — tenta o proximo host candidato.
    }
  }

  if (lastError?.name === "AbortError") {
    throw new ApiError("A API demorou demais para responder.");
  }

  throw new ApiError(
    "Não foi possível conectar à API. Verifique sua internet e o endereço configurado.",
    0,
    lastError,
  );
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
