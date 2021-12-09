const mongoose = require('mongoose');

const vendaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  produto: {
    type: String,
    require: true,
  },
  quantidade: {
    type: Number,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Venda', vendaSchema);
