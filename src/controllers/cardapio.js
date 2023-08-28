const knex = require('../bancodedados/conexao');


const cardapioProdutos =  async (req, res) => {
    try {
      const now = new Date();
      const hour = now.getHours();
      const cardapioTableName = hour >= 18 || hour < 6 ? 'cardapio_noturno' : 'cardapio_diurno';
  
      const cardapio = await knex(cardapioTableName)
        .join('produtos', 'produtos.id', '=', `${cardapioTableName}.produto_id`)
        .select('produtos.nome', 'produtos.preco')
        .orderBy(`${cardapioTableName}.id`);
  
      res.status(200).json(cardapio);
    } catch (error) {

      res.status(500).json({ error: 'Erro ao obter o cardápio.' });
    }
  };

   const atualizarCardapioNoturno = async (req, res) => {
    const { id } = req.params;
    const { produto_id } = req.body;
  
    try {
      
      const itemExistente = await knex('cardapio_noturno').where({ id }).first();
      if (!itemExistente) {
        return res.status(404).json({ error: 'Item do cardápio noturno não encontrado.' });
      }
  
      const produto = await knex('produtos').where({ id: produto_id }).first();
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
     
    await knex('cardapio_noturno').where({ id }).update({ produto_id });

    res.status(200).json({ message: 'Item do cardápio noturno atualizado com sucesso.' });
  } catch (error) {
    
    res.status(500).json({ error: 'Erro ao atualizar item do cardápio noturno.' });
  }
};

 const deletarCardapioNoturno = async (req, res) => {
    const { id } = req.params;
  
    try {
      
      const itemExistente = await knex('cardapio_noturno').where({ id }).first();
      if (!itemExistente) {
        return res.status(404).json({ error: 'Item do cardápio noturno não encontrado.' });
      }
  
     
      await knex('cardapio_noturno').where({ id }).del();
  
      res.status(200).json({ message: 'Item do cardápio noturno excluído com sucesso.' });
    } catch (error) {
  
      res.status(500).json({ error: 'Erro ao excluir item do cardápio noturno.' });
    }
  }
  
 const cardapioNoturno =  async (req, res) => {
    const { produto_id } = req.body;
  
    try {
      
      const produto = await knex('produtos').where({ id: produto_id }).first();
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
  
      await knex('cardapio_noturno').insert({ produto_id });
  
      res.status(201).json({ message: 'Produto adicionado ao cardápio noturno.' });
    } catch (error) {
      
      res.status(500).json({ error: 'Erro ao adicionar produto ao cardápio noturno.' });
    }
  };
   const atualizarCardapioDiurno = async (req, res) => {
    const { id } = req.params;
    const { produto_id } = req.body;
  
    try {
     
      const itemExistente = await knex('cardapio_diurno').where({ id }).first();
      if (!itemExistente) {
        return res.status(404).json({ error: 'Item do cardápio diurno não encontrado.' });
      }
  
    
      const produto = await knex('produtos').where({ id: produto_id }).first();
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
  
   
      await knex('cardapio_diurno').where({ id }).update({ produto_id });
  
      res.status(200).json({ message: 'Item do cardápio diurno atualizado com sucesso.' });
    } catch (error) {

        
        res.status(500).json({ error: 'Erro ao atualizar item do cardápio diurno.' });
      }
    }

     const deletarCardapioDiurno = async (req, res) => {
        const { id } = req.params;
      
        try {
          
          const itemExistente = await knex('cardapio_diurno').where({ id }).first();
          if (!itemExistente) {
            return res.status(404).json({ error: 'Item do cardápio diurno não encontrado.' });
          }
      
        
          await knex('cardapio_diurno').where({ id }).del();
      
          res.status(200).json({ message: 'Item do cardápio diurno excluído com sucesso.' });
        } catch (error) {
          
          res.status(500).json({ error: 'Erro ao excluir item do cardápio diurno.' });
        }
      }






 const cardapioDiurno =  async (req, res) => {
    const { produto_id } = req.body;
  
    try {
      
      const produto = await knex('produtos').where({ id: produto_id }).first();
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
  
      
      await knex('cardapio_diurno').insert({ produto_id });
  
      res.status(201).json({ message: 'Produto adicionado ao cardápio diurno.' });
    } catch (error) {
      
      res.status(500).json({ error: 'Erro ao adicionar produto ao cardápio diurno.' });
    }
  }
  










  module.exports = {
    cardapioProdutos,
    
    cardapioNoturno,
    cardapioDiurno,
    atualizarCardapioNoturno,
    deletarCardapioNoturno,
    atualizarCardapioDiurno,
    deletarCardapioDiurno
  }