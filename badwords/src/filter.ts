import wordlistJson from "../data/wordlist.json";
import { stripAccents } from "./normalize";
import { buildPattern } from "./patterns";

export type Severity = "leve" | "moderada" | "grave";

export interface WordEntry {
  term: string;
  severity: Severity;
  subcategoria?: string;
  /**
   * Termos ambíguos que dependem de contexto (ex: "gordo", "macaco").
   * Entram no relatório de matches mas não derrubam `blocked` sozinhos —
   * trate-os como sinal para revisão humana, não bloqueio automático.
   */
  contextual?: boolean;
}

export interface Match {
  term: string;
  category: string;
  severity: Severity;
  subcategoria?: string;
  contextual: boolean;
}

export interface AnalyzeResult {
  blocked: boolean;
  matches: Match[];
}

interface CompiledEntry {
  pattern: RegExp;
  match: Match;
}

// Mensagens absurdamente longas custariam caro para casar contra cada padrão;
// o próprio dicionário já é buscado como substring, então um corte generoso
// não perde detecção em uso normal (chat, comentário, nome de usuário etc).
const MAX_INPUT_LENGTH = 10_000;

const wordlist = wordlistJson as Record<string, WordEntry[]>;

const compiledEntries: CompiledEntry[] = [];

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
        contextual: entry.contextual ?? false,
      },
    });
  }
}

/**
 * Analisa um texto em busca de palavras ofensivas, resistindo a disfarces comuns:
 * maiúsculas, acentos, leetspeak (p0rra, p@rr@), letras repetidas (porraaaa) e
 * espaçamento/pontuação entre letras (p o r r a, p.o.r.r.a, p_o_r_r_a).
 */
export function analyze(text: string): AnalyzeResult {
  if (!text || typeof text !== "string") {
    return { blocked: false, matches: [] };
  }

  const prepared = stripAccents(text.toLowerCase()).slice(0, MAX_INPUT_LENGTH);

  const matches: Match[] = [];
  for (const entry of compiledEntries) {
    if (entry.pattern.test(prepared)) {
      matches.push(entry.match);
    }
  }

  const blocked = matches.some((m) => !m.contextual);

  return { blocked, matches };
}

export function isOffensive(text: string): boolean {
  return analyze(text).blocked;
}
