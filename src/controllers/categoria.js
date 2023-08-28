const knex = require('../bancodedados/conexao');




const listarCategorias = async (req, res) => {
  try {
    const categorias = await knex('categorias').select('*');
     res.status(200).json(categorias);

  } catch (error) {
    
    res.status(500).json({ error: 'Erro ao listar categorias.' });
  }
}
const obterCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await knex('categorias').where({ id }).first();
    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }

    const produtos = await knex('produtos').where({ categoria_id: id }).select('*');

    res.status(200).json({ categoria, produtos });
  } catch (error) {
    
    res.status(500).json({ error: 'Erro ao obter detalhes da categoria.' });
  }
};
 

module.exports = {
  listarCategorias,
  obterCategoria
  
}


