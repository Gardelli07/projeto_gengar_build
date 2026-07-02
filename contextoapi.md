# API Lingueto — Contexto Geral

Servidor HTTP em **Node.js + Express + TypeScript** usando **Prisma ORM** sobre **MySQL**.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js |
| Framework | Express 4 |
| Linguagem | TypeScript |
| ORM | Prisma |
| Banco | MySQL (schema `lingueto`) |
| Autenticação | JWT (access + refresh token) |
| Validação | Zod |
| Upload | Multer (disco local) |
| Variáveis de ambiente | dotenv + Zod (fail-fast na inicialização) |

---

## Arquitetura de Pastas

```
src/
├── app.ts                  # Monta o Express, registra rotas e middlewares
├── server.ts               # Sobe o HTTP server, trata SIGINT/SIGTERM
├── config/
│   ├── env.ts              # Valida e exporta variáveis de ambiente
│   └── prisma.ts           # Instância singleton do PrismaClient
├── middlewares/
│   ├── auth.ts             # autenticar (Bearer JWT) e usuarioAutenticado()
│   ├── validar.ts          # Middleware Zod para body/params/query
│   └── erro.ts             # (re-exporta erroMiddleware de shared/erros)
├── shared/
│   └── erros.ts            # AppError, asyncHandler, erroMiddleware global
└── modules/
    ├── auth/               # Login social (Apple/Google) + refresh/logout
    ├── assinaturas/        # Compras iOS/Android + webhooks Apple/Google
    ├── conteudos/          # Catálogo de aulas agrupado por curso/nível/módulo
    ├── nivelamento/        # Teste de nivelamento inicial do usuário
    ├── progresso/          # XP, sequência diária, conclusões de aula e tentativas
    ├── arquivos/           # Upload de áudio/imagem (multipart)
    ├── comunidade/         # Feed de posts, comentários e reações
    ├── corporativo/        # Login e gestão de contas empresariais
    └── permissoes/         # Lógica central de acesso a conteúdo
```

---

## Autenticação

Fluxo dual-token:

1. **Access Token** — JWT de curta duração (`JWT_EXPIRES_IN`, padrão `15m`). Enviado no header `Authorization: Bearer <token>`. Payload: `{ usuario_id, tipo_usuario }`.
2. **Refresh Token** — opaco, gerado como `<sessao_id>.<32 bytes aleatorios>`. Armazenado hasheado (bcrypt) na tabela `sessoes`. Validade configurável (`REFRESH_TOKEN_EXPIRES_DAYS`, padrão 30 dias).

O middleware `autenticar` ([src/middlewares/auth.ts](src/middlewares/auth.ts)) verifica e decodifica o JWT e injeta `req.usuario` na requisição.

### Tipos de login

| Módulo | Provedor | Rota |
|---|---|---|
| Social | Apple Sign-In | `POST /auth/apple` |
| Social | Google Sign-In | `POST /auth/google` |
| Corporativo | Login/senha (bcrypt) | `POST /auth/corporativo/login` |

Todos retornam `{ access_token, refresh_token, usuario }`.

---

## Módulos e Rotas

### `GET /health`
Health check público. Retorna `{ status: "ok" }`.

---

### `/auth`
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/auth/apple` | — | Login via Apple identity token |
| POST | `/auth/google` | — | Login via Google id token |
| POST | `/auth/refresh` | — | Renova sessão com refresh token |
| POST | `/auth/logout` | — | Revoga o refresh token |

---

### `/auth/corporativo`
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/auth/corporativo/login` | — | Login com `login` + `senha` de conta empresarial |

---

### `/corporativo`
Todas as rotas exigem JWT.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/corporativo/empresas/:empresaId/contas` | Cria conta corporativa na empresa |
| GET | `/corporativo/empresas/:empresaId/membros` | Lista membros da empresa |

---

### `/assinaturas`
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/assinaturas/validar-compra` | JWT | Valida compra iOS (`id_transacao` obrigatório) ou Android |
| POST | `/assinaturas/webhook/apple` | — | Recebe notificações App Store (signed payload) |
| POST | `/assinaturas/webhook/google` | — | Recebe notificações Google Play (Pub/Sub) |

---

### `/conteudos`
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/conteudos` | — | Catálogo agrupado: Curso → Nível → Módulo → Aulas |
| GET | `/conteudos/:id` | JWT | Detalhe de uma aula (verifica permissão de acesso) |

---

### `/nivelamento`
Todas as rotas exigem JWT.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/nivelamento/status` | Retorna se o teste já foi concluído e qual curso/nível escolhido |
| POST | `/nivelamento/concluir` | Registra resultado do teste e define curso/nível do usuário |

---

### `/progresso`
Todas as rotas exigem JWT.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/progresso/concluir-aula` | Marca aula como concluída, ganha XP e atualiza sequência diária |
| POST | `/progresso/tentativa-exercicio` | Registra tentativa de exercício (acerto/erro, resposta, áudio) |
| GET | `/progresso/resumo` | Retorna XP total e estado da sequência (`streak`) |

**XP por aula:** `10 + acurácia × 0,4` (arredondado). A sequência diária quebra se não houver atividade no dia anterior.

---

### `/arquivos`
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/arquivos` | JWT | Upload de arquivo (`multipart/form-data`, campo `arquivo`). Limite 25 MB. Tipos: `audio`, `imagem`. |

