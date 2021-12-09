const mongoose = require('mongoose')

const produtoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
  },
  preco: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Produto', produtoSchema);