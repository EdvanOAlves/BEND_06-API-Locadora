-- CRIAÇÃO DE BANCO DE DADOS
CREATE DATABASE db_locadora_filme_ds2m_25_2;

-- CRIAÇÃO DE TABELA
CREATE TABLE tbl_filme(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT NULL,
	data_lancamento DATE NULL,
	duracao TIME NOT NULL,
	orcamento DECIMAL(11,2) NULL,
	trailer VARCHAR(200) NULL,
	capa VARCHAR(200) NOT NULL
);

-- INSERÇÃO DE VALORES
-- Filme 1
INSERT INTO tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
	VALUES(
	"Trem-Bala",
	'Em Trem-Bala, Ladybug (Brad Pitt) é um assassino azarado, determinado a fazer seu trabalho pacificamente depois de muitas missões saírem dos trilhos. Quase desistindo de sua carreira, ele é recrutado por Maria Beetle (Sandra Bullock) para coletar uma maleta em um trem-bala indo de Tóquio para Morioka. O destino, no entanto, pode ter outros planos, pois a última missão de Ladybug o coloca em rota de colisão com adversários letais de todo o mundo - todos com objetivos conectados, mas conflitantes. A bordo estão os companheiros assassinos Kimura, Prince, Tangerine e Lemon.  No trem mais rápido do mundo - um dos trens-bala Shinkansen, no Japão - Ladybug fica sob ameaça com uma bomba que explodirá automaticamente se o trem diminuir a velocidade abaixo de 80 quilômetros por hora, a menos que um resgate seja pago. E ele precisa descobrir como sair.',
	'2022-08-04',
	'02:07:00',
	90000000,
	"https://www.youtube.com/watch?v=GKRihTLSnj4",
	"https://br.web.img3.acsta.net/c_310_420/pictures/22/06/23/22/36/5311627.jpg");

-- Filme 2
INSERT INTO tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
	VALUES(
	"Look Back",
	'Look Back fala sobre Ayumu Fujino (Yumi Kawai), uma estudante do ensino fundamental, que tem seus mangás de comédia publicados no jornal periódico da escola. Sua confiança absoluta em seu talento é abalada quando as tirinhas de Kyomoto (Mizuki Yoshida), uma aluna reclusa e que não consegue frequentar as aulas presencialmente, também ganha espaço e a atenção dos alunos. O amor pela arte de desenhar mangás e a dedicação de ambas acabam unindo Fujino e Kyomoto, fazendo com que elas se esforcem para alcançarem seus sonhos. Look Back é um conto sobre juventude, união e amizade, mas também sobre alegria e tristeza, conquista e frustração, com um olhar único sobre como o esforço e a prática podem levar à perfeição, mas também proporcionam momentos incríveis durante essa jornada.',
	'2024-09-26',
	'00:57:00',
	20000000, 
	'https://www.youtube.com/watch?v=wkRR2VUsWfU',
	'https://br.web.img2.acsta.net/c_310_420/img/c0/76/c0762c9d6396645b6335ff50962a3830.jpg');
    --Orcamento eu estipulei, não tem esse valor online


-- Comandos soltos:

SELECT * FROM tbl_filme;
SELECT nome, data_lancamento, duracao, orcamento, trailer, capa;