Arquivos ficam em disco no diretório `UPLOAD_DIR` e são servidos estaticamente em `/uploads/*`.

---

### `/comunidade`
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/comunidade/posts` | — | Lista posts públicos do feed |
| POST | `/comunidade/posts` | JWT | Cria post (`texto` ou `audio`) com origem e contexto de exercício |
| DELETE | `/comunidade/posts/:id` | JWT | Remove post do próprio usuário |
| POST | `/comunidade/posts/:id/comentarios` | JWT | Adiciona comentário |
| POST | `/comunidade/posts/:id/reacoes` | JWT | Reage (toggle) a um post |

---

## Sistema de Permissões de Conteúdo

A função `usuarioPodeAcessarConteudo` ([src/modules/permissoes/permissoes.service.ts](src/modules/permissoes/permissoes.service.ts)) é a fonte única de autorização de aulas. Ordem de verificação:

1. **Conteúdo gratuito** — acesso liberado para todos.
2. **Assinatura ativa** — verifica se algum plano ativo do usuário cobre o conteúdo via `permissoes_plano`.
3. **Contrato empresarial** — verifica se o usuário é membro de uma empresa com contrato ativo que inclua o conteúdo.
4. **Permissão direta** — entrada manual em `permissoes_usuario` com validade configurável.

---

## Tratamento de Erros

Todos os erros passam pelo `erroMiddleware` global ([src/shared/erros.ts](src/shared/erros.ts)):

| Tipo | Status HTTP |
|---|---|
| `AppError` | Código definido na instância |
| `ZodError` | 400 — detalha campo e mensagem |
| `SyntaxError` (JSON inválido) | 400 |
| Prisma P2002 (unique) | 409 |
| Prisma P2025 (not found) | 404 |
| Qualquer outro | 500 |

Controllers async usam `asyncHandler()` — não é necessário `try/catch` por rota.

---

## Variáveis de Ambiente

Todas validadas via Zod na inicialização. A API **não sobe** se alguma estiver inválida.

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | Sim | URL de conexão MySQL |
| `JWT_SECRET` | Sim | Mínimo 32 caracteres |
| `JWT_EXPIRES_IN` | Não (padrão `15m`) | Validade do access token |
| `REFRESH_TOKEN_EXPIRES_DAYS` | Não (padrão `30`) | Validade do refresh token |
| `APPLE_CLIENT_ID` | Sim | Bundle ID do app Apple |
| `APPLE_TEAM_ID` | Sim | Team ID Apple Developer |
| `APPLE_KEY_ID` | Sim | ID da chave privada Apple |
| `APPLE_PRIVATE_KEY` | Sim | Chave privada `.p8` (usar `\n` para quebras) |
| `GOOGLE_CLIENT_ID` | Sim | Client ID do projeto Google |
| `STORAGE_PROVIDER` | Não (padrão `local`) | Provedor de storage |
| `UPLOAD_DIR` | Não (padrão `uploads`) | Diretório de upload local |
| `PORT` | Não (padrão `3000`) | Porta HTTP |
| `APPLE_ISSUER_ID` | Não | Para validação de webhooks Apple |
| `APPLE_BUNDLE_ID` | Não | Para validação de webhooks Apple |
| `APPLE_WEBHOOK_ROOT_CERT_PEM` | Não | Certificado raiz Apple |
| `GOOGLE_PLAY_PACKAGE_NAME` | Não | Para webhooks Google Play |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Não | Credenciais Google Play |
| `GOOGLE_RTDN_AUDIENCE` | Não | Audience para notificações Google |

---

## Banco de Dados (MySQL)

Schema em [banco/BANCO_API_SCHEMA_MYSQL_PT_v2.sql](banco/BANCO_API_SCHEMA_MYSQL_PT_v2.sql). Tabelas principais:

| Tabela | Finalidade |
|---|---|
| `usuarios` | Conta base (consumidor ou corporativo) |
| `identidades_usuario` | Vincula Apple/Google ao usuário |
| `sessoes` | Refresh tokens com hash bcrypt |
| `empresas` | Empresas no plano corporativo |
| `contas_corporativas` | Login/senha de usuários corporativos |
| `membros_empresa` | Vínculo usuário ↔ empresa |
| `contratos_empresa` | Plano e vigência do contrato da empresa |
| `assinaturas` | Assinaturas iOS/Android do usuário |
| `planos` | Planos disponíveis |
| `permissoes_plano` | O que cada plano permite acessar |
| `permissoes_usuario` | Acesso avulso por usuário |
| `conteudos` | Aulas (curso/nível/módulo/ordem) |
| `conclusoes_aula` | Histórico de aulas concluídas |
| `eventos_xp_usuario` | Log de XP ganho |
| `sequencias_usuario` | Streak diário atual e melhor |
| `tentativas_exercicio` | Registro de acertos e erros |
| `arquivos` | Metadados de uploads |
| `posts_comunidade` | Posts do feed |
| `comentarios_post` | Comentários nos posts |
| `reacoes_post` | Reações (like/toggle) |
