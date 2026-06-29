# Relatorio de organizacao das aulas

Base analisada: `src/pages/aulas`.

Observacao: o caminho informado como `stc/pages/aula` corresponde, no projeto, a `src/pages/aulas`.

## Visao geral

| Curso | Nível | Pasta | Arquivos de aula | Módulos no index | Aulas no index | Padrão principal |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Ingles Completo | A0-A1 | `src/pages/aulas/completo/A0-A1` | 43 | 6 | 43 | Tela completa inline em cada arquivo |
| Ingles Completo | A2 | `src/pages/aulas/completo/A2` | 74 | 8 | 62 declaradas no index | Factory compartilhada `A2LessonScreen` |
| Ingles Completo | B1 | `src/pages/aulas/completo/B1` | 40 | 10 | 39 declaradas no index | Tela completa inline em cada arquivo |
| Bussines English | A1 | `src/pages/aulas/bussines/A1` | 20 | 4 | 19 declaradas no index | Factory compartilhada `BusinessLessonTemplate` |
| Bussines English | B1 | `src/pages/aulas/bussines/B1` | 20 | 4 | 20 | Factory compartilhada `BusinessLessonTemplate` |
| Ingles para Viagem | A1 | `src/pages/aulas/viagem/A1` | 26 | 7 | 26 | Factory compartilhada `TravelLessonTemplate` |

## Estrutura comum dos indices

Cada nível possui um `index.js` que funciona como catálogo do curso/nível:

- exporta uma chave de progresso em AsyncStorage, por exemplo `@progesso_ingles_completo_A2` ou `@curso_progress_travel_A1`;
- exporta o nome do curso;
- declara `moduleDefs`, com id, nome, subtitulo, estado de bloqueio, cor e icone;
- declara a lista de aulas, geralmente chamada `inglesSampleLessons`, `bussinesSampleLessons`, `bussinesB1SampleLessons` ou `travelSampleLessons`;
- renderiza `CourseOverviewScreen`, passando `courseName`, `storageKey`, `moduleDefs` e `lessons`.

A tela comum de overview fica em `src/pages/aulas/CourseOverviewScreen.js`. Ela:

- le progresso com `AsyncStorage`;
- agrupa aulas por módulo;
- mostra progresso por módulo;
- navega para `lesson.screen`;
- aceita `autoOpenLessonId` para abrir automaticamente a próxima aula.

As pastas `bussines` e `viagem` também possuem arquivos pequenos de reexport:

- `src/pages/aulas/bussines/index.js` reexporta `./A1`;
- `src/pages/aulas/viagem/index.js` reexporta `./A1`;
- `src/pages/aulas/bussines/CourseOverviewScreen.js` e `src/pages/aulas/viagem/CourseOverviewScreen.js` reexportam a tela comum de `../CourseOverviewScreen`.

## Ingles Completo

### A0-A1

Pasta: `src/pages/aulas/completo/A0-A1`

Organizacao:

- `index.js` declara 6 módulos e 43 aulas.
- As aulas seguem nomes `IC01.js` até `IC43.js`.
- Cada arquivo de aula contém a tela inteira, não apenas os dados da licao.
- O padrão interno de cada aula inclui imports de React Native, `AsyncStorage`, `expo-speech`, estilos de exercicios, `Feedback`, cálculo de desempenho e XP.
- Cada arquivo declara `STORAGE_KEY`, `styles`, `LESSON_SLIDES`, hooks auxiliares, renderer de slide, lógica de progresso, conclusão da aula e navegação para a próxima.
- O componente default e uma função com o próprio nome da aula, por exemplo `export default function IC01(...)`.

Implicacao:

- E o padrão mais duplicado junto com `completo/B1`.
- Para alterar comportamento de navegação, progresso, streak, feedback ou header, provavelmente e necessário replicar a mudanca em muitos arquivos.

### A2

Pasta: `src/pages/aulas/completo/A2`

Organizacao:

