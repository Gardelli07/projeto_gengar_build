import { stripAccents } from "./normalize";

// Para cada letra, quais caracteres costumam ser usados no lugar dela.
// '@' entra nas vogais porque na prática é usado para disfarçar qualquer
// vogal (p@rr@, @assedio), não só o "a" do leetspeak clássico.
const LETTER_CLASSES: Record<string, string> = {
  a: "a4@αª",
  b: "b8",
  c: "c({[<¢",
  e: "e3@",
  g: "g6",
  h: "h#",
  i: "i1!|@",
  l: "l1",
  o: "o0@º°ø",
  s: "s5$",
  t: "t7+",
  u: "u@",
  z: "z2",
};

// Ruído tolerado entre letras: espaços e pontuação usados para "separar" as
// letras de um palavrão (p o r r a / p.o.r.r.a / p_o_r_r_a / p:o;r,r/a...).
const SEPARATOR = "[\\s._*~^'\"`,;:!?/\\\\|+=&@#%(){}\\[\\]<>-]*";

// Abaixo desse tamanho (em letras já sem repetição), exigimos que o termo
// esteja isolado por um limite de palavra — senão "cu" bloquearia "documento"
// e "pau" bloquearia "pauta". Termos mais longos são específicos o bastante
// para serem buscados como substring livre, o que também pega casos "colados"
// (ex: "eh1umaPORRAaqui").
const MIN_LENGTH_WITHOUT_BOUNDARY = 6;

// Plural mais comum do português é só acrescentar "s" (porra -> porras).
// Permitir esse sufixo antes do limite de palavra é seguro (baixíssimo risco
// de casar com outra coisa) e evita depender de uma entrada por variação.
const PLURAL_SUFFIX = "(?:s)?";

function escapeForCharClass(chars: string): string {
  return chars.replace(/[\\\]^-]/g, "\\$&");
}

function toBaseLetters(term: string): string {
  const lower = stripAccents(term.toLowerCase());
  const lettersOnly = lower.replace(/[^a-z]/g, "");
  return lettersOnly.replace(/(.)\1+/g, "$1");
}

/**
 * Constrói um regex tolerante a disfarces para um termo do dicionário:
 * cada letra vira uma classe de caracteres (com seus substitutos leetspeak),
 * e entre letras é permitido qualquer quantidade de separadores/pontuação.
 * Retorna null para termos vazios (ex: um termo só com pontuação).
 */
export function buildPattern(term: string): RegExp | null {
  const letters = toBaseLetters(term);
  if (!letters) return null;

  // "[cls]+" pega repetições coladas (rr, rrrr); o "(?:SEP[cls]+)*" extra
  // cobre repetições com separador no meio (r r, r.r) sem exigir uma
  // contagem exata de letras — o dicionário não precisa saber quantos "r"
  // o usuário digitou, só que a letra se repete.
  const groups = letters.split("").map((letter) => {
    const cls = escapeForCharClass(LETTER_CLASSES[letter] ?? letter);
    return `[${cls}]+(?:${SEPARATOR}[${cls}]+)*`;
  });

  const core = groups.join(SEPARATOR);
  const pattern =
    letters.length < MIN_LENGTH_WITHOUT_BOUNDARY
      ? `(?<![a-z])${core}${PLURAL_SUFFIX}(?![a-z])`
      : core;

  return new RegExp(pattern, "i");
}
