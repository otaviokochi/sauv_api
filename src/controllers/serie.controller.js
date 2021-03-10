const { response } = require('express');
const Serie = require('../model/serie');

module.exports = {
  criar (req, res) {
    const serie = new Serie(req.body);
    Serie.criar(serie, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        res.send(dados);
      }
    })
  },

  buscaSeries (req, res) {
    if(req.params.anoLetivo) {
      Serie.buscaPorAnoLetivo(req.params.anoLetivo, (error, dados) => {
        if(error) {
          console.log(error);
          res.status(500).send({ message: error });
        } else {
          res.send(dados);
        }
      })
    } else {
      Serie.getAll((error, dados) => {
        if(error) {
          console.log(error);
          res.status.send({ message: error });
        } else {
          dados.forEach(serie => {
            serie.disciplinas = JSON.parse(serie.disciplinas)
          })
          res.send(dados);
        }
      })
    }
  },

  buscaSerie (req, res) {
    Serie.getById(req.params.anoLetivo, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        res.send(dados);
      }
    })
  },

  atualizar (req, res) {
    const serieAtualizada = new Serie(req.body);
    Serie.update(req.params.anoLetivo, serieAtualizada, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        if(dados > 0) {
          res.send({ message: `Serie de ano letivo ${req.params.anoLetivo} atualizada com sucesso!`});
        } else {
          res.send({ message: `Serie de ano letivo ${req.params.anoLetivo} não encontrada!`});
        }
      }
    })
  },

  deletar (req, res) {
    Serie.remove(req.params.anoLetivo, (error, dados) => {
      if(error) {
        console.log(error);
        res.status(500).send({ message: error });
      } else {
        if(dados > 0) {
          res.send({ message: `Serie de ano letivo ${req.params.anoLetivo} excluída com sucesso!`});
        } else {
          res.send({ message: `Serie de ano letivo ${req.params.anoLetivo} não encontrada!`});
        }
      }
    })
  }

}