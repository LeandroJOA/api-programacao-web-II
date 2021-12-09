const mongoose = require('mongoose')

const clientesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: {
        type: String,
        require: true
    },
    tipo: {
        type: String
    },
    beneficios: {
        type: String
    },
})

module.exports = mongoose.model('Clientes', clientesSchema);