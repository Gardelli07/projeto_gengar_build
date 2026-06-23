# Relatorio de conexoes com banco e API

Data do levantamento: 23/06/2026

## Visao geral atualizada

O app vai ter dois tipos principais de acesso:

1. Usuario comum: compra/assinatura pela Apple Store ou Play Store. Esse usuario nao entra com login e senha tradicional apenas com suas contas apple/play Store.
2. Usuario de parceria/empresa: contas criadas manualmente, com login e senha, exemplo Santander.

Tambem havera planos de assinatura por nivel de acesso, por exemplo:

- assinatura `base`: libera um conjunto X de cursos/aulas.
- assinatura `plus`: libera mais conteudo.
- assinatura futura/premium: pode liberar tudo, comunidade avancada, trilhas extras etc.

Com isso, o banco/API precisa controlar quatro coisas centrais:

1. Quem e o usuario ou instalacao ativa.
2. Qual assinatura/compra esta valida.
3. Qual conteudo cada plano libera.
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
- Para usuario comum, criar uma identidade interna no backend quando ele abre o app, faz placement, compra ou restaura assinatura.
- Essa identidade interna pode ser ligada a:
  - `app_store_original_transaction_id` no iOS.
  - `play_store_purchase_token` ou identificador de assinatura no Android.
  - um `anonymous_installation_id` salvo no app para uso antes da compra.

Importante:

- Apple/Play Store vendem e renovam a assinatura, mas o seu backend precisa validar recibos/tokens e transformar isso em permissao dentro do app.
- Mesmo sem login/senha, o backend precisa ter um `user_id` interno para salvar progresso, comunidade, audio e compras.
- Se quiser sincronizar progresso entre celulares diferentes, sera necessario algum tipo de identificacao recuperavel, como Sign in with Apple/Google, email magic link ou restauracao de compra. Se nao fizer isso, o progresso pode ficar preso ao aparelho/instalacao.

Endpoints sugeridos para usuario comum:

- `POST /app/installations` cria/recupera uma instalacao anonima.
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
- `installations`
- `corporate_accounts`
- `companies`
- `company_members`
- `sessions`

Campos importantes em `users`:

- `id`
- `display_name`
- `avatar_url`
- `user_type` (`consumer`, `corporate`)
- `status` (`active`, `blocked`, `deleted`)
- `created_at`
- `updated_at`

Campos importantes em `corporate_accounts`:

- `id`
- `user_id`
- `company_id`
- `login`
- `password_hash`
- `role` (`admin`, `usuario`)
- `created_manually`
- `created_at`

Campos importantes em `installations`:

- `id`
- `user_id`
- `platform` (`ios`, `android`)
- `installation_token`
- `device_label`
- `created_at`
- `last_seen_at`

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
- Validar assinatura com Apple Store/Play Store.
- Guardar historico de compras/renovacoes/cancelamentos.
- Liberar ou bloquear cursos, niveis, modulos e aulas conforme o plano.
- Permitir planos corporativos por empresa, sem depender de compra nas lojas.

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
- `code` (`base`, `plus`, `premium`, `corporate_santander`)
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
base -> Ingles Completo Starter, Viagem A1
plus -> base + Ingles Completo A2/B1 + Business A1
premium -> plus + Business B1 + recursos futuros
corporate_santander -> trilhas Santander + cursos definidos no contrato
```

## 3. Comunidade

Arquivo envolvido:

- `src/pages/Comunidade.js`

Estado atual:

- A tela usa `cards` fixos no proprio arquivo.
- Existem cards de texto e audio.
- Existem botoes "Muito Bom!" e "Sugerir Correcao", mas sem acao real.

Conexao necessaria:

- Carregar feed vindo do backend.
- Permitir post manual apenas de texto.
- Exibir posts enviados pelos exercicios 12 e 16.
- Registrar curtidas/reacoes.
- Registrar sugestoes de correcao.
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
- `POST /community/posts/:id/reactions`
- `DELETE /community/posts/:id/reactions`
- `POST /community/posts/:id/corrections`
- `GET /community/posts/:id/corrections`

Tabelas sugeridas:

- `community_posts`
- `community_reactions`
- `community_corrections`
- `community_comments` se quiser comentarios livres depois

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
5. API grava metadados em `media_files`.
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
- `media_files`
- `community_posts`

Campos importantes em `media_files`:

- `id`
- `user_id`
- `kind` (`audio`)
- `storage_provider`
- `url`
- `mime_type`
- `size_bytes`
- `duration_seconds`
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

- `courses`
- `levels`
- `modules`
- `lessons`
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
- Ligar tentativa ao plano/assinatura vigente na data, para auditoria.

Endpoints sugeridos:

- `POST /exercise-attempts`
- `GET /me/exercise-attempts`
- `GET /lessons/:lessonId/attempts`

Tabela sugerida:

- `exercise_attempts`

Campos importantes:

- `id`
- `user_id`
- `lesson_id`
- `slide_key`
- `exercise_type`
- `is_correct`
- `answer_text`
- `answer_json`
- `media_file_id`
- `accuracy`
- `subscription_id`
- `created_at`

## 8. Placement test

Arquivo envolvido:

- `src/pages/PlacementFlow.js`

Estado atual:

- Teste roda em memoria.
- Ao final, recomenda nivel e navega para Home.
- Nao salva resultado.

Conexao necessaria:

- Salvar curso escolhido.
- Salvar nivel escolhido/recomendado.
- Salvar respostas e pontuacao.
- Usar resultado para personalizar Home.
- Para usuario sem assinatura, pode salvar resultado atrelado a `installation_id`.
- Depois da compra, vincular resultado ao `user_id`.

Endpoints sugeridos:

- `POST /placement-tests`
- `GET /me/placement`
- `PATCH /me/preferences`

Tabelas sugeridas:

- `placement_tests`
- `placement_answers`
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
- `GET /companies/:companyId/reports`

Tabelas sugeridas:

- `companies`
- `company_members`
- `corporate_accounts`
- `company_contracts`
- `company_entitlements`
- `company_progress_reports`

Campos importantes em `company_contracts`:

- `id`
- `company_id`
- `plan_id`
- `starts_at`
- `ends_at`
- `max_users`
- `status`

## 10. Conteudo de cursos, aulas e assets

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

- Mesmo que as aulas continuem hardcoded no app, o backend precisa ter um catalogo minimo de cursos/niveis/modulos/aulas para decidir o que cada plano libera.
- Exemplo: o app pode ter todos os arquivos, mas a API responde se o usuario pode abrir ou nao.

Tabelas recomendadas:

- `courses`
- `levels`
- `modules`
- `lessons`
- `features`

Tabelas futuras, se quiser editar conteudo sem atualizar o app:

- `lesson_slides`
- `assets`
- `lesson_assets`

## Ordem recomendada para implementar a API

1. Criar `users` e `installations` para usuario comum sem login/senha.
2. Criar `plans`, `store_products` e `plan_entitlements`.
3. Criar validacao de compra/assinatura App Store e Play Store.
4. Criar `subscriptions` e `purchase_events`.
5. Criar `GET /me` e `GET /me/entitlements`.
6. Criar catalogo minimo de cursos/aulas e bloqueio por plano.
7. Criar login corporativo separado: `corporate_accounts`, `companies`, `company_members`.
8. Criar feed real da comunidade.
9. Conectar Exercise12 ao backend como texto.
10. Conectar Exercise16 ao backend como upload de audio.
11. Criar reacoes e sugestoes de correcao.
12. Criar progresso, XP e streak no backend.
13. Criar tentativas dos exercicios.
14. Criar placement test persistido.
15. Criar relatorios para empresas/parcerias.

## Modelo minimo de banco para comecar

```sql
users
installations
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
courses
levels
modules
lessons
community_posts
community_reactions
community_corrections
media_files
lesson_completions
exercise_attempts
user_streaks
placement_tests
```

## Regras importantes

- Usuario comum nao usa login/senha.
- Login/senha fica apenas para contas corporativas criadas manualmente.
- A assinatura da Apple Store/Play Store deve ser validada no backend.
- O backend deve ser a fonte da verdade para dizer se o plano esta ativo.
- O app nao deve confiar apenas no estado local para liberar aula paga.
- Cada curso/aula/modulo precisa estar ligado a um plano ou entitlement.
- Audio da comunidade so pode entrar pelo Exercise16.
- Post manual na comunidade deve ser apenas texto.
- Exercise12 e Exercise16 precisam enviar contexto da aula junto da resposta.
- Audio deve ir para storage externo; no banco fica URL/metadados.
- `AsyncStorage` pode continuar como cache, mas progresso real deve ficar no backend.
- Para sincronizar progresso entre aparelhos, sera necessario algum mecanismo de restauracao/identificacao, mesmo sem senha tradicional.
