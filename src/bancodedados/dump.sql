create database plin;

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL
);
CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL,
  imagem_url VARCHAR(255),
  categoria_id INTEGER REFERENCES categorias(id)
);
insert into categorias (nome) values
('cafe da manha'),
('lanche da manha'),
('almoco'),
('lanche da tarde'),
('jantar'),
('lanche da noite')


CREATE TABLE cardapio_diurno (
  id SERIAL PRIMARY KEY,
  produto_id INTEGER REFERENCES produtos(id)
);
CREATE TABLE cardapio_noturno (
  id SERIAL PRIMARY KEY,
  produto_id INTEGER REFERENCES produtos(id)
);
