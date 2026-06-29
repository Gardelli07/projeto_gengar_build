Você poderia projetar estruturas de dados do meu app, eu criei esse relatorio e o meu banco já em MYSQL poderia validar se eles batem e verificar se acha algum erro na estrutura? Se precisar de mais informações minhas, me faça 1-2 perguntas-chave imediatamente. Se achar que devo fornecer mais contexto ou fazer upload de algo para ajudá-lo a fazer um trabalho melhor, me avise. Use quaisquer ferramentas que você tenha acesso—como Google Drive, busca na web, etc.—se elas ajudarem.

Se fizer sentido, crie algo que possamos ver juntos—como um visual, uma lista de verificação ou algo interativo. Obrigado pela ajuda!

# Relatorio de conexoes com banco e API

Data do levantamento: 23/06/2026

## Visao geral atualizada

O app vai ter dois tipos principais de acesso:

1. Usuario comum: login obrigatorio pela conta Apple no iOS ou pela conta Google/Play Store no Android. Esse usuario nao entra com login e senha tradicional.
2. Usuario de parceria/empresa: contas criadas manualmente, com login e senha, exemplo Santander.

Fluxo geral do usuario comum:

1. Pessoa baixa o app.
2. Na primeira abertura, precisa logar obrigatoriamente com conta Apple ou Google.
3. Como e o primeiro acesso, faz o placement test.
4. Depois do placement test, entra na Home.
5. Enquanto nao assinar, ve apenas algumas aulas gratuitas de modulos separados para testar o app.
6. Para liberar todos os cursos e niveis existentes hoje, assina o plano unico `base`.
7. O pagamento acontece pela carteira/checkout da App Store ou Play Store.
8. Depois do pagamento, a API valida a assinatura e libera todos os cursos e niveis disponiveis no app hoje.
9. Progresso de aula, nivel, XP, streak, placement e assinatura ficam salvos no backend para continuar funcionando se desinstalar o app ou trocar de celular.

Na versao teste/lancamento inicial, havera apenas uma assinatura:

- assinatura `base`: libera todos os cursos e niveis que o app ja tem hoje.

Planos `plus`, `premium` ou outros podem existir no futuro, mas nao precisam ser prioridade agora.

Com isso, o banco/API precisa controlar quatro coisas centrais:

1. Quem e o usuario logado pela Apple/Google ou pela conta corporativa.
2. Qual assinatura/compra esta valida.
3. Qual conteudo esta liberado gratuitamente e qual conteudo depende do plano `base`.
4. Qual progresso, post, audio e interacao pertence a cada usuario.

## 1. Identidade e acesso

Arquivos envolvidos:

- `bd.js`
- `src/pages/Login.js`
- `src/context/AuthContext.js`
- `src/routes/TabsNavigator.js`
- `src/pages/santander/index.js`

Estado atual:

- `bd.js` cria uma tabela local SQLite chamada `Usuario`.
- `Login.js` faz login local com usuario e senha.
- `AuthContext.js` guarda o usuario apenas em memoria.
- `TabsNavigator.js` mostra aba Santander quando `user.empresa === "santander"`.
- Santander diferencia admin por `user.tipo === "admin"`.

Modelo recomendado:

- Remover login/senha para usuario comum.
- Manter login/senha apenas para `corporate_user`.
- Para usuario comum, exigir login com Apple ou Google logo na primeira abertura.
- Depois do login Apple/Google, criar ou recuperar um `user_id` interno no backend.
- Esse `user_id` interno sera a chave para salvar placement, progresso, assinatura, comunidade, audios e tentativas.
- A assinatura deve ser ligada ao mesmo usuario interno e tambem aos identificadores da loja:
  - `app_store_original_transaction_id` no iOS.
  - `play_store_purchase_token` ou identificador de assinatura no Android.

Importante:

