// profanityFilter.js — porta em JS puro do motor "badwords-filter"
// (originalmente prototipado em TypeScript na pasta /badwords) para uso
// dentro do app React Native/Expo, que não tem TypeScript configurado.
//
// O dicionário (badwordsList.json, neste mesmo diretório) é a fonte de
// dados — edite só esse arquivo pra adicionar/remover termos, nunca
// duplique a lista aqui. É a mesma estrutura de dados a ser usada quando
// esse bloqueio for implementado no backend.
//
// Resistente a disfarces comuns: maiúsculas, acentos, leetspeak (p0rra,
// p@rr@), letras repetidas (porraaaa) e espaçamento/pontuação entre letras
// (p o r r a, p.o.r.r.a).
//
// Limitações conhecidas (por design, não bugs):
// - termos com 5 letras ou menos (cu, pau, fdp) só bloqueiam quando isolados
//   por espaço/pontuação, senão "cu" bloquearia "documento";
// - mascaramento total por símbolo ("p***a") não é suportado de propósito;
// - omissão de letra ("prra" sem repetir) não é pega genericamente.

import wordlist from "./badwordsList.json";

function stripAccents(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Para cada letra, quais caracteres costumam ser usados no lugar dela.
const LETTER_CLASSES = {
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
// letras de um palavrão (p o r r a / p.o.r.r.a / p_o_r_r_a...).
const SEPARATOR = "[\\s._*~^'\"`,;:!?/\\\\|+=&@#%(){}\\[\\]<>-]*";

// Abaixo desse tamanho (letras já sem repetição), exigimos que o termo
// esteja isolado por limite de palavra — senão "cu" bloquearia "documento".
const MIN_LENGTH_WITHOUT_BOUNDARY = 6;

// Plural mais comum do português é só acrescentar "s".
const PLURAL_SUFFIX = "(?:s)?";

// Mensagens absurdamente longas custariam caro para casar contra cada
// padrão; um corte generoso não perde detecção em uso normal.
const MAX_INPUT_LENGTH = 10_000;

function escapeForCharClass(chars) {
  return chars.replace(/[\\\]^-]/g, "\\$&");
}

function toBaseLetters(term) {
  const lower = stripAccents(term.toLowerCase());
  const lettersOnly = lower.replace(/[^a-z]/g, "");
  return lettersOnly.replace(/(.)\1+/g, "$1");
}

function buildPattern(term) {
  const letters = toBaseLetters(term);
  if (!letters) return null;

  const groups = letters.split("").map((letter) => {
    const cls = escapeForCharClass(LETTER_CLASSES[letter] || letter);
    return `[${cls}]+(?:${SEPARATOR}[${cls}]+)*`;
  });

  const core = groups.join(SEPARATOR);
  const pattern =
    letters.length < MIN_LENGTH_WITHOUT_BOUNDARY
      ? `(?<![a-z])${core}${PLURAL_SUFFIX}(?![a-z])`
      : core;

  return new RegExp(pattern, "i");
}

const compiledEntries = [];
for (const [category, entries] of Object.entries(wordlist)) {
  for (const entry of entries) {
    const pattern = buildPattern(entry.term);
    if (!pattern) continue;
    compiledEntries.push({
      pattern,
      match: {
        term: entry.term,
        category,
        severity: entry.severity,
        subcategoria: entry.subcategoria,
        contextual: entry.contextual || false,
      },
    });
  }
}

/**
 * Analisa um texto em busca de termos ofensivos.
 * `blocked` só é true quando encontra pelo menos 1 termo não-contextual
 * (termos contextuais como "gordo"/"macaco" entram em `matches` mas
 * dependem de revisão humana pra saber se são ofensa de fato).
 */
export function analyze(text) {
  if (!text || typeof text !== "string") {
    return { blocked: false, matches: [] };
  }

  const prepared = stripAccents(text.toLowerCase()).slice(0, MAX_INPUT_LENGTH);

  const matches = [];
  for (const entry of compiledEntries) {
    if (entry.pattern.test(prepared)) {
      matches.push(entry.match);
    }
  }

  const blocked = matches.some((m) => !m.contextual);

  return { blocked, matches };
}

export function isOffensive(text) {
  return analyze(text).blocked;
}
