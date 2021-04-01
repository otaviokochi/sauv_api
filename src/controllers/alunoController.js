const Aluno = require('../model/aluno');

module.exports = {
    create(req, res) {
        const aluno = new Aluno(req.body);

        Aluno.create(aluno, (err, body) => {
            if (err) {
                res.status(500).send({ message: err.message});
            } else {
                res.send(body);
            }
        })
    },
    
    read(req, res) {
        if (req.query.nome) {
            Aluno.getByName(req.query.nome, (error, dados) => {
                if (error) {
                    res.status(500).send({ message: error });
                } else {
                    res.send(dados);
                }
            })
        } else {
            Aluno.read((error, dados) => {
                if (error) {
                    res.status(500).send({ message: error });
                } else {
                    res.send(dados);
                }
            })
        }
    },

    update(req, res) {
        const aluno = new Aluno(req.body);
        Aluno.update(req.body.cpf, aluno, (error, dados) => {
            if (error) {
                res.status(500).send({ message: error + '' });
            } else {
                if (dados > 0) {
                    res.send({ cpf: dados, ...req.body });
                } else {
                    res.send({ message: `Aluno de CPF ${req.params.cpf} não foi encontrado!` });
                }
            }
        })
    },

    delete(req, res) {
        Aluno.remove(req.body.cpf, (error, _) => {
            if (error) {
                res.status(500).send({ message: error + '' });
            } else {
                res.send({ message: `Aluno de CPF ${req.body.cpf} deletado com sucesso!` });
            }
        })
    },
}