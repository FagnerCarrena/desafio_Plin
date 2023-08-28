const knex = require('../bancodedados/conexao');


const listarProdutos = async (req, res) => {
    try {
      const produto = await knex('produtos').select('*');
      res.status(200).json(produto);
    } catch (error) {
      
      res.status(500).json({ error: 'Erro ao listar produtos.' });
    }
  };
  const criarProduto = async (req, res) => {
    const { nome, preco, descricao, imagem_url, categoria_id } = req.body;

    if(!nome || ! preco || ! descricao || !imagem_url || !categoria_id){
        res.status(400).json({messagem: "Preencha todos os campos!" });

    }
    try {
      const novoProduto = await knex('produtos').insert({
        nome,
        preco,
        descricao,
        imagem_url,
        categoria_id

      });
      res.status(201).json({ message: 'Produto criado com sucesso.' });
    } catch (error) {
     
      res.status(500).json({ error: 'Erro ao criar produto.' });
    }
  };

  const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, preco, descricao, imagem_url, categoria_id } = req.body;

    if(!nome || ! preco || ! descricao || !imagem_url || !categoria_id){
        res.status(400).json({messagem: "Preencha todos os campos!" });

    }
    try {
      await knex('produtos').where({ id }).update({
        nome,
        preco,
        descricao,
        imagem_url,
        categoria_id
      });
      res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    } catch (error) {
     
      res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
  };
  const excluirProduto = async (req, res) => {
    const { id } = req.params;
    try {
      await knex('produtos').where({ id }).del();
      res.status(200).json({ message: 'Produto excluído com sucesso.' });
    } catch (error) {
    
      res.status(500).json({ error: 'Erro ao excluir produto.' });
    }
  };
  const obterProduto = async (req, res) => {
    
    const { id } = req.params;

    try {

        const produto = await knex('produtos').where({
            id
        }).first()
if (!produto) {
        return res.status(404).json('Produto não encontrado');
}

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}










  module.exports = {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto,
    obterProduto
    
  }