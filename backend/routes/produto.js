const router = require('express').Router();
const mongoose = require('mongoose');

const Produto = require('../models/produtos');

router.get('/', (req, res, next) => {
  Produto.find()
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

router.get('/:produtoId', (req, res, next) => {
  Produto.findOne({_id: req.params.produtoId})
    .exec()
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          message: 'Produto não encontrado!',
        });
      }
      res.status(200).json({
        produto: result,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.post('/', (req, res, next) => {
  const produto = new Produto({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    tipo: req.body.tipo,
    preco: req.body.preco,
  });

  produto
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Produto salvo com sucesso!',
        produto,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.put('/:produtoId', (req, res, next) => {
  Produto.updateOne(
    {_id: req.params.produtoId},
    {
      nome: req.body.nome,
      tipo: req.body.tipo,
      preco: req.body.preco,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: 'Produto atualizado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Produto não encontrado!',
        error: reject,
      });
    });
});

router.delete('/:produtoId', (req, res, next) => {
  Produto.deleteOne({_id: req.params.produtoId})
    .then((result) => {
      res.status(200).json({
        message: 'Produto deletado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Produto não encontrado!',
        error: reject,
      });
    });
});

module.exports = router;
