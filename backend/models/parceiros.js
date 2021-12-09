const mongoose = require('mongoose')

const parceirosSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: {
        type: String,
        require: true
    },
    telefone: {
        type: String
    },
    endereco: {
        type: String
    },
})

module.exports = mongoose.model('Parceiros', parceirosSchema);