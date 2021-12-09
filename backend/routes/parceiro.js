const router = require('express').Router();
const mongoose = require('mongoose');

const Parceiro = require('../models/parceiros');

router.get('/', (req, res, next) => {
  Parceiro.find()
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

router.get('/:parceiroId', (req, res, next) => {
  Parceiro.findOne({_id: req.params.parceiroId})
    .exec()
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          message: 'Parceiro não encontrado!',
        });
      }
      res.status(200).json({
        parceiro: result,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.post('/', (req, res, next) => {
  const parceiro = new Parceiro({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
  });

  parceiro
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Parceiro salvo com sucesso!',
        parceiro,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.put('/:parceiroId', (req, res, next) => {
  Parceiro.updateOne(
    {_id: req.params.parceiroId},
    {
      nome: req.body.nome,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: 'Parceiro atualizado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Parceiro não encontrado!',
        error: reject,
      });
    });
});

router.delete('/:parceiroId', (req, res, next) => {
  Parceiro.deleteOne({_id: req.params.parceiroId})
    .then((result) => {
      res.status(200).json({
        message: 'Parceiro deletado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Parceiro não encontrado!',
        error: reject,
      });
    });
});

module.exports = router;
