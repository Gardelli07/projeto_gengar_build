import { analyze } from "./index";

const casos = [
  "essa comida ta uma porra",
  "essa comida ta uma p0rra",
  "essa comida ta uma p o r r a",
  "voce e um fdp",
  "voce e gordo",
  "que situacao pauta interessante",
  "documento importante",
  "bom dia, tudo bem?",
  "seu m4c4c0",
  "seu crioulo",
  "CRIOULA nojenta",
  "esse cri0ul0",
  "ele e veado",
  "vi um veado na estrada",
  "seu vi@do",
  "traveco imundo",
  "b0iola",
  "b@itola",
  "volta pra seu pais",
  "volta pra teu pais",
  "estrangeiro de merda",
  "estrangeiro de m3rd@",
  "esses portugas",
  "esse macumbeiro",
  "seita de macumbeiragem",
];

for (const caso of casos) {
  const resultado = analyze(caso);
  console.log(
    resultado.blocked ? "[BLOQUEADO]" : "[LIBERADO] ",
    JSON.stringify(caso),
    "->",
    resultado.matches
      .map((m) => `${m.term}${m.subcategoria ? `/${m.subcategoria}` : ""}${m.contextual ? "(contextual)" : ""}`)
      .join(", ") || "-"
  );
}
