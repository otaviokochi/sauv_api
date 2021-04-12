const Professor = require('../model/professor');
const RelationProfessorDisciplina = require('../model/relationProfessorDisciplina')
const Disciplina = require('../model/disciplina')

const parse = list => Object.values(JSON.parse(JSON.stringify(list)))

module.exports = {
  create(req, res) {

    let disciplinasId = []
    if (req.body.disciplinas) {
      disciplinasId = req.body.disciplinas
      delete req.body.disciplinas
    }

    const professor = new Professor(req.body);

    Professor.create(professor,  async (err, body) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        const { id } = body
        let disciplinas = disciplinasId.map(async disciplinaId => {
          const req = {
            professor_id: id,
            disciplina_id: disciplinaId
          }
          await RelationProfessorDisciplina.create(req)
          const response = parse(await Disciplina.findDisciplinaById(disciplinaId))
          return response[0]
        })
        
        res.send({
          ...body,
          disciplinas: await Promise.all(disciplinas)
        });
      }
    })
  },

  async read(req, res) {
    let professores
    if(req.query.nome) {  
      professores = await Professor.getByName(req.query.nome)
    }else{
      professores = await Professor.read()
    }
    const professoresFormatted = await Promise.all(professores.map(async professor => {
      const relacaoDisciplinaprofessor = parse(await RelationProfessorDisciplina.findById(professor.id))
      const disciplinas = await Promise.all(relacaoDisciplinaprofessor.map(async relacao => {
        const disciplina = await Disciplina.findDisciplinaById(relacao.disciplina_id)
        return parse(disciplina)
      }))
      
      return({
        ...professor,
        disciplinas: disciplinas.map(d => d[0])
      })
    }))
    if(!professoresFormatted) {
      res.status(500).send({message: 'Erro na requisição'})
      return
    }
    res.send(professoresFormatted)
  },

  async update(req, res) {
    const professor = new Professor(req.body);
    let disciplinas
    if(req.body.disciplinas){
      const disciplinasId =  req.body.disciplinas
      delete req.body.disciplinas

      await RelationProfessorDisciplina.remove(req.params.id)

      disciplinas = disciplinasId.map(async disciplinaId => {
        const body = {
          professor_id: req.params.id,
          disciplina_id: disciplinaId
        }
        await RelationProfessorDisciplina.create(body, err => err)
        const response = parse(await Disciplina.findDisciplinaById(disciplinaId))
        return response[0]
      })
    }

    await Professor.update(req.params.id, professor)
    res.send({...professor, disciplinas: await Promise.all(disciplinas)})
    return
  },

  async delete(req, res) {
    await RelationProfessorDisciplina.remove(req.params.id)
    Professor.remove(req.params.id, (error, resultado) => {
      if (error) {
        res.status(500).send({ message: error });
      } else {
        res.send({ message: `Disciplina de id ${req.params.id} deletada com sucesso!` });
      }
    })
  },

}
