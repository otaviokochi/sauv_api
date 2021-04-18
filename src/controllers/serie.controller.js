const { response } = require('express');
const Serie = require('../model/serie');

module.exports = {
  criar(req, res) {
    const serie = new Serie(req.body);
    Serie.criar(serie, (error, dados) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(error);
          res.status(500).send({ message: `Série duplicada!` });
        } else {
          console.log(error.message);
          res.status(500).send({ message: "Erro ao criar série" });
        }
      } else {
        res.send(dados);
      }
    })
  },

  buscaSeries(req, res) {
    Serie.getAll((error, dados) => {
      if (error) {
        console.log(error);
        res.status.send({ message: "Erro ao buscar série" });
      } else {
        dados.forEach(serie => {
          serie.disciplinas = JSON.parse(serie.disciplinas)
        })
        res.send(dados);
      }
    })
  },

  buscaSerie(req, res) {
    Serie.getByAnoLetivo(req.params.anoLetivo, (error, dados) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: "Erro ao buscar série" });
      } else {
        res.send(dados);
      }
    })
  },

  atualizar(req, res) {
    const serieAtualizada = new Serie(req.body);
    Serie.update(req.params.id, serieAtualizada, (error, dados) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: "Erro ao atualizar série" });
      } else {
        if (dados > 0) {
          res.send({ message: `Serie de ano letivo ${req.params.id} atualizada com sucesso!` });
        } else {
          res.send({ message: `Serie de ano letivo ${req.params.id} não encontrada!` });
        }
      }
    })
  },

  deletar(req, res) {
    Serie.remove(req.params.id, (error, dados) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: "Erro ao deletas série" });
      } else {
        if (dados > 0) {
          res.send({ message: `Serie de ano letivo ${req.params.id} excluída com sucesso!` });
        } else {
          res.send({ message: `Serie de ano letivo ${req.params.id} não encontrada!` });
        }
      }
    })
  }

}