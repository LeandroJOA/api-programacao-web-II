const router = require('express').Router();
const mongoose = require('mongoose');

const Cliente = require('../models/clientes');

router.get('/', (req, res, next) => {
  Cliente.find()
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

router.get('/:clienteId', (req, res, next) => {
  Cliente.findOne({_id: req.params.clienteId})
    .exec()
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          message: 'Cliente não encontrado!',
        });
      }
      res.status(200).json({
        cliente: result,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.post('/', (req, res, next) => {
  const cliente = new Cliente({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    tipo: req.body.tipo,
    beneficio: req.body.beneficio,
  });

  cliente
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Cliente salvo com sucesso!',
        cliente,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.put('/:clienteId', (req, res, next) => {
  Cliente.updateOne(
    {_id: req.params.clienteId},
    {
      nome: req.body.nome,
      tipo: req.body.tipo,
      beneficio: req.body.beneficio,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: 'Cliente atualizado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Cliente não encontrado!',
        error: reject,
      });
    });
});

router.delete('/:clienteId', (req, res, next) => {
  Cliente.deleteOne({_id: req.params.clienteId})
    .then((result) => {
      res.status(200).json({
        message: 'Cliente deletado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Cliente não encontrado!',
        error: reject,
      });
    });
});

module.exports = router;
