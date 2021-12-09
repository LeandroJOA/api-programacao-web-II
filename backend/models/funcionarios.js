const mongoose = require('mongoose')

const funcionarioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: {
        type: String,
        require: true
    },
    funcao: {
        type: String
    },
    salario: {
        type: Number
    },
})

module.exports = mongoose.model('Funcionario', funcionarioSchema);