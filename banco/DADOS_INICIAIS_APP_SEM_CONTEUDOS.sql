-- Dados iniciais do app Lingueto
-- Rode este arquivo depois de criar as tabelas.
-- Nao inclui inserts de "conteudos" nem de "produtos_loja".

USE lingueto;
SET NAMES utf8mb4;

START TRANSACTION;

-- =========================================================
-- PLANOS
-- =========================================================

INSERT INTO planos (codigo, nome, descricao, ativo)
VALUES
  ('gratuito', 'Gratuito', 'Acesso inicial com aulas demonstrativas.', 1),
  ('base', 'Base', 'Assinatura unica inicial que libera todos os cursos e niveis atuais.', 1),
  ('corporativo_santander', 'Corporativo Santander', 'Plano para acessos corporativos criados manualmente.', 1)
ON DUPLICATE KEY UPDATE
  nome = VALUES(nome),
  descricao = VALUES(descricao),
  ativo = VALUES(ativo);

-- =========================================================
-- FUNCIONALIDADES DO APP
-- =========================================================

INSERT INTO funcionalidades (codigo, nome, descricao)
VALUES
  ('comunidade', 'Comunidade', 'Feed com posts de texto, posts de audio dos exercicios 16, comentarios e likes.'),
  ('todos_cursos_atuais', 'Todos os cursos atuais', 'Libera todos os cursos, niveis, modulos e aulas cadastrados no app.'),
  ('teste_nivelamento', 'Teste de nivelamento', 'Fluxo obrigatorio no primeiro acesso do usuario.'),
  ('progresso_usuario', 'Progresso do usuario', 'Salva aulas concluidas, XP e sequencia para manter o historico em outro celular.')
ON DUPLICATE KEY UPDATE
  nome = VALUES(nome),
  descricao = VALUES(descricao);

-- =========================================================
-- PERMISSOES DOS PLANOS
-- =========================================================

-- Plano Base libera todo o catalogo atual.
INSERT IGNORE INTO permissoes_plano (plano_id, tipo_recurso, recurso_id, acesso)
SELECT id, 'todo_conteudo', 'conteudo_atual_app', 'permitir'
FROM planos
WHERE codigo = 'base';

-- Plano Base libera a comunidade.
INSERT IGNORE INTO permissoes_plano (plano_id, tipo_recurso, recurso_id, acesso)
SELECT p.id, 'funcionalidade', CAST(f.id AS CHAR), 'permitir'
FROM planos p
JOIN funcionalidades f ON f.codigo = 'comunidade'
WHERE p.codigo = 'base';

-- Plano corporativo Santander tambem libera todo o catalogo atual.
INSERT IGNORE INTO permissoes_plano (plano_id, tipo_recurso, recurso_id, acesso)
SELECT id, 'todo_conteudo', 'conteudo_atual_app', 'permitir'
FROM planos
WHERE codigo = 'corporativo_santander';

-- Plano corporativo Santander tambem libera a comunidade.
INSERT IGNORE INTO permissoes_plano (plano_id, tipo_recurso, recurso_id, acesso)
SELECT p.id, 'funcionalidade', CAST(f.id AS CHAR), 'permitir'
FROM planos p
JOIN funcionalidades f ON f.codigo = 'comunidade'
WHERE p.codigo = 'corporativo_santander';

-- =========================================================
-- EMPRESAS E CONTRATOS CORPORATIVOS
-- =========================================================

INSERT INTO empresas (codigo, nome, status)
VALUES
  ('santander', 'Santander', 'ativa')
ON DUPLICATE KEY UPDATE
  nome = VALUES(nome),
  status = VALUES(status);

-- Contrato exemplo para o Santander usando o plano corporativo.
-- Se ainda nao quiser ativar Santander, pode remover este bloco.
INSERT INTO contratos_empresa (empresa_id, plano_id, inicia_em, termina_em, limite_usuarios, status)
SELECT e.id, p.id, NOW(), NULL, NULL, 'ativo'
FROM empresas e
JOIN planos p ON p.codigo = 'corporativo_santander'
WHERE e.codigo = 'santander'
  AND NOT EXISTS (
    SELECT 1
    FROM contratos_empresa c
    WHERE c.empresa_id = e.id
      AND c.status = 'ativo'
  );

-- =========================================================
-- MODELO PARA CRIAR CONTA CORPORATIVA MANUAL
-- =========================================================
-- Este bloco fica comentado porque depende de nome, login e senha_hash.
-- A senha_hash deve ser gerada pela API com bcrypt/argon2, nunca em texto puro.
--
-- INSERT INTO usuarios (nome_exibicao, tipo_usuario, teste_nivelamento_concluido, primeiro_login_em, status)
-- VALUES ('Nome do Usuario Santander', 'corporativo', 1, NOW(), 'ativo');
--
-- SET @usuario_corporativo_id = LAST_INSERT_ID();
--
-- INSERT INTO contas_corporativas (usuario_id, empresa_id, login, senha_hash, perfil, status)
-- SELECT @usuario_corporativo_id, e.id, 'usuario@santander.com.br', 'HASH_GERADO_PELA_API', 'usuario', 'ativa'
-- FROM empresas e
-- WHERE e.codigo = 'santander';
--
-- INSERT INTO membros_empresa (empresa_id, usuario_id, perfil, status)
-- SELECT e.id, @usuario_corporativo_id, 'usuario', 'ativo'
-- FROM empresas e
-- WHERE e.codigo = 'santander';

-- =========================================================
-- MODELO PARA ARQUIVOS PADRAO DO APP
-- =========================================================
-- A tabela "arquivos" deve receber somente URLs reais de imagens ou audios.
-- Deixe comentado ate voce ter as URLs finais em servidor/CDN.
--
-- INSERT INTO arquivos (
--   usuario_id, tipo, origem, provedor_armazenamento, url,
--   nome_original, tipo_mime, texto_alternativo
-- )
-- VALUES
--   (NULL, 'imagem', 'sistema', 'cdn', 'https://seu-dominio.com/arquivos/logo.png', 'logo.png', 'image/png', 'Logo do app Lingueto');

COMMIT;
