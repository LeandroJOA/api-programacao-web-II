const router = require('express').Router();
const mongoose = require('mongoose');

const Fornecedor = require('../models/fornecedores');

router.get('/', (req, res) => {
  Fornecedor.find()
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.get('/:fornecedorId', (req, res) => {
  Fornecedor.findOne({_id: req.params.fornecedorId})
    .exec()
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          message: 'Fornecedor não encontrado!',
        });
      }
      res.status(200).json({
        fornecedor: result,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.post('/', (req, res) => {
  const fornecedor = new Fornecedor({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    produto: req.body.produto,
    valorLote: req.body.valorLote,
  });

  fornecedor
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Fornecedor salvo com sucesso!',
        fornecedor,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.put('/:fornecedorId', (req, res) => {
  Fornecedor.updateOne(
    {_id: req.params.fornecedorId},
    {
      nome: req.body.nome,
      produto: req.body.produto,
      valorLote: req.body.valorLote,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: 'Fornecedor atualizado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Fornecedor não encontrado!',
        error: reject,
      });
    });
});

router.delete('/:fornecedorId', (req, res) => {
  Fornecedor.deleteOne({_id: req.params.fornecedorId})
    .then((result) => {
      res.status(200).json({
        message: 'Fornecedor deletado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Fornecedor não encontrado!',
        error: reject,
      });
    });
});

module.exports = router;
