const express = require('express');
const {listarCategorias, obterCategoria} = require('./controllers/categoria');
const { listarProdutos, criarProduto, atualizarProduto, excluirProduto, obterProduto} = require('./controllers/produtos');
const { cardapioProdutos, cardapioNoturno, cardapioDiurno, atualizarCardapioNoturno, 
    deletarCardapioNoturno, 
    atualizarCardapioDiurno, 
    deletarCardapioDiurno} = require("./controllers/cardapio")
const rotas = express();


rotas.get('/categorias',  listarCategorias );
rotas.get('/categorias/:id',  obterCategoria );

rotas.get('/atual', cardapioProdutos)

rotas.post('/cardapio_noturno', cardapioNoturno)
rotas.put('/cardapio_noturno/:id', atualizarCardapioNoturno)
rotas.delete('/cardapio_noturno/:id', deletarCardapioNoturno)

rotas.put('/cardapio_diurno/:id', atualizarCardapioDiurno)
rotas.post('/cardapio_diurno', cardapioDiurno)
rotas.delete('/cardapio_diurno/:id', deletarCardapioDiurno)


rotas.get('/produtos',  listarProdutos );
rotas.post('/produtos',  criarProduto );
rotas.put('/produtos/:id',  atualizarProduto );
rotas.get('/produtos/:id',  obterProduto );
rotas.delete('/produtos/:id',  excluirProduto );


module.exports = rotas;