- `index.js` declara 8 módulos.
- O index declara 62 aulas na lista de navegação, mas a pasta contém arquivos `A2IC01.js` até `A2IC74.js`.
- Existe uma tela/factory compartilhada: `A2LessonScreen.js`.
- Cada aula importa `createA2LessonScreen` e exporta `createA2LessonScreen(LESSON_SLIDES)`.
- Nos arquivos de aula, os slides usam `component` como string, por exemplo `"Exercise17"`, `"Exercise14"` e `"Exercise20"`.
- `A2LessonScreen.js` centraliza o mapa `COMPONENTS`, estilos, navegação, audio, progresso, feedback, XP e conclusão.

Implicacao:

- É o nível mais padronizado de `completo`.
- O conteudo de cada aula fica mais isolado em `LESSON_SLIDES`.
- Existe uma diferença importante: há mais arquivos de aula na pasta do que aulas declaradas no `index.js`. Alguns arquivos podem estar fora da navegação atual ou serem desafios extras.

### B1

Pasta: `src/pages/aulas/completo/B1`

Organizacao:

- `index.js` declara 10 módulos e 39 aulas.
- A pasta contém arquivos `B1IC01.js` até `B1IC40.js`.
- Assim como A0-A1, cada aula contém a tela completa inline.
- Cada arquivo declara seus próprios imports, `STORAGE_KEY`, `styles`, `LESSON_SLIDES`, renderer, hooks, progresso, feedback e navegação.
- A navegação final troca para a rota `InglescompletoB1`.

Implicacao:

- Mesmo problema de duplicacao de A0-A1.
- Há 40 arquivos na pasta, mas 39 aulas no index. `B1IC40.js` existe, porém aparentemente não está listado no catálogo do nível.

## Bussines English

### A1

Pasta: `src/pages/aulas/bussines/A1`

Organizacao:

- `index.js` declara 4 módulos.
- O index declara 19 aulas, mas a pasta contém `A1BU1.js` até `A1BU20.js`.
- Cada aula importa os componentes de exercicio usados diretamente, imagens de `BUA1`/`Images`, e `createBusinessLessonScreen`.
- Cada arquivo declara `LESSON_SLIDES` e exporta `createBusinessLessonScreen(LESSON_SLIDES)`.
- O template compartilhado fica em `BusinessLessonTemplate.js`.
- O template centraliza progresso, feedback, navegação, header e renderização de slides.
- A rota usada para próxima aula no template A1 e `Bussines`.

Implicacao:

- A estrutura e bem mais limpa que `completo/A0-A1` e `completo/B1`.
- O conteudo fica nos arquivos de aula.
- Há uma possível aula extra: `A1BU20.js` existe na pasta, mas não aparece no `index.js`.
- `A1BU20.js` é muito menor que as demais aulas e merece revisao se deveria estar listado ou removido.

### B1

Pasta: `src/pages/aulas/bussines/B1`

Organizacao:

- `index.js` declara 4 módulos e 20 aulas.
- Cada aula usa `BusinessLessonTemplate.js` do próprio nível.
- Os arquivos importam os exercicios reais como componentes, por exemplo `Exercise1`, `Exercise14`, `Exercise17`.
- Cada aula declara `LESSON_SLIDES` com objetos contendo `key`, `component`, `activity`, e ocasionalmente `needsSpeech` ou `type: "finish"`.
- O template B1 usa `@curso_progress_bussines_B1` e navega pela rota `BussinesB1`.

Implicacao:

- Padrão consistente dentro do nível.
- Apesar do nome igual ao template de A1, é uma cópia separada em outra pasta. Mudanças estruturais precisam ser feitas nos dois templates se valerem para ambos os níveis.

## Ingles para Viagem

### A1

Pasta: `src/pages/aulas/viagem/A1`

Organizacao:

- `index.js` declara 7 módulos e 26 aulas.
- Cada aula segue o nome `A1TR1.js` até `A1TR26.js`.
- Cada arquivo importa os exercicios usados, imagens de `TRA1`/`Images`, e `createTravelLessonScreen`.
- Cada aula declara `LESSON_SLIDES` e exporta `createTravelLessonScreen(LESSON_SLIDES)`.
- O template compartilhado fica em `TravelLessonTemplate.js`.
- O template usa `@curso_progress_travel_A1` e navega pela rota `TravelEnglish`.

Implicacao:

- Estrutura consistente e parecida com `bussines`.
- O nome da factory exportada dentro de `TravelLessonTemplate.js` aparece como `createBusinessLessonScreen`, embora seja importada nas aulas como `createTravelLessonScreen`. Isso funciona por ser export default, mas o nome interno pode confundir manutenção/debug.

