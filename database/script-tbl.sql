-- CRIAÇÃO DE BANCO DE DADOS
CREATE DATABASE db_locadora_filme_ds2m_25_2;

--------------------------------------------------------------------------------------------------------
--                                          CRIAÇÃO DE TABELAS
--------------------------------------------------------------------------------------------------------


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

------------------------------
-- Tabelas Independentes
------------------------------


-- Classificação Indicativa
CREATE TABLE tbl_classificacao_indicativa(
    classificacao_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nivel_classificacao VARCHAR(5) NOT NULL,
    descricao VARCHAR(45)
);

-- Idioma
CREATE TABLE tbl_idioma(
    idioma_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(40) NOT NULL
);

-- Gênero
CREATE TABLE tbl_genero(
    genero_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(20) NOT NULL
);

-- Formato
CREATE TABLE tbl_formato(
    formato_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	descricao VARCHAR(250) NULL
);



-- -- Nacionalidade
-- CREATE TABLE tbl_nacionalidade(
--     nacionalidade_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );

-- Plataforma Streaming
CREATE TABLE tbl_plataforma_streaming(
    plataforma_streaming_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	descricao VARCHAR(250) NULL,
	preco_assinatura DECIMAL(5,2) NOT NULL,
	site VARCHAR(255) NULL
);
-- -- Tipo de Atuação
-- CREATE TABLE tbl_tipo_atuacao(
--     _id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );
-- Sexo
CREATE TABLE tbl_sexo(
    sexo_id VARCHAR(1) PRIMARY KEY NOT NULL,
	extenso VARCHAR(20) NOT NULL
);

-- Profissional
CREATE TABLE tbl_profissional(
	profissional_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	biografia TEXT NULL,
	foto VARCHAR(255) NULL,
	data_nascimento DATE NOT NULL,
	data_falecimento DATE NULL,
	-- pais_origem_id INT NOT NULL,
	sexo_id VARCHAR(1) NOT NULL,


	-- CONSTRAINT FK_PAIS_ORIGEM_PROFISSIONAL
	-- FOREIGN KEY (pais_origem_id) REFERENCES tbl_pais(pais_id),
	CONSTRAINT FK_SEXO_PROFISSIONAL
	FOREIGN KEY (sexo_id) REFERENCES tbl_sexo(sexo_id)
)

------------------------------
-- Entidades-Relacionamento
------------------------------

CREATE TABLE tbl_filme_genero(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	filme_id INT NOT NULL,
	genero_id INT NOT NULL,

	CONSTRAINT FK_FILME_FILME_GENERO
	FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id),
	CONSTRAINT FK_GENERO_FILME_GENERO
	FOREIGN KEY (genero_id) REFERENCES tbl_genero(genero_id)
);

CREATE TABLE tbl_personagem(
	personagem_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	papel VARCHAR(40) NOT NULL,
	profissional_id INT NOT NULL,
	filme_id INT NOT NULL,

	CONSTRAINT FK_PROFISSIONAL_PERSONAGEM
	FOREIGN KEY (profissional_id) REFERENCES tbl_profissional(profissional_id),
	CONSTRAINT FK_FILME_PERSONAGEM
	FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id)
)