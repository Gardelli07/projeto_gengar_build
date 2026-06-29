-- Esquema do banco da API Lingueto
-- Versao MySQL/MariaDB para XAMPP/phpMyAdmin
-- Nomes de tabelas e colunas em portugues para facilitar leitura.

CREATE DATABASE IF NOT EXISTS lingueto
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE lingueto;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =========================================================
-- USUARIOS, LOGIN APPLE/GOOGLE E LOGIN CORPORATIVO
-- =========================================================

CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome_exibicao VARCHAR(150) NULL,
  foto_arquivo_id BIGINT UNSIGNED NULL,
  tipo_usuario ENUM('consumidor', 'corporativo') NOT NULL DEFAULT 'consumidor',
  teste_nivelamento_concluido TINYINT(1) NOT NULL DEFAULT 0,
  primeiro_login_em DATETIME NULL,
  status ENUM('ativo', 'bloqueado', 'excluido') NOT NULL DEFAULT 'ativo',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_usuarios_foto_arquivo (foto_arquivo_id),
  INDEX idx_usuarios_tipo_status (tipo_usuario, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS identidades_usuario (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  provedor ENUM('apple', 'google') NOT NULL,
  id_usuario_provedor VARCHAR(255) NOT NULL,
  email VARCHAR(255) NULL,
  email_verificado TINYINT(1) NOT NULL DEFAULT 0,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ultimo_login_em DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_identidades_provedor_usuario (provedor, id_usuario_provedor),
  INDEX idx_identidades_usuario (usuario_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS empresas (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(100) NOT NULL,
  nome VARCHAR(180) NOT NULL,
  status ENUM('ativa', 'inativa') NOT NULL DEFAULT 'ativa',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_empresas_codigo (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contas_corporativas (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  empresa_id BIGINT UNSIGNED NOT NULL,
  login VARCHAR(180) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  perfil ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
  criada_manualmente TINYINT(1) NOT NULL DEFAULT 1,
  status ENUM('ativa', 'bloqueada', 'excluida') NOT NULL DEFAULT 'ativa',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_contas_corporativas_usuario (usuario_id),
  UNIQUE KEY uq_contas_corporativas_login (login),
  INDEX idx_contas_corporativas_empresa (empresa_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS membros_empresa (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  empresa_id BIGINT UNSIGNED NOT NULL,
  usuario_id BIGINT UNSIGNED NOT NULL,
  perfil ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
  status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_membros_empresa_usuario (empresa_id, usuario_id),
  INDEX idx_membros_empresa_usuario (usuario_id),
  FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sessoes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  refresh_token_hash VARCHAR(255) NOT NULL,
  plataforma ENUM('ios', 'android', 'web') NULL,
  expira_em DATETIME NOT NULL,
  revogada_em DATETIME NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sessoes_refresh_token_hash (refresh_token_hash),
  INDEX idx_sessoes_usuario (usuario_id),
  INDEX idx_sessoes_expira_em (expira_em),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- PLANOS, PRODUTOS DAS LOJAS, ASSINATURAS E PERMISSOES
-- =========================================================

CREATE TABLE IF NOT EXISTS planos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(100) NOT NULL,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_planos_codigo (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS produtos_loja (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  plano_id BIGINT UNSIGNED NOT NULL,
  plataforma ENUM('ios', 'android') NOT NULL,
  id_produto_loja VARCHAR(255) NOT NULL,
  periodo_cobranca ENUM('mensal', 'anual') NOT NULL DEFAULT 'mensal',
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_produtos_loja_plataforma_produto (plataforma, id_produto_loja),
  INDEX idx_produtos_loja_plano (plano_id),
  FOREIGN KEY (plano_id) REFERENCES planos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assinaturas (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  plano_id BIGINT UNSIGNED NOT NULL,
  plataforma ENUM('ios', 'android', 'corporativo') NOT NULL,
  id_produto_loja VARCHAR(255) NULL,
  id_transacao_original_loja VARCHAR(255) NULL,
  token_compra_loja VARCHAR(700) NULL,
  status ENUM('ativa', 'teste', 'pagamento_pendente', 'cancelada', 'expirada', 'revogada') NOT NULL DEFAULT 'ativa',
  periodo_atual_inicio DATETIME NULL,
  periodo_atual_fim DATETIME NULL,
  renovacao_automatica TINYINT(1) NOT NULL DEFAULT 0,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_assinaturas_usuario_status (usuario_id, status),
  INDEX idx_assinaturas_periodo_fim (periodo_atual_fim),
  INDEX idx_assinaturas_plano (plano_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (plano_id) REFERENCES planos(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS eventos_compra (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NULL,
  assinatura_id BIGINT UNSIGNED NULL,
  plataforma ENUM('ios', 'android') NOT NULL,
  tipo_evento VARCHAR(120) NOT NULL,
  id_produto_loja VARCHAR(255) NULL,
  id_transacao_loja VARCHAR(255) NULL,
  id_transacao_original_loja VARCHAR(255) NULL,
  token_compra_loja VARCHAR(700) NULL,
  payload_bruto LONGTEXT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_eventos_compra_usuario (usuario_id),
  INDEX idx_eventos_compra_assinatura (assinatura_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (assinatura_id) REFERENCES assinaturas(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS permissoes_usuario (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  plano_id BIGINT UNSIGNED NULL,
  origem ENUM('assinatura', 'manual', 'corporativo') NOT NULL DEFAULT 'assinatura',
  tipo_recurso ENUM('conteudo', 'funcionalidade', 'todo_conteudo') NOT NULL,
  recurso_id VARCHAR(191) NULL,
  inicia_em DATETIME NULL,
  termina_em DATETIME NULL,
  status ENUM('ativa', 'expirada', 'revogada') NOT NULL DEFAULT 'ativa',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_permissoes_usuario (usuario_id, status),
  INDEX idx_permissoes_usuario_plano (plano_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (plano_id) REFERENCES planos(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- CATALOGO UNICO DE CONTEUDOS
-- Cada linha representa uma aula, ja com curso, nivel e modulo.
-- =========================================================

CREATE TABLE IF NOT EXISTS conteudos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  curso_codigo VARCHAR(100) NOT NULL,
  curso_nome VARCHAR(180) NOT NULL,
  nivel_codigo VARCHAR(100) NOT NULL DEFAULT '',
  nivel_nome VARCHAR(150) NULL,
  modulo_codigo VARCHAR(100) NOT NULL DEFAULT '',
  modulo_nome VARCHAR(180) NULL,
  aula_codigo VARCHAR(120) NOT NULL,
  aula_titulo VARCHAR(255) NOT NULL,
  nome_tela VARCHAR(150) NULL,
  ordem INT NOT NULL DEFAULT 0,
  gratuita TINYINT(1) NOT NULL DEFAULT 0,
  ativa TINYINT(1) NOT NULL DEFAULT 1,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_conteudos_aula (curso_codigo, nivel_codigo, aula_codigo),
  INDEX idx_conteudos_curso_nivel (curso_codigo, nivel_codigo, ordem),
  INDEX idx_conteudos_modulo (curso_codigo, nivel_codigo, modulo_codigo, ordem),
  INDEX idx_conteudos_gratuitos (gratuita, ativa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS funcionalidades (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(100) NOT NULL,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_funcionalidades_codigo (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS permissoes_plano (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  plano_id BIGINT UNSIGNED NOT NULL,
  tipo_recurso ENUM('conteudo', 'funcionalidade', 'todo_conteudo') NOT NULL,
  recurso_id VARCHAR(191) NULL,
  acesso ENUM('permitir') NOT NULL DEFAULT 'permitir',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_permissoes_plano_recurso (plano_id, tipo_recurso, recurso_id),
  INDEX idx_permissoes_plano (plano_id),
  FOREIGN KEY (plano_id) REFERENCES planos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- CONTRATOS E ACESSOS CORPORATIVOS
-- =========================================================

CREATE TABLE IF NOT EXISTS contratos_empresa (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  empresa_id BIGINT UNSIGNED NOT NULL,
  plano_id BIGINT UNSIGNED NULL,
  inicia_em DATETIME NULL,
  termina_em DATETIME NULL,
  limite_usuarios INT NULL,
  status ENUM('ativo', 'expirado', 'cancelado') NOT NULL DEFAULT 'ativo',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_contratos_empresa (empresa_id),
  INDEX idx_contratos_empresa_plano (plano_id),
  FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE,
  FOREIGN KEY (plano_id) REFERENCES planos(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- PATCH: tabela "permissoes_empresa" removida.
-- Decisao: a liberacao de conteudo para empresa passa a ter uma unica fonte,
-- "contratos_empresa.plano_id" (via "permissoes_plano" do plano contratado).
-- Caso surja a necessidade de excecao pontual por empresa no futuro, recriar
-- aqui uma tabela equivalente quando o caso de uso for confirmado.

-- =========================================================
-- TESTE DE NIVELAMENTO E PREFERENCIAS
-- =========================================================

CREATE TABLE IF NOT EXISTS testes_nivelamento (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  curso_escolhido_codigo VARCHAR(100) NULL,
  nivel_escolhido_codigo VARCHAR(100) NULL,
  curso_recomendado_codigo VARCHAR(100) NULL,
  nivel_recomendado_codigo VARCHAR(100) NULL,
  pontuacao INT NOT NULL DEFAULT 0,
  total_perguntas INT NOT NULL DEFAULT 0,
  concluido_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_testes_nivelamento_usuario (usuario_id, concluido_em),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS preferencias_usuario (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  curso_preferido_codigo VARCHAR(100) NULL,
  nivel_preferido_codigo VARCHAR(100) NULL,
  notificacao_ativa TINYINT(1) NOT NULL DEFAULT 1,
  configuracoes_json LONGTEXT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_preferencias_usuario (usuario_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- PROGRESSO, XP E SEQUENCIA
-- =========================================================

CREATE TABLE IF NOT EXISTS conclusoes_aula (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  conteudo_id BIGINT UNSIGNED NOT NULL,
  acuracia INT NOT NULL DEFAULT 0,
  xp_ganho INT NOT NULL DEFAULT 0,
  assinatura_id BIGINT UNSIGNED NULL,
  concluida_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  -- PATCH: confirmado que ao refazer uma aula ja concluida o registro deve
  -- ser ATUALIZADO (guarda so o resultado mais recente), nao duplicado.
  -- A API deve usar "INSERT ... ON DUPLICATE KEY UPDATE" nesta tabela,
  -- aproveitando a UNIQUE KEY abaixo. Estrutura nao precisou mudar.
  UNIQUE KEY uq_conclusoes_usuario_conteudo (usuario_id, conteudo_id),
  INDEX idx_conclusoes_usuario (usuario_id, concluida_em),
  INDEX idx_conclusoes_conteudo (conteudo_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (conteudo_id) REFERENCES conteudos(id) ON DELETE CASCADE,
  FOREIGN KEY (assinatura_id) REFERENCES assinaturas(id) ON DELETE SET NULL,
  CHECK (acuracia >= 0 AND acuracia <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS eventos_xp_usuario (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  conclusao_aula_id BIGINT UNSIGNED NULL,
  quantidade INT NOT NULL,
  motivo VARCHAR(120) NOT NULL DEFAULT 'aula_concluida',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_eventos_xp_usuario (usuario_id, criado_em),
  INDEX idx_eventos_xp_conclusao (conclusao_aula_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (conclusao_aula_id) REFERENCES conclusoes_aula(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sequencias_usuario (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  sequencia_atual INT NOT NULL DEFAULT 0,
  melhor_sequencia INT NOT NULL DEFAULT 0,
  data_ultima_atividade DATE NULL,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sequencias_usuario (usuario_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- ARQUIVOS, TENTATIVAS DOS EXERCICIOS E COMUNIDADE
-- =========================================================

CREATE TABLE IF NOT EXISTS arquivos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NULL,
  tipo ENUM('audio', 'imagem') NOT NULL,
  origem ENUM('usuario', 'sistema', 'conteudo', 'comunidade', 'exercicio') NOT NULL DEFAULT 'usuario',
  provedor_armazenamento VARCHAR(80) NOT NULL DEFAULT 'local',
  url VARCHAR(1000) NOT NULL,
  nome_original VARCHAR(255) NULL,
  tipo_mime VARCHAR(120) NULL,
  tamanho_bytes BIGINT UNSIGNED NULL,
  duracao_segundos INT NULL,
  largura_px INT NULL,
  altura_px INT NULL,
  texto_alternativo VARCHAR(255) NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_arquivos_usuario (usuario_id, tipo),
  INDEX idx_arquivos_tipo_origem (tipo, origem),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tentativas_exercicio (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  conteudo_id BIGINT UNSIGNED NULL,
  chave_slide VARCHAR(180) NULL,
  tipo_exercicio VARCHAR(80) NOT NULL,
  correta TINYINT(1) NOT NULL DEFAULT 0,
  resposta_texto TEXT NULL,
  resposta_json LONGTEXT NULL,
  arquivo_id BIGINT UNSIGNED NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_tentativas_usuario (usuario_id, criado_em),
  INDEX idx_tentativas_conteudo (conteudo_id, tipo_exercicio),
  INDEX idx_tentativas_arquivo (arquivo_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (conteudo_id) REFERENCES conteudos(id) ON DELETE SET NULL,
  FOREIGN KEY (arquivo_id) REFERENCES arquivos(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS posts_comunidade (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  tipo ENUM('texto', 'audio') NOT NULL,
  conteudo_texto TEXT NULL,
  arquivo_id BIGINT UNSIGNED NULL,
  origem ENUM('manual', 'exercicio12', 'exercicio16') NOT NULL DEFAULT 'manual',
  conteudo_id BIGINT UNSIGNED NULL,
  chave_slide VARCHAR(180) NULL,
  tipo_exercicio VARCHAR(80) NULL,
  status ENUM('publicado', 'excluido') NOT NULL DEFAULT 'publicado',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_posts_comunidade_feed (status, criado_em),
  INDEX idx_posts_comunidade_usuario (usuario_id, criado_em),
  INDEX idx_posts_comunidade_arquivo (arquivo_id),
  INDEX idx_posts_comunidade_conteudo (conteudo_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (arquivo_id) REFERENCES arquivos(id) ON DELETE SET NULL,
  FOREIGN KEY (conteudo_id) REFERENCES conteudos(id) ON DELETE SET NULL,
  CHECK (
    (tipo = 'texto' AND origem IN ('manual', 'exercicio12') AND conteudo_texto IS NOT NULL AND arquivo_id IS NULL)
    OR
    (tipo = 'audio' AND arquivo_id IS NOT NULL AND origem = 'exercicio16')
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reacoes_comunidade (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  post_id BIGINT UNSIGNED NOT NULL,
  usuario_id BIGINT UNSIGNED NOT NULL,
  tipo ENUM('like') NOT NULL DEFAULT 'like',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_reacoes_post_usuario_tipo (post_id, usuario_id, tipo),
  INDEX idx_reacoes_post (post_id),
  INDEX idx_reacoes_usuario (usuario_id),
  FOREIGN KEY (post_id) REFERENCES posts_comunidade(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS comentarios_comunidade (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  post_id BIGINT UNSIGNED NOT NULL,
  autor_id BIGINT UNSIGNED NOT NULL,
  comentario TEXT NOT NULL,
  status ENUM('visivel', 'oculto', 'excluido') NOT NULL DEFAULT 'visivel',
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_comentarios_post (post_id),
  INDEX idx_comentarios_autor (autor_id),
  FOREIGN KEY (post_id) REFERENCES posts_comunidade(id) ON DELETE CASCADE,
  FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- DADOS INICIAIS
-- Os ids de produto das lojas serao preenchidos depois,
-- quando App Store e Play Store estiverem configuradas.
-- =========================================================

INSERT IGNORE INTO planos (codigo, nome, descricao, ativo)
VALUES
  ('gratuito', 'Gratuito', 'Aulas demonstrativas sem assinatura.', 1),
  ('base', 'Base', 'Libera todos os cursos e niveis atuais do app.', 1),
  ('corporativo_santander', 'Corporativo Santander', 'Acesso corporativo Santander.', 1);

INSERT IGNORE INTO funcionalidades (codigo, nome, descricao)
VALUES
  ('comunidade', 'Comunidade', 'Feed com posts, comentarios e likes.'),
  ('todos_cursos_atuais', 'Todos os cursos atuais', 'Libera todos os cursos e niveis existentes na versao inicial.');

INSERT IGNORE INTO permissoes_plano (plano_id, tipo_recurso, recurso_id, acesso)
SELECT id, 'todo_conteudo', 'conteudo_atual_app', 'permitir'
FROM planos
WHERE codigo = 'base';

INSERT IGNORE INTO empresas (codigo, nome, status)
VALUES ('santander', 'Santander', 'ativa');

-- =========================================================
-- PATCH: FOREIGN KEY PENDENTE (item 1)
-- "usuarios.foto_arquivo_id" tinha indice mas nao tinha FK para "arquivos".
-- Precisa ser ALTER TABLE porque "arquivos" e criada depois de "usuarios".
-- =========================================================

ALTER TABLE usuarios
  ADD CONSTRAINT fk_usuarios_foto_arquivo
  FOREIGN KEY (foto_arquivo_id) REFERENCES arquivos(id) ON DELETE SET NULL;

SET FOREIGN_KEY_CHECKS = 1;
