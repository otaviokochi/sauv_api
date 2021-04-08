const Funcionario = require('../model/funcionario');

module.exports = {
    create(req, res) {
        const funcionario = new Funcionario(req.body);

        Funcionario.create(funcionario, (err, body) => {
            if (err) {
                res.status(500).send({ message: err.message});
            } else {
                res.send(body);
            }
        })
    },

    read(req, res) {
        if (req.query.nome) {
            Funcionario.getByName(req.query.nome, (error, dados) => {
                if (error) {
                    res.status(500).send({ message: error });
                } else {
                    res.send(dados);
                }
            })
        } else {
            Funcionario.read((error, dados) => {
                if (error) {
                    res.status(500).send({ message: error });
                } else {
                    res.send(dados);
                }
            })
        }
    },

    update(req, res) {
        const funcionario = new Funcionario(req.body);
        Funcionario.update(req.body.cpf, funcionario, (error, dados) => {
            if (error) {
                res.status(500).send({ message: error + '' });
            } else {
                if (dados > 0) {
                    res.send({ cpf: dados, ...req.body });
                } else {
                    res.send({ message: `Funcionario de CPF ${req.params.cpf} não foi encontrado!` });
                }
            }
        })
    },

    delete(req, res) {
        Funcionario.remove(req.body.cpf, (error, resultado) => {
            if (error) {
                res.status(500).send({ message: error + '' });
            } else {
                res.send({ message: `Funcionario de CPF ${req.body.cpf} deletado com sucesso!` });
            }
        })
    },
};