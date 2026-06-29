# Guia simples da estrutura do banco

Este guia mostra como as tabelas principais se conectam e quais campos o app usa para tomar decisoes. Ele nao substitui o arquivo tecnico `BANCO_API_SCHEMA_MYSQL_PT.sql`.

## Visao geral

```text
Login Apple/Google ou corporativo
              |
           usuarios
      /       |        \
assinaturas progresso  comunidade
      |         |          |
 permissoes  conteudos  arquivos
```

O centro do banco e a tabela `usuarios`. Quase tudo pertence a um usuario por meio do campo `usuario_id`.

## 1. Login e identificacao

### Usuario comum: Apple ou Google

```text
identidades_usuario.usuario_id -> usuarios.id
sessoes.usuario_id             -> usuarios.id
```

- `usuarios`: cria o perfil interno do aluno. O campo `status` precisa estar como `ativo` para ele poder usar o app.
- `identidades_usuario`: guarda qual conta Apple ou Google pertence ao usuario. O par `provedor` + `id_usuario_provedor` identifica a pessoa no primeiro login e nos proximos acessos.
- `sessoes`: guarda o acesso atual do usuario. `expira_em` define ate quando a sessao vale; `revogada_em` preenchido encerra aquele acesso.

No primeiro login, o app consulta `usuarios.teste_nivelamento_concluido`. Se for `0`, abre o teste; quando terminar, muda para `1` e grava o resultado resumido em `testes_nivelamento`.

### Usuario corporativo: login e senha

```text
contas_corporativas.usuario_id -> usuarios.id
contas_corporativas.empresa_id -> empresas.id
membros_empresa.usuario_id     -> usuarios.id
membros_empresa.empresa_id     -> empresas.id
```

- `contas_corporativas`: e a conta criada manualmente para parceiros. `login` e usado para entrar; `senha_hash` guarda a senha protegida, nunca a senha pura; `status = ativa` libera o login.
- `empresas`: cadastro da empresa parceira.
- `membros_empresa`: vincula um usuario a uma empresa e define o `perfil` (`admin` ou `usuario`).

Depois de qualquer tipo de login valido, a API cria ou atualiza uma linha em `sessoes`.

## 2. Assinatura e liberacao de acesso

```text
produtos_loja.plano_id -> planos.id
assinaturas.usuario_id -> usuarios.id
assinaturas.plano_id   -> planos.id
permissoes_plano.plano_id -> planos.id
permissoes_usuario.usuario_id -> usuarios.id
```

- `planos`: define os planos existentes, hoje `gratuito`, `base` e os que forem corporativos.
- `produtos_loja`: liga um plano ao identificador de compra da Apple Store ou Play Store. Exemplo: o produto mensal da loja aponta para o plano `base`.
- `assinaturas`: registra que o usuario comprou ou possui um plano. Para liberar a assinatura, a API verifica `status = ativa` e se `periodo_atual_fim` ainda nao passou.
- `eventos_compra`: historico tecnico dos retornos de compra/renovacao/cancelamento recebidos das lojas. Ele serve para auditoria e para atualizar `assinaturas` corretamente.
- `permissoes_plano`: define o que cada plano libera. A permissao `tipo_recurso = todo_conteudo` no plano Base libera todos os cursos atuais.
- `permissoes_usuario`: permite liberar algo diretamente para uma pessoa, sem depender de uma compra. Exemplo: acesso manual, cortesia ou acesso corporativo. `status = ativa` e a data `termina_em` controlam a validade.

Para abrir uma aula, a API segue esta ordem simples:

1. Se `conteudos.gratuita = 1`, libera a aula de demonstracao.
2. Se nao for gratuita, procura uma `assinaturas` ativa do usuario e le as permissoes do plano.
3. Tambem aceita uma `permissoes_usuario` ativa para aquele usuario.

## 3. Cursos, niveis, modulos e aulas

Tudo fica na tabela `conteudos`, uma linha por aula.

- `curso_codigo` e `curso_nome`: a qual curso a aula pertence.
- `nivel_codigo` e `nivel_nome`: nivel da aula.
- `modulo_codigo` e `modulo_nome`: modulo da aula.
- `aula_codigo` e `aula_titulo`: identificacao da aula.
- `ordem`: posicao da aula na tela.
- `gratuita`: quando vale `1`, a aula aparece para quem ainda nao assinou.
- `ativa`: quando vale `0`, a aula deixa de aparecer para todos.

Nao existe uma tabela separada para curso, nivel ou modulo neste MVP. A API agrupa as linhas de `conteudos` para montar a navegacao.

