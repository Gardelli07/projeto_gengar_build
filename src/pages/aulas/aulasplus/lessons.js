// Lista de aulas do modulo "Aulas Plus". Hoje so existe uma aula pronta
// (SelfIntroLesson) mas o modulo foi pensado para crescer: para publicar uma
// nova aula, crie o componente nesta pasta, registre-o em `lessonScreens`
// (index.js) e adicione uma entrada aqui.
export const aulasPlusLessons = [
  {
    id: "self-intro",
    title: "Apresentação pessoal",
    subtitle: "Conversação • Nível 1",
    duration: "8 min",
    icon: "account-voice",
    tag: "Novo",
    colors: ["#3A4BC7", "#5B6EF5"],
    image: require("../../../../assets/aulasplus/SelfIntroLesson.jpeg"),
    screen: "SelfIntroLesson",
    // Valor de referencia/exibicao E o valor real creditado - esta aula nao
    // calcula XP proprio internamente (ver CoffeeShopLesson pra contraste).
    xpReward: 50,
  },
  {
    id: "coffee-shop",
    title: "No café",
    subtitle: "Conversação • Nível 2",
    duration: "12 min",
    icon: "coffee",
    tag: "Novo",
    colors: ["#B0742F", "#F2A93B"],
    image: require("../../../../assets/aulasplus/CoffeeShopLesson.jpeg"),
    screen: "CoffeeShopLesson",
    // So o valor de referencia/exibicao (ex: cards "~150 XP"). O valor real
    // creditado vem do contador `xp` ao vivo da propria aula ao concluir.
    xpReward: 150,
  },
];
