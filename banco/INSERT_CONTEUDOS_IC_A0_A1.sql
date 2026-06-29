-- Inserts da tabela conteudos
-- Curso: IC - Ingles Completo
-- Nivel: A0-A1
-- Rode depois do schema principal.

USE lingueto;
SET NAMES utf8mb4;

START TRANSACTION;

INSERT INTO conteudos (
  curso_codigo,
  curso_nome,
  nivel_codigo,
  nivel_nome,
  modulo_codigo,
  modulo_nome,
  aula_codigo,
  aula_titulo,
  nome_tela,
  ordem,
  gratuita,
  ativa
)
VALUES
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M01', 'BASICS', 'IC01', 'Hello/Hi', 'IC01', 1, 1, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M01', 'BASICS', 'IC02', 'Hey/Hey there!', 'IC02', 2, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M01', 'BASICS', 'IC03', 'What''s up/Howdy', 'IC03', 3, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M01', 'BASICS', 'IC04', 'Bye/See ya!', 'IC04', 4, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M01', 'BASICS', 'IC05', 'Review Module 1', 'IC05', 5, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M01', 'BASICS', 'IC06', 'CHALLENGE', 'IC06', 6, 0, 1),

  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC07', 'I am happy!', 'IC07', 7, 1, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC08', 'She is a teacher!', 'IC08', 8, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC09', 'Is he nice?', 'IC09', 9, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC10', 'You are my friend!', 'IC10', 10, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC11', 'We are family!', 'IC11', 11, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC12', 'Are you ready?', 'IC12', 12, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC13', 'Review - Affirmative', 'IC13', 13, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC14', 'Review - Negative', 'IC14', 14, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC15', 'Review - Interrogative', 'IC15', 15, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC16', 'Review - Complete', 'IC16', 16, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M02', 'I am a student!', 'IC17', 'Challenge', 'IC17', 17, 0, 1),

  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M03', 'Good morning!', 'IC18', 'Morning!', 'IC18', 18, 1, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M03', 'Good morning!', 'IC19', 'Good evening!', 'IC19', 19, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M03', 'Good morning!', 'IC20', 'See you!', 'IC20', 20, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M03', 'Good morning!', 'IC21', 'Morning!', 'IC21', 21, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M03', 'Good morning!', 'IC22', 'Regional Greetings', 'IC22', 22, 0, 1),

  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M04', 'Alphabet', 'IC23', 'Vowels', 'IC23', 23, 1, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M04', 'Alphabet', 'IC24', 'Time do EE', 'IC24', 24, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M04', 'Alphabet', 'IC25', 'Time do EH', 'IC25', 25, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M04', 'Alphabet', 'IC26', 'Letras rebeldes', 'IC26', 26, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M04', 'Alphabet', 'IC27', 'What''s your name?', 'IC27', 27, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M04', 'Alphabet', 'IC28', 'It is J-A...', 'IC28', 28, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M04', 'Alphabet', 'IC29', 'Difference b/p v/w', 'IC29', 29, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M04', 'Alphabet', 'IC30', 'O Mestre da Soletracao', 'IC30', 30, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M04', 'Alphabet', 'IC31', 'Boss Level', 'IC31', 31, 0, 1),

  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M05', 'Numbers', 'IC32', '0-10', 'IC32', 32, 1, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M05', 'Numbers', 'IC33', '11-20', 'IC33', 33, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M05', 'Numbers', 'IC34', '20-100', 'IC34', 34, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M05', 'Numbers', 'IC35', 'How old are you?', 'IC35', 35, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M05', 'Numbers', 'IC36', 'Phone number', 'IC36', 36, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M05', 'Numbers', 'IC37', 'How much is it?', 'IC37', 37, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M05', 'Numbers', 'IC38', 'Challenge', 'IC38', 38, 0, 1),

  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M06', 'Introduction', 'IC39', 'My name is/I am', 'IC39', 39, 1, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M06', 'Introduction', 'IC40', 'What''s your name?', 'IC40', 40, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M06', 'Introduction', 'IC41', 'This is my...', 'IC41', 41, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M06', 'Introduction', 'IC42', 'Self introduction', 'IC42', 42, 0, 1),
  ('IC', 'Ingles Completo', 'A0-A1', 'A0-A1', 'M06', 'Introduction', 'IC43', 'Boss level', 'IC43', 43, 0, 1)
