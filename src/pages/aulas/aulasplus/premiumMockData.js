// Conteudo de demonstracao para as secoes do design "Lingueto Premium
// Classes" que ainda nao tem dados reais no backend (cursos, series e
// trending). Substitua cada lista por dados vindos da API assim que o
// catalogo de Aulas Plus crescer. Os itens aqui NAO navegam para nenhuma
// tela — sao apenas a previa visual do layout.
export const continueItems = [
  { id: "c1", title: "Telemarketer Intro", sub: "Conversação • Nível 3", progress: 19, minutesLeft: 8, colors: ["#3A4BC7", "#5B6EF5"], image: require("../../../../assets/aulasplus/TelemarketerIntro.jpeg") },
  { id: "c2", title: "Airplane Vocab", sub: "Viagem • Nível 2", progress: 62, minutesLeft: 4, colors: ["#B0742F", "#F2A93B"], image: require("../../../../assets/aulasplus/AirplaneVocab.jpeg") },
  { id: "c3", title: "Job interview intro", sub: "Trabalho • Nível 4", progress: 45, minutesLeft: 6, colors: ["#2C7A6B", "#3FAF98"] },
];

export const comingSoonCourses = [
  { id: "f1", title: "English for Travel", meta: "Em breve • Iniciante", colors: ["#1E5FA8", "#4C9FE0"] },
  { id: "f2", title: "Business English", meta: "Em breve • Intermediário", colors: ["#2C7A6B", "#3FAF98"] },
  { id: "f3", title: "American Pronunciation", meta: "Em breve • Avançado", colors: ["#8A3FAF", "#B45FE0"] },
];

export const series = [
  { id: "s1", title: "English for Travel", episodes: 12, colors: ["#1E5FA8", "#4C9FE0"] },
  { id: "s2", title: "Business English", episodes: 20, colors: ["#2C7A6B", "#3FAF98"] },
  { id: "s3", title: "American Pronunciation", episodes: 15, colors: ["#8A3FAF", "#B45FE0"] },
  { id: "s4", title: "Daily Situations", episodes: 16, colors: ["#2C7A6B", "#3FAF98"] },
].map((s) => ({
  ...s,
  episodesList: Array.from({ length: s.episodes }, (_, n) => ({
    id: `${s.id}-ep${n + 1}`,
    n: n + 1,
    title: `${s.title} — Episódio ${n + 1}`,
    duration: `${6 + (n % 5) * 2} min`,
  })),
}));

export const trending = [
  { id: "t1", rank: 1, title: "Lost in New York", plays: "12.4k", colors: ["#3A4BC7", "#5B6EF5"] },
  { id: "t2", rank: 2, title: "Ordering dinner", plays: "9.8k", colors: ["#B0742F", "#F2A93B"] },
  { id: "t3", rank: 3, title: "Airport English", plays: "8.1k", colors: ["#1E5FA8", "#4C9FE0"] },
  { id: "t4", rank: 4, title: "Salary negotiation", plays: "6.5k", colors: ["#2C7A6B", "#3FAF98"] },
];

// Beneficios reais do app (nao inventados) — refletem o que ja existe hoje:
// Aulas Plus, revisao de erros, e os planos pagos definidos em
// src/pages/PaywallScreen.js.
export const benefits = [
  { id: "b1", emoji: "🎬", title: "Aulas Plus exclusivas", desc: "Conteúdo extra para praticar situações reais do dia a dia." },
  { id: "b2", emoji: "🎯", title: "Revisão de erros", desc: "Volte exatamente nos pontos em que você errou." },
  { id: "b3", emoji: "🚫", title: "Zero anúncios", desc: "Foco total no seu aprendizado (plano Gold)." },
  { id: "b4", emoji: "🏅", title: "Teste de nível + certificado", desc: "Meça sua evolução com precisão (plano Gold)." },
  { id: "b5", emoji: "💳", title: "Descontos em aulas premium", desc: "Economize assinando o plano Gold." },
  { id: "b6", emoji: "🔥", title: "XP e ofensiva", desc: "Acompanhe seu progresso subir a cada aula." },
];
