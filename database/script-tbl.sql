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

