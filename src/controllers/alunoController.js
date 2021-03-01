const connection = require("../../knexfile");

module.exports = {
    async create(request, response) {
        const {
            nome,
            cpf,
            rg,
            email,
            sexo,
            serie,
            turma,
            nomeResponsavel,
            cpfResponsavel,
            telefoneResponsavel,
            emailResponsavel,
            cep,
            bairro,
            endereco,
            complemento
        } = request.body;
        
        await connection("aluno").insert({
            nome,
            cpf,
            rg,
            email,
            sexo,
            serie,
            turma,
            nomeResponsavel,
            cpfResponsavel,
            telefoneResponsavel,
            emailResponsavel,
            cep,
            bairro,
            endereco,
            complemento
        });
        
        return response.sendStatus(200);
    },

    async read(request, response) {
        const [count] = await connection("aluno").count();

        const alunos = await connection("aluno").select("*");
    
        response.header("X-Total-Count", count["count(*)"]);

        return response.json(alunos);
    },

    async update(request, response) {
        const {
            nome,
            cpf,
            rg,
            email,
            sexo,
            serie,
            turma,
            nomeResponsavel,
            cpfResponsavel,
            telefoneResponsavel,
            emailResponsavel,
            cep,
            bairro,
            endereco,
            complemento
        } = request.body;

        await connection("aluno").update({
            nome,
            cpf,
            rg,
            email,
            sexo,
            serie,
            turma,
            nomeResponsavel,
            cpfResponsavel,
            telefoneResponsavel,
            emailResponsavel,
            cep,
            bairro,
            endereco,
            complemento
        })

        return response.sendStatus(200);
    },

    async delete(request, response) {
        const { rg } = request.body;

        await connection("aluno").delete(rg);

        return response.sendStatus(200);
    },
};