ON DUPLICATE KEY UPDATE
  curso_nome = VALUES(curso_nome),
  nivel_nome = VALUES(nivel_nome),
  modulo_codigo = VALUES(modulo_codigo),
  modulo_nome = VALUES(modulo_nome),
  aula_titulo = VALUES(aula_titulo),
  nome_tela = VALUES(nome_tela),
  ordem = VALUES(ordem),
  gratuita = VALUES(gratuita),
  ativa = VALUES(ativa);

INSERT INTO conteudos (
  curso_codigo,
  curso_nome,
  nivel_codigo,
  nivel_nome,
  modulo_codigo,
  modulo_nome,
  aula_codigo,
  aula_titulo,
  nome_tela,
  ordem,
  gratuita,
  ativa
)
VALUES
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC01', 'I am working', 'A2IC01', 1, 1, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC02', 'Part 2', 'A2IC02', 2, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC03', 'Making phrases', 'A2IC03', 3, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC04', 'Sabrina''s Blog', 'A2IC04', 4, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC05', 'Sabrina''s Picnic', 'A2IC05', 5, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC06', 'Are you studying?', 'A2IC06', 6, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC07', 'Are you writing?', 'A2IC07', 7, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC08', 'She isn''t sleeping', 'A2IC08', 8, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC09', 'I''m working tomorrow', 'A2IC09', 9, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC61', 'Challenge', 'A2IC61', 10, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC10', 'Do or doing?', 'A2IC10', 11, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M01', 'Present Continuous', 'A2IC62', 'Challenge 2', 'A2IC62', 12, 0, 1),

  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC11', 'I studied last night', 'A2IC11', 13, 1, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC63', 'Challenge 3', 'A2IC63', 14, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC12', 'I worked yesterday', 'A2IC12', 15, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC64', 'Challenge 4', 'A2IC64', 16, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC13', 'I took a shower', 'A2IC13', 17, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC65', 'Challenge 5', 'A2IC65', 18, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC14', 'I took a shower', 'A2IC14', 19, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC66', 'Challenge 6', 'A2IC66', 20, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC15', 'Regular and irregular', 'A2IC15', 21, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC67', 'Challenge 7', 'A2IC67', 22, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC16', 'I didn''t study', 'A2IC16', 23, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC68', 'Challenge 8', 'A2IC68', 24, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC17', 'I didn''t go!', 'A2IC17', 25, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC18', 'Did you study?', 'A2IC18', 26, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC69', 'Challenge 9', 'A2IC69', 27, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC19', 'Did you see it?', 'A2IC19', 28, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC20', 'Did you work?', 'A2IC20', 29, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC21', 'Nice concert!', 'A2IC21', 30, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M02', 'Simple Past', 'A2IC22', 'First/then/finally', 'A2IC22', 31, 0, 1),

  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC23', 'I was sleeping', 'A2IC23', 32, 1, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC70', 'Challenge 10', 'A2IC70', 33, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC24', 'You were working', 'A2IC24', 34, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC71', 'Challenge 11', 'A2IC71', 35, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC25', 'I wasn''t writing', 'A2IC25', 36, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC72', 'Challenge 12', 'A2IC72', 37, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC26', 'Was he sleeping?', 'A2IC26', 38, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC73', 'Challenge 13', 'A2IC73', 39, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC27', 'Final combo', 'A2IC27', 40, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC74', 'Challenge 14', 'A2IC74', 41, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC28', 'ING or ED?', 'A2IC28', 42, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC29', 'Carol''s Saturday', 'A2IC29', 43, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC30', 'Where''s my cake?', 'A2IC30', 44, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC31', 'Booking a flight', 'A2IC31', 45, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC32', 'Hotel', 'A2IC32', 46, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC33', 'Let''s go sightseeing', 'A2IC33', 47, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M03', 'Past continuous', 'A2IC34', 'Where can I...?', 'A2IC34', 48, 0, 1),

  ('IC', 'Ingles Completo', 'A2', 'A2', 'M04', 'Comparatives', 'A2IC35', 'It''s more beautiful!', 'A2IC35', 49, 1, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M04', 'Comparatives', 'A2IC36', 'It''s hotter today!', 'A2IC36', 50, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M04', 'Comparatives', 'A2IC37', 'My car is better!', 'A2IC37', 51, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M04', 'Comparatives', 'A2IC38', 'It''s much better now!', 'A2IC38', 52, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M04', 'Comparatives', 'A2IC39', 'He''s as tall as me!', 'A2IC39', 53, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M04', 'Comparatives', 'A2IC40', 'Julia''s family!', 'A2IC40', 54, 0, 1),

  ('IC', 'Ingles Completo', 'A2', 'A2', 'M05', 'Superlatives', 'A2IC41', 'It''s the most...', 'A2IC41', 55, 1, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M05', 'Superlatives', 'A2IC42', 'I''m the fastest one.', 'A2IC42', 56, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M05', 'Superlatives', 'A2IC43', 'I''m the fastest one.', 'A2IC43', 57, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M05', 'Superlatives', 'A2IC44', 'I''m the best', 'A2IC44', 58, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M05', 'Superlatives', 'A2IC45', 'The talent show', 'A2IC45', 59, 0, 1),

  ('IC', 'Ingles Completo', 'A2', 'A2', 'M06', 'Giving Advice', 'A2IC46', 'You should stop!', 'A2IC46', 60, 1, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M06', 'Giving Advice', 'A2IC47', 'What should I do?', 'A2IC47', 61, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M06', 'Giving Advice', 'A2IC48', 'What should I do?', 'A2IC48', 62, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M06', 'Giving Advice', 'A2IC49', 'I have to work all day!', 'A2IC49', 63, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M06', 'Giving Advice', 'A2IC50', 'I don''t have to work today!', 'A2IC50', 64, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M06', 'Giving Advice', 'A2IC51', 'We could stay in!', 'A2IC51', 65, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M06', 'Giving Advice', 'A2IC52', 'Why not?', 'A2IC52', 66, 0, 1),

  ('IC', 'Ingles Completo', 'A2', 'A2', 'M07', 'Technology', 'A2IC53', 'Nice laptop?', 'A2IC53', 67, 1, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M07', 'Technology', 'A2IC54', 'Nice laptop?', 'A2IC54', 68, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M07', 'Technology', 'A2IC55', 'Post it!', 'A2IC55', 69, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M07', 'Technology', 'A2IC56', 'It''s frozen!', 'A2IC56', 70, 0, 1),

  ('IC', 'Ingles Completo', 'A2', 'A2', 'M08', 'Health & Body', 'A2IC57', 'Lift your arm!', 'A2IC57', 71, 1, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M08', 'Health & Body', 'A2IC58', 'OTC', 'A2IC58', 72, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M08', 'Health & Body', 'A2IC59', 'Blister pack', 'A2IC59', 73, 0, 1),
  ('IC', 'Ingles Completo', 'A2', 'A2', 'M08', 'Health & Body', 'A2IC60', 'Drugstore', 'A2IC60', 74, 0, 1)
ON DUPLICATE KEY UPDATE
  curso_nome = VALUES(curso_nome),
  nivel_nome = VALUES(nivel_nome),
  modulo_codigo = VALUES(modulo_codigo),
  modulo_nome = VALUES(modulo_nome),
  aula_titulo = VALUES(aula_titulo),
  nome_tela = VALUES(nome_tela),
  ordem = VALUES(ordem),
  gratuita = VALUES(gratuita),
  ativa = VALUES(ativa);

INSERT INTO conteudos (
  curso_codigo,
  curso_nome,
  nivel_codigo,
  nivel_nome,
  modulo_codigo,
  modulo_nome,
  aula_codigo,
  aula_titulo,
  nome_tela,
  ordem,
  gratuita,
  ativa
)
VALUES
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M01', 'Present Perfect', 'B1IC01', 'Since I was...', 'B1IC01', 1, 1, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M01', 'Present Perfect', 'B1IC02', 'Not yet!', 'B1IC02', 2, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M01', 'Present Perfect', 'B1IC03', 'I''ve been studying!', 'B1IC03', 3, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M01', 'Present Perfect', 'B1IC04', 'What''ve you been up to?', 'B1IC04', 4, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M01', 'Present Perfect', 'B1IC05', '''ve been doing / have done', 'B1IC05', 5, 0, 1),

  ('IC', 'Ingles Completo', 'B1', 'B1', 'M02', 'Work & Modern Careers', 'B1IC06', 'Strengths', 'B1IC06', 6, 1, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M02', 'Work & Modern Careers', 'B1IC07', 'Hello dear,', 'B1IC07', 7, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M02', 'Work & Modern Careers', 'B1IC08', 'Deadline', 'B1IC08', 8, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M02', 'Work & Modern Careers', 'B1IC09', 'Hustle Culture', 'B1IC09', 9, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M02', 'Work & Modern Careers', 'B1IC10', 'Founder, Visionary, Legacy', 'B1IC10', 10, 0, 1),

  ('IC', 'Ingles Completo', 'B1', 'B1', 'M03', 'Hypothetical Situations', 'B1IC11', 'If I won', 'B1IC11', 11, 1, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M03', 'Hypothetical Situations', 'B1IC12', 'If I were you', 'B1IC12', 12, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M03', 'Hypothetical Situations', 'B1IC13', 'What would you do if...', 'B1IC13', 13, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M03', 'Hypothetical Situations', 'B1IC14', 'I wish I had...', 'B1IC14', 14, 0, 1),

  ('IC', 'Ingles Completo', 'B1', 'B1', 'M04', 'Socializing & Small Talk', 'B1IC15', 'Keep talking', 'B1IC15', 15, 1, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M04', 'Socializing & Small Talk', 'B1IC16', 'I see your point, but...', 'B1IC16', 16, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M04', 'Socializing & Small Talk', 'B1IC17', 'Clarifying', 'B1IC17', 17, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M04', 'Socializing & Small Talk', 'B1IC18', 'Breaking the ice', 'B1IC18', 18, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M04', 'Socializing & Small Talk', 'B1IC19', 'Beyond how are you?', 'B1IC19', 19, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M04', 'Socializing & Small Talk', 'B1IC20', 'Did you know?', 'B1IC20', 20, 0, 1),

  ('IC', 'Ingles Completo', 'B1', 'B1', 'M05', 'Rules, Permissions & Obligations', 'B1IC21', 'Must vs. Have to', 'B1IC21', 21, 1, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M05', 'Rules, Permissions & Obligations', 'B1IC22', 'Can''t vs. Mustn''t', 'B1IC22', 22, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M05', 'Rules, Permissions & Obligations', 'B1IC23', 'Don''t have to', 'B1IC23', 23, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M05', 'Rules, Permissions & Obligations', 'B1IC24', 'Permission in different contexts', 'B1IC24', 24, 0, 1),

  ('IC', 'Ingles Completo', 'B1', 'B1', 'M06', 'Narrative Tenses (Mastering Stories)', 'B1IC25', 'Past Perfect', 'B1IC25', 25, 1, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M06', 'Narrative Tenses (Mastering Stories)', 'B1IC26', 'Past Perfect Continuous', 'B1IC26', 26, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M06', 'Narrative Tenses (Mastering Stories)', 'B1IC27', 'Combining Tenses', 'B1IC27', 27, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M06', 'Narrative Tenses (Mastering Stories)', 'B1IC28', 'Narrative fillers', 'B1IC28', 28, 0, 1),

  ('IC', 'Ingles Completo', 'B1', 'B1', 'M07', 'The Passive Voice (Focus on Information)', 'B1IC29', 'It''s said that', 'B1IC29', 29, 1, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M07', 'The Passive Voice (Focus on Information)', 'B1IC30', 'It''s produced in...', 'B1IC30', 30, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M07', 'The Passive Voice (Focus on Information)', 'B1IC31', 'I''d like to have my car fixed', 'B1IC31', 31, 0, 1),

  ('IC', 'Ingles Completo', 'B1', 'B1', 'M08', 'Advanced Phrasal Verbs & Idioms', 'B1IC32', 'Carry out', 'B1IC32', 32, 1, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M08', 'Advanced Phrasal Verbs & Idioms', 'B1IC33', 'Time flies', 'B1IC33', 33, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M08', 'Advanced Phrasal Verbs & Idioms', 'B1IC34', 'Do vs. Make', 'B1IC34', 34, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M08', 'Advanced Phrasal Verbs & Idioms', 'B1IC35', 'Separable vs. Inseparable Phrasal Verbs', 'B1IC35', 35, 0, 1),

  ('IC', 'Ingles Completo', 'B1', 'B1', 'M09', 'Speculating About the Past (Modal Verbs 4)', 'B1IC36', 'You should have told me', 'B1IC36', 36, 1, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M09', 'Speculating About the Past (Modal Verbs 4)', 'B1IC37', 'He must have forgotten', 'B1IC37', 37, 0, 1),
  ('IC', 'Ingles Completo', 'B1', 'B1', 'M09', 'Speculating About the Past (Modal Verbs 4)', 'B1IC38', 'Couldn''t have', 'B1IC38', 38, 0, 1),

  ('IC', 'Ingles Completo', 'B1', 'B1', 'M10', 'Linking Words for Contrast', 'B1IC39', 'Linking Words for Contrast: However, Nevertheless, Despite', 'B1IC39', 39, 1, 1)
ON DUPLICATE KEY UPDATE
  curso_nome = VALUES(curso_nome),
  nivel_nome = VALUES(nivel_nome),
  modulo_codigo = VALUES(modulo_codigo),
  modulo_nome = VALUES(modulo_nome),
  aula_titulo = VALUES(aula_titulo),
  nome_tela = VALUES(nome_tela),
  ordem = VALUES(ordem),
  gratuita = VALUES(gratuita),
  ativa = VALUES(ativa);

INSERT INTO conteudos (
  curso_codigo,
  curso_nome,
  nivel_codigo,
  nivel_nome,
  modulo_codigo,
  modulo_nome,
  aula_codigo,
  aula_titulo,
  nome_tela,
  ordem,
  gratuita,
  ativa
)
VALUES
  ('BU', 'Bussines English', 'A1', 'A1', 'M01', 'Getting Started in Business', 'A1BU1', 'Greetings and Basic Introductions', 'A1BU1', 1, 1, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M01', 'Getting Started in Business', 'A1BU2', 'Describing Work Duties', 'A1BU2', 2, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M01', 'Getting Started in Business', 'A1BU3', 'Handling Simple Sales Inquiries', 'A1BU3', 3, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M01', 'Getting Started in Business', 'A1BU4', 'Giving Short Updates in Meetings', 'A1BU4', 4, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M01', 'Getting Started in Business', 'A1BU5', 'Practicing Basic Travel Conversations', 'A1BU5', 5, 0, 1),

  ('BU', 'Bussines English', 'A1', 'A1', 'M02', 'Key Business Communications', 'A1BU6', 'Participating in Meetings', 'A1BU6', 6, 1, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M02', 'Key Business Communications', 'A1BU7', 'Presenting Updates', 'A1BU7', 7, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M02', 'Key Business Communications', 'A1BU8', 'Handling Basic Problem Solving', 'A1BU8', 8, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M02', 'Key Business Communications', 'A1BU9', 'Writing Professional Emails', 'A1BU9', 9, 0, 1),

  ('BU', 'Bussines English', 'A1', 'A1', 'M03', 'Delivering Presentations', 'A1BU10', 'Structuring a Talk', 'A1BU10', 10, 1, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M03', 'Delivering Presentations', 'A1BU11', 'Describing Charts or Graphs', 'A1BU11', 11, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M03', 'Delivering Presentations', 'A1BU12', 'Managing Question and Answer Sessions', 'A1BU12', 12, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M03', 'Delivering Presentations', 'A1BU13', 'Engaging the Audience and Body Language', 'A1BU13', 13, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M03', 'Delivering Presentations', 'A1BU14', 'Closing a Presentation Strongly', 'A1BU14', 14, 0, 1),

  ('BU', 'Bussines English', 'A1', 'A1', 'M04', 'Business Negotiations', 'A1BU15', 'Making Offers', 'A1BU15', 15, 1, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M04', 'Business Negotiations', 'A1BU16', 'Presenting Counter-Offers', 'A1BU16', 16, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M04', 'Business Negotiations', 'A1BU17', 'Reaching Agreements and Compromises', 'A1BU17', 17, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M04', 'Business Negotiations', 'A1BU18', 'Handling Disagreements Constructively', 'A1BU18', 18, 0, 1),
  ('BU', 'Bussines English', 'A1', 'A1', 'M04', 'Business Negotiations', 'A1BU19', 'Finalizing and Closing the Deal', 'A1BU19', 19, 0, 1)
ON DUPLICATE KEY UPDATE
  curso_nome = VALUES(curso_nome),
  nivel_nome = VALUES(nivel_nome),
  modulo_codigo = VALUES(modulo_codigo),
  modulo_nome = VALUES(modulo_nome),
  aula_titulo = VALUES(aula_titulo),
  nome_tela = VALUES(nome_tela),
  ordem = VALUES(ordem),
  gratuita = VALUES(gratuita),
  ativa = VALUES(ativa);

INSERT INTO conteudos (
  curso_codigo,
  curso_nome,
  nivel_codigo,
  nivel_nome,
  modulo_codigo,
  modulo_nome,
  aula_codigo,
  aula_titulo,
  nome_tela,
  ordem,
  gratuita,
  ativa
)
VALUES
  ('BU', 'Bussines English', 'B1', 'B1', 'M01', 'Controlling the Narrative', 'B1BU1', 'Setting the Stage & Defining the Agenda', 'B1BU1', 1, 1, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M01', 'Controlling the Narrative', 'B1BU2', 'The Parking Lot', 'B1BU2', 2, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M01', 'Controlling the Narrative', 'B1BU3', 'Silencing Dominators', 'B1BU3', 3, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M01', 'Controlling the Narrative', 'B1BU4', 'Timeboxing and Pacing', 'B1BU4', 4, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M01', 'Controlling the Narrative', 'B1BU5', 'De-escalating Conflict', 'B1BU5', 5, 0, 1),

  ('BU', 'Bussines English', 'B1', 'B1', 'M02', 'The Art of Nuance & Diplomacy', 'B1BU6', 'Hedging & Softening', 'B1BU6', 6, 1, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M02', 'The Art of Nuance & Diplomacy', 'B1BU7', 'Strategic Interruptions', 'B1BU7', 7, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M02', 'The Art of Nuance & Diplomacy', 'B1BU8', 'Clarifying & Probing', 'B1BU8', 8, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M02', 'The Art of Nuance & Diplomacy', 'B1BU9', 'Diplomatic Disagreement', 'B1BU9', 9, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M02', 'The Art of Nuance & Diplomacy', 'B1BU10', 'Navigating Cross-Cultural & Virtual Nuances', 'B1BU10', 10, 0, 1),

  ('BU', 'Bussines English', 'B1', 'B1', 'M03', 'High-Stakes Negotiations', 'B1BU11', 'Setting the Anchor & The Pitch', 'B1BU11', 11, 1, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M03', 'High-Stakes Negotiations', 'B1BU12', 'Concessions & Counter-Offers', 'B1BU12', 12, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M03', 'High-Stakes Negotiations', 'B1BU13', 'Sourcing & Supply Chain Terminology', 'B1BU13', 13, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M03', 'High-Stakes Negotiations', 'B1BU14', 'The International Vendor Scenario', 'B1BU14', 14, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M03', 'High-Stakes Negotiations', 'B1BU15', 'Breaking Deadlocks & Closing the Deal', 'B1BU15', 15, 0, 1),

  ('BU', 'Bussines English', 'B1', 'B1', 'M04', 'Resolution & Accountability', 'B1BU16', 'Distilling & Summarizing Complex Agreements', 'B1BU16', 16, 1, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M04', 'Resolution & Accountability', 'B1BU17', 'Assigning Deliverables & Action Items', 'B1BU17', 17, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M04', 'Resolution & Accountability', 'B1BU18', 'The Executive Follow-up Email', 'B1BU18', 18, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M04', 'Resolution & Accountability', 'B1BU19', 'Feedback Loops & Status Reports', 'B1BU19', 19, 0, 1),
  ('BU', 'Bussines English', 'B1', 'B1', 'M04', 'Resolution & Accountability', 'B1BU20', 'Analyzing Meeting Effectiveness (ROI)', 'B1BU20', 20, 0, 1)
ON DUPLICATE KEY UPDATE
  curso_nome = VALUES(curso_nome),
  nivel_nome = VALUES(nivel_nome),
  modulo_codigo = VALUES(modulo_codigo),
  modulo_nome = VALUES(modulo_nome),
  aula_titulo = VALUES(aula_titulo),
  nome_tela = VALUES(nome_tela),
  ordem = VALUES(ordem),
  gratuita = VALUES(gratuita),
  ativa = VALUES(ativa);

INSERT INTO conteudos (
  curso_codigo,
  curso_nome,
  nivel_codigo,
  nivel_nome,
  modulo_codigo,
  modulo_nome,
  aula_codigo,
  aula_titulo,
  nome_tela,
  ordem,
  gratuita,
  ativa
)
VALUES
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M01', 'Preparando as Malas', 'A1TR1', 'Greetings & Politeness', 'A1TR1', 1, 1, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M01', 'Preparando as Malas', 'A1TR2', 'The Magic Words', 'A1TR2', 2, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M01', 'Preparando as Malas', 'A1TR3', 'Numbers & Money', 'A1TR3', 3, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M01', 'Preparando as Malas', 'A1TR4', 'Time & Days', 'A1TR4', 4, 0, 1),

  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M02', 'O Aeroporto e o Voo', 'A1TR5', 'At the Check-in Desk', 'A1TR5', 5, 1, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M02', 'O Aeroporto e o Voo', 'A1TR6', 'Security & Boarding', 'A1TR6', 6, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M02', 'O Aeroporto e o Voo', 'A1TR7', 'On the Airplane', 'A1TR7', 7, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M02', 'O Aeroporto e o Voo', 'A1TR8', 'Immigration & Customs', 'A1TR8', 8, 0, 1),

  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M03', 'Chegando e Se Localizando', 'A1TR9', 'Baggage Claim & Exiting', 'A1TR9', 9, 1, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M03', 'Chegando e Se Localizando', 'A1TR10', 'Getting to the City', 'A1TR10', 10, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M03', 'Chegando e Se Localizando', 'A1TR11', 'Where is...? (Directions)', 'A1TR11', 11, 0, 1),

  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M04', 'Hospedagem', 'A1TR12', 'Checking In', 'A1TR12', 12, 1, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M04', 'Hospedagem', 'A1TR13', 'Hotel Amenities', 'A1TR13', 13, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M04', 'Hospedagem', 'A1TR14', 'Making Requests & Solving Problems', 'A1TR14', 14, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M04', 'Hospedagem', 'A1TR15', 'Checking Out', 'A1TR15', 15, 0, 1),

  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M05', 'Alimentacao', 'A1TR16', 'At the Cafe / Fast Food', 'A1TR16', 16, 1, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M05', 'Alimentacao', 'A1TR17', 'Booking a Table & Sitting Down', 'A1TR17', 17, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M05', 'Alimentacao', 'A1TR18', 'Ordering Food', 'A1TR18', 18, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M05', 'Alimentacao', 'A1TR19', 'Paying the Bill', 'A1TR19', 19, 0, 1),

  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M06', 'Passeios e Compras', 'A1TR20', 'Buying Tickets', 'A1TR20', 20, 1, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M06', 'Passeios e Compras', 'A1TR21', 'At the Store', 'A1TR21', 21, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M06', 'Passeios e Compras', 'A1TR22', 'Price & Paying', 'A1TR22', 22, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M06', 'Passeios e Compras', 'A1TR23', 'Souvenirs & Gifts', 'A1TR23', 23, 0, 1),

  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M07', 'Saude e Emergencias', 'A1TR24', 'At the Pharmacy', 'A1TR24', 24, 1, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M07', 'Saude e Emergencias', 'A1TR25', 'Sickness & Symptoms', 'A1TR25', 25, 0, 1),
  ('TR', 'Ingles para Viagem', 'A1', 'A1', 'M07', 'Saude e Emergencias', 'A1TR26', 'Help & Emergencies', 'A1TR26', 26, 0, 1)
ON DUPLICATE KEY UPDATE
  curso_nome = VALUES(curso_nome),
  nivel_nome = VALUES(nivel_nome),
  modulo_codigo = VALUES(modulo_codigo),
  modulo_nome = VALUES(modulo_nome),
  aula_titulo = VALUES(aula_titulo),
  nome_tela = VALUES(nome_tela),
  ordem = VALUES(ordem),
  gratuita = VALUES(gratuita),
  ativa = VALUES(ativa);

COMMIT;