- App Store/Play Store vendem e renovam a assinatura, mas o backend precisa validar recibos/tokens e transformar isso em permissao dentro do app.
- Como o login Apple/Google e obrigatorio, o progresso pode ser recuperado ao trocar de celular ou reinstalar o app, desde que o usuario entre com a mesma conta.
- O backend deve guardar tanto a identidade Apple/Google quanto o historico da assinatura.
- Login corporativo continua separado, porque empresas como Santander terao contas manuais.

Endpoints sugeridos para usuario comum:

- `POST /auth/apple` valida credencial Apple e cria/recupera usuario.
- `POST /auth/google` valida credencial Google e cria/recupera usuario.
- `GET /me` retorna usuario, plano ativo e permissoes.
- `POST /purchases/ios/validate` valida recibo/transaction da App Store.
- `POST /purchases/android/validate` valida purchase token da Play Store.
- `POST /purchases/restore` restaura compra/assinatura.
- `POST /store/webhooks/apple` recebe notificacoes da App Store.
- `POST /store/webhooks/google` recebe notificacoes da Play Store.

Endpoints para parceria/empresa:

- `POST /corporate/auth/login`
- `POST /corporate/auth/logout`
- `GET /corporate/auth/me`
- `POST /corporate/users` cria conta manualmente, usado por admin interno.
- `PATCH /corporate/users/:id`

Tabelas sugeridas:

- `users`
- `user_identities`
- `corporate_accounts`
- `companies`
- `company_members`
- `sessions`

Campos importantes em `users`:

- `id`
- `display_name`
- `foto_arquivo_id`
- `user_type` (`consumer`, `corporate`)
- `placement_completed`
- `first_login_at`
- `status` (`active`, `blocked`, `deleted`)
- `created_at`
- `updated_at`

Campos importantes em `user_identities`:

- `id`
- `user_id`
- `provider` (`apple`, `google`)
- `provider_user_id`
- `email`
- `email_verified`
- `created_at`
- `last_login_at`

Campos importantes em `corporate_accounts`:

- `id`
- `user_id`
- `company_id`
- `login`
- `password_hash`
- `role` (`admin`, `usuario`)
- `created_manually`
- `created_at`

## 2. Assinaturas, planos e liberacao de conteudo

Arquivos envolvidos:

- `src/pages/Home.js`
- `src/pages/aulas/CourseOverviewScreen.js`
- `src/routes/routes.js`
- arquivos de cursos em `src/pages/aulas/**`

Estado atual:

- O app lista cursos e aulas localmente.
- Nao existe bloqueio por assinatura.
- Alguns modulos/aulas ja tem ideia de `locked`, mas isso ainda e local.

Conexao necessaria:

- Saber qual plano o usuario tem ativo.
- Validar assinatura com App Store/Play Store.
- Guardar historico de compras/renovacoes/cancelamentos.
- Liberar algumas aulas gratuitas para usuario sem assinatura.
- Liberar todos os cursos e niveis atuais para usuario com assinatura `base` ativa.
- Permitir planos corporativos por empresa, sem depender de compra nas lojas.

Regra da versao teste:

- So existira uma assinatura comercial: `base`.
- `base` libera todos os cursos e niveis que existem hoje no app.
- Usuario sem assinatura fica em modo gratuito/degustacao.
- Modo gratuito deve liberar apenas aulas especificas de modulos separados, escolhidas por voce.
- O botao/fluxo de pagamento deve chamar o checkout/carteira da App Store ou Play Store.
- Depois do pagamento, o app envia o recibo/token para a API validar.
- A API atualiza a assinatura e devolve os acessos liberados.

Endpoints sugeridos:

- `GET /plans`
- `GET /me/entitlements`
- `GET /courses`
- `GET /courses/:courseId/access`
- `POST /purchases/ios/validate`
- `POST /purchases/android/validate`
- `POST /purchases/restore`

Tabelas sugeridas:

- `plans`
- `plan_entitlements`
- `store_products`
- `subscriptions`
- `purchase_events`
- `user_entitlements`
- `company_contracts`
- `company_entitlements`

