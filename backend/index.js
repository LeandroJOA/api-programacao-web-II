require('dotenv/config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');

const produtoRouter = require('./routes/produto')
const vendaRouter = require('./routes/venda');
const fornecedorRouter = require('./routes/fornecedor');

const app = express()
app.use(morgan('dev'))

mongoose.connect('mongodb+srv://unidesc:unidesc@unidesc.zrjpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/produtos', produtoRouter);
app.use('/vendas', vendaRouter);
app.use('/fornecedores', fornecedorRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app