## Comparacao dos padroes

### Padrão 1: aula inline completa

Usado em:

- `completo/A0-A1`
- `completo/B1`

Caracteristicas:

- Cada arquivo de aula e autossuficiente.
- O conteudo e a infraestrutura ficam misturados.
- Repeticao alta de imports, hooks, progresso, feedback, navegação e renderização.
- Arquivos geralmente entre 500 e 700 linhas.

Vantagem:

- Cada aula pode ser alterada isoladamente.

Desvantagem:

- Manutenção cara e propensa a inconsistencias.

### Padrão 2: factory central com slides como dados

Usado em:

- `completo/A2`
- `bussines/A1`
- `bussines/B1`
- `viagem/A1`

Caracteristicas:

- Cada arquivo de aula declara principalmente `LESSON_SLIDES`.
- Um template/factory centraliza comportamento comum.
- Arquivos de aula ficam menores.

Diferenças internas:

- `completo/A2` usa strings no campo `component` e resolve no mapa `COMPONENTS` dentro de `A2LessonScreen.js`.
- `bussines` e `viagem` importam os componentes de exercicio diretamente e passam a referencia no campo `component`.

Vantagem:

- Mais fácil alterar navegação, progresso, feedback e renderização em um único lugar por nível.

Desvantagem:

- Ainda há templates duplicados entre cursos/níveis.
- Como cada nível tem seu próprio template, uma correção estrutural pode precisar ser replicada em vários templates.

## Inconsistencias encontradas

1. Nome da pasta `bussines`

   A pasta e os nomes de rota usam `bussines`, enquanto o termo correto seria `business`. Isso pode estar intencional por compatibilidade, mas vale padronizar mentalmente para não quebrar imports/rotas.

2. Encoding aparente em textos

   Vários textos apareciam como `Inglês`, `até`, `você`, etc. Isso indicava arquivos salvos/lidos com encoding inconsistente em alguns pontos.

3. Arquivos de aula fora do index

   - `completo/A2`: existem 74 arquivos de aula, mas o index lista 62 aulas.
   - `completo/B1`: existem 40 arquivos, mas o index lista 39 aulas.
   - `bussines/A1`: existem 20 arquivos, mas o index lista 19 aulas.

   Isso pode ser intencional, mas se a navegação depende do index, esses arquivos extras não aparecem para o usuario.

4. Templates duplicados

   - `bussines/A1/BusinessLessonTemplate.js`
   - `bussines/B1/BusinessLessonTemplate.js`
   - `viagem/A1/TravelLessonTemplate.js`
   - `completo/A2/A2LessonScreen.js`

   Todos centralizam conceitos parecidos: slides, progresso, speech/audio, feedback, XP e navegação. A diferença principal está em storage key, rota de retorno e forma de resolver componente.

5. Nome interno confuso no template de viagem

   `TravelLessonTemplate.js` exporta default uma função chamada internamente `createBusinessLessonScreen`. Como é default export, o import com nome `createTravelLessonScreen` funciona, mas o stack trace e a leitura do codigo ficam confusos.

## Recomendacao de organizacao futura

Prioridade sugerida:

1. Conferir se os arquivos extras devem entrar nos respectivos `index.js`.
2. Corrigir ou decidir uma estrategia para encoding dos textos.
3. Padronizar os templates de aula em uma unica factory compartilhada, parametrizada por:
   - `storageKey`;
   - rota de retorno/próxima aula;
   - mapa ou estrategia de componentes;
   - estilos/exercicios habilitados.
4. Migrar `completo/A0-A1` e `completo/B1` para o padrão de slides + factory, como ja acontece em `completo/A2`.
5. Opcionalmente padronizar a forma de `component`:
   - ou todos usam string + registry central;
   - ou todos importam o componente diretamente no arquivo da aula.

Resumo final: a camada de catálogo dos cursos está relativamente padronizada via `CourseOverviewScreen`, mas a camada das telas de aula tem dois modelos diferentes. O modelo mais sustentável ja está em `A2`, `bussines` e `viagem`; os níveis `completo/A0-A1` e `completo/B1` sao os principais candidatos a refatoração.
