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

-- Profissional
CREATE TABLE tbl_profissional(
	profissional_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100),
	biografia TEXT NULL,
	foto VARCHAR(255) NULL,
	data_nascimento DATE NOT NULL,
	data_falecimento DATE NULL

	-- pais_origem INT
	-- sexo_id INT
	-- CONSTRAINT fk_pais_profissional;
	-- FOREIGN KEY (pais_origem) REFERENCES 
	-- CONSTRAINT fk_sexo_profissional;
	-- FOREIGN KEY () REFERENCES tbl_sexo(sexo_id),
)

CREATE TABLE tbl_cargo (
	cargo_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	--TODO: finalizar
)
CREATE TABLE tbl_atuacao
CREATE TABLE tbl_personagem


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
-- -- Sexo
-- CREATE TABLE tbl_sexo(
--     _id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- );

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