const router = require('express').Router();
const mongoose = require('mongoose');

const Funcionario = require('../models/funcionarios');

router.get('/', (req, res, next) => {
  Funcionario.find()
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

router.get('/:funcionarioId', (req, res, next) => {
  Funcionario.findOne({_id: req.params.funcionarioId})
    .exec()
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          message: 'Funcionario não encontrado!',
        });
      }
      res.status(200).json({
        funcionario: result,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.post('/', (req, res, next) => {
  const funcionario = new Funcionario({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    funcao: req.body.funcao,
    salario: req.body.salario,
  });

  funcionario
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Funcionario salvo com sucesso!',
        funcionario,
      });
    })
    .catch((reject) => {
      res.status(500).json({
        error: reject,
      });
    });
});

router.put('/:funcionarioId', (req, res, next) => {
  Funcionario.updateOne(
    {_id: req.params.funcionarioId},
    {
      nome: req.body.nome,
      funcao: req.body.funcao,
      salario: req.body.salario,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: 'Funcionario atualizado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Funcionario não encontrado!',
        error: reject,
      });
    });
});

router.delete('/:funcionarioId', (req, res, next) => {
  Funcionario.deleteOne({_id: req.params.funcionarioId})
    .then((result) => {
      res.status(200).json({
        message: 'Funcionario deletado com sucesso!',
      });
    })
    .catch((reject) => {
      res.status(404).json({
        message: 'Funcionario não encontrado!',
        error: reject,
      });
    });
});

module.exports = router;