Campos importantes em `plans`:

- `id`
- `code` (`free`, `base`, `corporate_santander`)
- `name`
- `description`
- `is_active`
- `created_at`

Campos importantes em `store_products`:

- `id`
- `plan_id`
- `platform` (`ios`, `android`)
- `store_product_id`
- `billing_period` (`monthly`, `yearly`)
- `is_active`

Campos importantes em `subscriptions`:

- `id`
- `user_id`
- `plan_id`
- `platform` (`ios`, `android`, `corporate`)
- `store_product_id`
- `store_original_transaction_id`
- `store_purchase_token`
- `status` (`active`, `trial`, `past_due`, `canceled`, `expired`, `revoked`)
- `current_period_start`
- `current_period_end`
- `auto_renew`
- `created_at`
- `updated_at`

Campos importantes em `plan_entitlements`:

- `id`
- `plan_id`
- `resource_type` (`course`, `level`, `module`, `lesson`, `feature`)
- `resource_id`
- `access` (`allow`)

Exemplo de liberacao:

```txt
free -> poucas aulas demonstrativas espalhadas por modulos/cursos
base -> todos os cursos e niveis existentes hoje no app
corporate_santander -> trilhas Santander + cursos definidos no contrato
```

Observacao:

- Mesmo com apenas uma assinatura agora, vale manter `plans` e `plan_entitlements` porque isso deixa o app pronto para criar `plus` ou `premium` no futuro sem refazer o banco.

## 3. Comunidade

Arquivo envolvido:

- `src/pages/Comunidade.js`

Estado atual:

- A tela usa `cards` fixos no proprio arquivo.
- Existem cards de texto e audio.
- A comunidade deve ter posts, comentarios e uma reacao tipo like.

Conexao necessaria:

- Carregar feed vindo do backend.
- Permitir post manual apenas de texto.
- Exibir posts enviados pelos exercicios 12 e 16.
- Registrar likes.
- Registrar comentarios nos posts.
- Tocar audio por URL salva no backend/storage.

Regra importante:

- Audio na comunidade deve entrar apenas pelo Exercise16.
- Post manual de audio deve ser bloqueado no backend.

Endpoints sugeridos:

- `GET /community/posts`
- `GET /community/posts/:id`
- `POST /community/posts`
- `PATCH /community/posts/:id`
- `DELETE /community/posts/:id`
- `POST /community/posts/:id/likes`
- `DELETE /community/posts/:id/likes`
- `POST /community/posts/:id/comments`
- `GET /community/posts/:id/comments`

Tabelas sugeridas:

- `community_posts`
- `posts_comunidade`
- `reacoes_comunidade`
- `comentarios_comunidade`

Campos importantes em `community_posts`:

- `id`
- `user_id`
- `type` (`text`, `audio`)
- `title`
- `content_text`
- `media_file_id`
- `source` (`manual`, `exercise12`, `exercise16`)
- `course_id`
- `level_id`
- `lesson_id`
- `slide_key`
- `exercise_type`
- `visibility` (`public`, `company`, `private`)
- `status` (`published`, `hidden`, `deleted`, `pending_review`)
- `created_at`
- `updated_at`

Observacao sobre identidade:

- Como usuario comum nao tera login/senha, a comunidade ainda precisa de um `user_id` interno.
- O nome exibido pode ser gerado automaticamente, editavel pelo aluno, ou vinculado a perfil simples.

## 4. Exercise12: texto enviado para a Comunidade

Arquivo envolvido:

- `src/exc/ex12.js`

Estado atual:

- Guarda texto digitado em `useState`.
- Ao enviar, chama `onAttempt({ isCorrect: true })`.
- Nao envia o texto para nenhum lugar.
- Foram encontrados 54 usos como componente de aula.

Conexao necessaria:

- Salvar resposta do aluno.
- Criar post de texto na comunidade quando a regra permitir.