## 4. Nivelamento e preferencias

```text
testes_nivelamento.usuario_id  -> usuarios.id
preferencias_usuario.usuario_id -> usuarios.id
```

- `testes_nivelamento`: salva apenas o resumo do teste concluido: curso e nivel escolhidos/recomendados, pontuacao e data em `concluido_em`.
- `preferencias_usuario`: guarda a escolha atual do aluno, como `curso_preferido_codigo`, `nivel_preferido_codigo` e configuracoes do app.

O nivel recomendado do teste ajuda a definir o primeiro conteudo mostrado no Home; a preferencia permite ao usuario trocar depois.

## 5. Progresso do aluno

```text
conclusoes_aula.usuario_id  -> usuarios.id
conclusoes_aula.conteudo_id -> conteudos.id
eventos_xp_usuario.usuario_id -> usuarios.id
eventos_xp_usuario.conclusao_aula_id -> conclusoes_aula.id
sequencias_usuario.usuario_id -> usuarios.id
```

- `conclusoes_aula`: confirma que o usuario concluiu uma aula. O campo `conteudo_id` mostra qual aula foi finalizada; essa e a informacao que faz o progresso sobreviver a troca de celular.
- `eventos_xp_usuario`: cada ganho ou ajuste de XP. `quantidade` informa quanto foi ganho e `conclusao_aula_id` pode apontar para a aula que gerou esse XP.
- `sequencias_usuario`: guarda dias consecutivos de atividade. `data_ultima_atividade` e usada para calcular a sequencia.
- `tentativas_exercicio`: historico de respostas. `correta` informa se acertou; `resposta_texto` ou `resposta_json` guarda a resposta; `arquivo_id` e usado somente quando houver audio/imagem ligado a tentativa.

## 6. Arquivos de audio e imagem

```text
arquivos.usuario_id                    -> usuarios.id
usuarios.foto_arquivo_id               -> arquivos.id
tentativas_exercicio.arquivo_id        -> arquivos.id
posts_comunidade.arquivo_id            -> arquivos.id
```

`arquivos` e a biblioteca central de arquivos originais. Ela aceita somente `tipo = audio` ou `tipo = imagem`.

- `url`: endereco do arquivo armazenado.
- `origem`: explica de onde ele veio, como `conteudo`, `comunidade` ou `exercicio`.
- `usuario_id`: identifica quem enviou, quando for um arquivo de usuario.
- `duracao_segundos`: usada para audio.
- `largura_px` e `altura_px`: usadas para imagem.

As outras tabelas nao repetem a URL: elas guardam `arquivo_id` e apontam para o mesmo registro central.

## 7. Comunidade

```text
posts_comunidade.usuario_id -> usuarios.id
posts_comunidade.arquivo_id -> arquivos.id
posts_comunidade.conteudo_id -> conteudos.id
comentarios_comunidade.post_id -> posts_comunidade.id
comentarios_comunidade.autor_id -> usuarios.id
reacoes_comunidade.post_id -> posts_comunidade.id
reacoes_comunidade.usuario_id -> usuarios.id
```

- `posts_comunidade`: post principal. `tipo = texto` aceita texto manual ou o texto vindo do exercicio 12. `tipo = audio` so pode ter `origem = exercicio16` e precisa de `arquivo_id`.
- `origem`: mostra se o post foi escrito manualmente, veio do `exercicio12` ou do `exercicio16`.
- `conteudo_id`, `chave_slide` e `tipo_exercicio`: apontam de qual aula/exercicio o post automatico foi criado.
- `status = publicado` faz o post aparecer; `excluido` o esconde sem apagar seu historico.
- `comentarios_comunidade`: comentarios de texto no post. `status` permite ocultar ou excluir um comentario.
- `reacoes_comunidade`: registra likes. A regra unica por `post_id` + `usuario_id` evita que a mesma pessoa curta o mesmo post varias vezes.

## Regras essenciais para a API

1. Nunca confie apenas no aplicativo: toda liberacao de aula e de recurso deve ser conferida pela API no banco.
2. A chave do progresso e `usuarios.id`, nao o celular. Por isso assinatura e progresso voltam quando a pessoa entra novamente com a mesma conta Apple/Google.
3. A API deve validar a compra da Apple/Google antes de criar ou renovar uma linha em `assinaturas`.
4. Senhas corporativas devem ser salvas somente no campo `senha_hash`, usando bcrypt ou argon2 na API.
5. Para publicar na comunidade, a API deve validar a combinacao de `tipo`, `origem` e `arquivo_id`: texto manual/exercicio 12 ou audio apenas do exercicio 16.
