const router = require('express').Router();
const mongoose = require('mongoose');

const Venda = require('../models/vendas');

router.get('/', (req, res) => {
  Venda.find()
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

router.get('/:vendaId', (req, res) => {
  Venda.findOne({_id: req.params.vendaId})
    .exec()
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          message: 'Venda não encontrada!',
        });
      }
      res.status(200).json({
        venda: result,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.post('/', (req, res) => {
  const venda = new Venda({
    _id: new mongoose.Types.ObjectId(),
    produto: req.body.produto,
    quantidade: req.body.quantidade,
    total: req.body.total,
  });

  venda
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Venda salva com sucesso!',
        venda,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.put('/:vendaId', (req, res) => {
  Venda.updateOne(
    {_id: req.params.vendaId},
    {
      produto: req.body.produto,
      quantidade: req.body.quantidade,
      total: req.body.total,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: 'Venda atualizada com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Venda não encontrada!',
        error: reject,
      });
    });
});

router.delete('/:vendaId', (req, res) => {
  Venda.deleteOne({_id: req.params.vendaId})
    .then((result) => {
      res.status(200).json({
        message: 'Venda deletada com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Venda não encontrada!',
        error: reject,
      });
    });
});

module.exports = router;
