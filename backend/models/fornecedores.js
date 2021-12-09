const mongoose = require('mongoose');

const fornecedorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: {
    type: String,
    require: true,
  },
  produto: {
    type: String,
    require: true,
  },
  valorLote: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Fornecedor', fornecedorSchema);
