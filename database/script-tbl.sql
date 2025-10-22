-- CRIAÇÃO DE BANCO DE DADOS
CREATE DATABASE db_locadora_filme_ds2m_25_2;

-- Filme
CREATE TABLE tbl_filme(
	filme_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT NULL,
	data_lancamento DATE NULL,
	duracao TIME NOT NULL,
	orcamento DECIMAL(11,2) NULL,
	trailer VARCHAR(200) NULL,
	capa VARCHAR(200) NOT NULL
);

-- -- Classificação Indicativa
-- CREATE TABLE tbl_classificacao_indicativa(
--     _id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );
-- -- Idioma
-- CREATE TABLE tbl_idioma(
--     _id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );

-- Gênero
CREATE TABLE tbl_genero(
    genero_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(20) NOT NULL
);

-- -- Formato
-- CREATE TABLE tbl_formato(
--     formato_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );
-- -- Nacionalidade
-- CREATE TABLE tbl_nacionalidade(
--     nacionalidade_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );
-- -- Plataforma Streaming
-- CREATE TABLE tbl_plataforma_streaming(
--     _id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );
-- -- Tipo de Atuação
-- CREATE TABLE tbl_tipo_atuacao(
--     _id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );
-- -- Sexo
-- CREATE TABLE tbl_sexo(
--     _id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );