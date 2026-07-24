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
    screen: "SelfIntroLesson",
  },
  {
    id: "coffee-shop",
    title: "No café",
    subtitle: "Conversação • Nível 2",
    duration: "12 min",
    icon: "coffee",
    tag: "Novo",
    colors: ["#B0742F", "#F2A93B"],
    screen: "CoffeeShopLesson",
  },
];