Dados enviados ao backend:

- `user_id` interno ou sessao atual.
- texto digitado.
- `course_id`
- `level_id`
- `lesson_id`
- `slide_key`
- `activity.prompt`
- `activity.instruction`
- `activity.helperText`
- `exerciseType`: `Exercise12`
- `source`: `exercise12`
- `shareToCommunity`

Endpoint recomendado:

- `POST /exercise-submissions`

Exemplo:

```json
{
  "exerciseType": "Exercise12",
  "lessonId": "A1BU2",
  "slideKey": "work-company-text",
  "answerText": "I work as a designer for Lingueto.",
  "shareToCommunity": true
}
```

## 5. Exercise16: unico caminho para audio na Comunidade

Arquivo envolvido:

- `src/exc/ex16.js`

Estado atual:

- Usa `expo-audio`.
- Grava audio local e guarda `audioUri` em memoria.
- Ao enviar, chama `onAttempt({ isCorrect: true })`.
- Nao faz upload do audio.
- Foram encontrados 114 usos como componente de aula.

Conexao necessaria:

- Fazer upload do arquivo gravado.
- Salvar metadados do audio.
- Criar post na comunidade com `type = "audio"`.
- Bloquear qualquer audio que nao venha de `source = exercise16`.

Fluxo recomendado:

1. App grava audio local.
2. App envia `multipart/form-data` para API.
3. API valida sessao/assinatura/permissao.
4. API salva audio em storage externo.
5. API grava URL e metadados na tabela central `arquivos`.
6. API salva tentativa em `exercise_attempts`.
7. API cria post em `community_posts`.

Endpoint sugerido:

- `POST /exercise-submissions/audio`

Exemplo de payload multipart:

- `audio`: arquivo
- `exerciseType`: `Exercise16`
- `lessonId`
- `slideKey`
- `courseId`
- `levelId`
- `durationSeconds`
- `shareToCommunity`: `true`

Tabelas sugeridas:

- `exercise_attempts`
- `arquivos`
- `community_posts`

Campos importantes em `arquivos`:

- `id`
- `user_id`
- `tipo` (`audio`, `imagem`)
- `origem` (`usuario`, `sistema`, `conteudo`, `comunidade`, `exercicio`)
- `storage_provider`
- `url`
- `nome_original`
- `mime_type`
- `size_bytes`
- `duration_seconds`
- `largura_px`
- `altura_px`
- `texto_alternativo`
- `created_at`

## 6. Progresso das aulas, XP e streak

Arquivos envolvidos:

- `src/pages/Home.js`
- `src/pages/aulas/CourseOverviewScreen.js`
- `src/pages/aulas/LessonScreen.js`
- `src/util/lessonPerformance.js`
- `src/util/xp.js`

Estado atual:

- Progresso fica no `AsyncStorage`.
- Chaves principais:
  - `@progesso_ingles_completo_A0-A1`
  - `@progesso_ingles_completo_A2`
  - `@progesso_ingles_completo_B1`
  - `@curso_progress_bussines_A1`
  - `@curso_progress_bussines_B1`
  - `@curso_progress_travel_A1`
  - `@lesson_streak_v1`
- `LessonScreen.js` marca aula como concluida ao chegar no slide final.
- `Home.js` calcula XP pelo total de aulas concluidas.

Conexao necessaria:

- Buscar progresso no backend pelo `user_id`.
- Marcar aula concluida no backend.
- Registrar acuracia, XP e streak.
- Antes de abrir aula, validar se o plano ativo libera aquele conteudo.
- `AsyncStorage` pode continuar como cache, mas a fonte principal deve ser API.

Endpoints sugeridos:

- `GET /me/progress`
- `GET /courses/:courseId/progress`
- `POST /lesson-completions`
- `PATCH /lesson-completions/:id`
- `POST /progress/reset`

Tabelas sugeridas:

- `conteudos`
- `lesson_completions`
- `user_xp_events`
- `user_streaks`

Campos importantes em `lesson_completions`:

- `id`
- `user_id`
- `course_id`
- `level_id`
- `lesson_id`
- `accuracy`
- `earned_xp`
- `completed_at`

## 7. Tentativas e desempenho dos exercicios

Arquivos envolvidos:

- `src/pages/aulas/LessonScreen.js`
- `src/exc/ex1.js` ate `src/exc/ex20.js`

Estado atual:

- Os exercicios chamam `onAttempt`.
- `LessonScreen.js` calcula estatisticas da aula em memoria.
- Ao finalizar, so salva aula como concluida.

Conexao necessaria:

- Salvar tentativas por exercicio para historico, revisao de erros e analytics.
- Para Exercise12, salvar texto.
- Para Exercise16, salvar audio.

Endpoints sugeridos:

- `POST /exercise-attempts`
- `GET /me/exercise-attempts`
- `GET /lessons/:lessonId/attempts`

Tabela sugerida:

- `exercise_attempts`

Campos importantes:

- `id`
- `usuario_id`
- `conteudo_id`
- `chave_slide`
- `tipo_exercicio`
- `correta`
- `resposta_texto`
- `resposta_json`
- `arquivo_id`
- `criado_em`

## 8. Placement test

Arquivo envolvido:

- `src/pages/PlacementFlow.js`

Estado atual:

- Teste roda em memoria.
- Ao final, recomenda nivel e navega para Home.
- Nao salva resultado.

Conexao necessaria:

- Rodar obrigatoriamente no primeiro login Apple/Google.
- Salvar curso escolhido.
- Salvar nivel escolhido/recomendado.
- Salvar respostas e pontuacao.
- Usar resultado para personalizar Home.
- Marcar `placement_completed = true` no usuario.
- Se o usuario desinstalar e reinstalar, ao logar com a mesma conta Apple/Google, a API deve informar que o placement ja foi feito.
- Se quiser permitir refazer teste depois, criar uma nova tentativa sem apagar o historico antigo.

Endpoints sugeridos:

- `POST /placement-tests`
- `GET /me/placement`
- `PATCH /me/preferences`

Tabelas sugeridas:

- `placement_tests`
- `user_preferences`

## 9. Santander e outras parcerias empresariais

Arquivos envolvidos:

- `src/routes/TabsNavigator.js`
- `src/pages/Login.js`
- `src/pages/santander/index.js`
- `src/pages/santander/crm/HomeCRM.js`
- `src/pages/santander/crm/CRM1.js`

Estado atual:

- Login/senha existe localmente.
- Aba Santander aparece se `user.empresa` for Santander.
- Tela Santander diferencia admin por `user.tipo`.
- HomeCRM/CRM1 usam `AsyncStorage` para progresso.

Modelo atualizado:

- Login/senha sera mantido apenas para parcerias.
- Contas corporativas serao criadas manualmente.
- Empresa pode ter plano/contrato proprio, independente das assinaturas App Store/Play Store.
- Conteudo corporativo pode ser exclusivo, como Santander/CRM.

Endpoints sugeridos:

- `POST /corporate/auth/login`
- `GET /companies/me`
- `GET /companies/:companyId/courses`
- `GET /companies/:companyId/users`
- `POST /companies/:companyId/users`

Tabelas sugeridas:

- `companies`
- `company_members`
- `corporate_accounts`
- `company_contracts`
- `company_entitlements`

Campos importantes em `company_contracts`:

- `id`
- `company_id`
- `plan_id`
- `starts_at`
- `ends_at`
- `max_users`
- `status`

## 10. Conteudo de cursos, niveis, modulos, aulas e assets

Arquivos envolvidos:

- `src/pages/aulas/completo/**`
- `src/pages/aulas/bussines/**`
- `src/pages/aulas/viagem/**`
- `assets/**`
- `mp3/**`

Estado atual:

- Aulas estao hardcoded em arquivos JS.
- Imagens e audios ficam locais.

Conexao recomendada para assinaturas:

- Mesmo que as aulas continuem hardcoded no app, o backend precisa ter um catalogo minimo para decidir o que cada plano libera.
- Exemplo: o app pode ter todos os arquivos, mas a API responde se o usuario pode abrir ou nao.

Tabela recomendada para o MVP:

- `conteudos`: uma linha por aula, contendo tambem `curso_codigo`, `curso_nome`, `nivel_codigo`, `nivel_nome`, `modulo_codigo`, `modulo_nome`, `aula_codigo`, `aula_titulo`, `nome_tela`, `gratuita` e `ativa`.
- `features`

Tabelas futuras, se o catalogo crescer muito ou virar CMS:

- `courses`
- `levels`
- `modules`
- `lessons`
- `lesson_slides`
- `assets`
- `lesson_assets`

## Ordem recomendada para implementar a API

1. Criar `users`, `user_identities` e login obrigatorio com Apple/Google.
2. Criar `GET /me` para saber usuario, placement, assinatura e acessos.
3. Criar `placement_tests` e obrigar placement no primeiro login.
4. Criar catalogo minimo na tabela unica `conteudos`.
5. Criar plano `free` para aulas demonstrativas e plano `base` para liberar tudo.
6. Criar `plans`, `store_products` e `plan_entitlements`.
7. Criar validacao de compra/assinatura App Store e Play Store.
8. Criar `subscriptions` e `purchase_events`.
9. Criar bloqueio/liberacao de aulas na Home conforme assinatura.
10. Criar progresso, nivel, XP e streak no backend.
11. Criar login corporativo separado: `corporate_accounts`, `companies`, `company_members`.
12. Criar feed real da comunidade.
13. Conectar Exercise12 ao backend como texto.
14. Conectar Exercise16 ao backend como upload de audio.
15. Criar likes e comentarios nos posts.
16. Criar tentativas dos exercicios.

## Modelo minimo de banco para comecar

```sql
users
user_identities
plans
store_products
plan_entitlements
subscriptions
purchase_events
companies
corporate_accounts
company_members
company_contracts
company_entitlements
conteudos
community_posts
reacoes_comunidade
comentarios_comunidade
arquivos
lesson_completions
exercise_attempts
user_streaks
placement_tests
```

## Regras importantes

- Usuario comum nao usa login/senha.
- Usuario comum precisa logar obrigatoriamente com Apple ou Google antes de usar o app.
- Primeiro login deve levar para o placement test.
- Placement test concluido deve ficar salvo no backend.
- Usuario sem assinatura acessa apenas aulas gratuitas/demonstrativas escolhidas.
- Na versao teste, a assinatura unica `base` libera todos os cursos e niveis existentes hoje.
- Pagamento da assinatura deve acontecer pela carteira/checkout da App Store ou Play Store.
- Login/senha fica apenas para contas corporativas criadas manualmente.
- A assinatura da App Store/Play Store deve ser validada no backend.
- O backend deve ser a fonte da verdade para dizer se o plano esta ativo.
- O app nao deve confiar apenas no estado local para liberar aula paga.
- Cada curso/aula/modulo precisa estar ligado a um plano ou entitlement.
- Progresso de aula, nivel, XP, streak e placement devem ficar ligados ao `user_id`, nao apenas ao aparelho.
- Ao reinstalar o app ou trocar de celular, o usuario deve recuperar assinatura e progresso ao logar com a mesma conta Apple/Google e restaurar compra se necessario.
- Audio da comunidade so pode entrar pelo Exercise16.
- Post manual na comunidade deve ser apenas texto.
- Exercise12 e Exercise16 precisam enviar contexto da aula junto da resposta.
- Audio deve ir para storage externo; no banco fica URL/metadados.
- `AsyncStorage` pode continuar como cache, mas progresso real deve ficar no backend.
