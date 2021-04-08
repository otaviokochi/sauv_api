const Coordenador = require('../model/coordenador');

module.exports = {
    create(req, res) {
        const coordenador = new Coordenador(req.body);

        Coordenador.create(coordenador, (err, body) => {
            if (err) {
                res.status(500).send({ message: err.message});
            } else {
                res.send(body);
            }
        })
    },

    read(req, res) {
        if (req.query.nome) {
            Coordenador.getByName(req.query.nome, (error, dados) => {
                if (error) {
                    res.status(500).send({ message: error });
                } else {
                    res.send(dados);
                }
            })
        } else {
            Coordenador.read((error, dados) => {
                if (error) {
                    res.status(500).send({ message: error });
                } else {
                    res.send(dados);
                }
            })
        }
    },

    update(req, res) {
        const coordenador = new Coordenador(req.body);
        Coordenador.update(req.body.cpf, coordenador, (error, dados) => {
            if (error) {
                res.status(500).send({ message: error + '' });
            } else {
                if (dados > 0) {
                    res.send({ cpf: dados, ...req.body });
                } else {
                    res.send({ message: `Coordenador de CPF ${req.params.cpf} não foi encontrado!` });
                }
            }
        })
    },

    delete(req, res) {
        Coordenador.remove(req.body.cpf, (error, _) => {
            if (error) {
                res.status(500).send({ message: error + '' });
            } else {
                res.send({ message: `Coordenador de CPF ${req.body.cpf} deletado com sucesso!` });
            }
        })
    },
};