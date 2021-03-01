const connection = require("../../knexfile");

module.exports = {
    async create(request, response) {
        const {
            primNome,
            sobrenome,
            genero,
            cpf,
            rg,
            email,
            telefone,
            logradouro,
            pais,
            estado,
            cidade
        } = request.body;

        await connection("funcionario").insert({
            primNome,
            sobrenome,
            genero,
            cpf,
            rg,
            email,
            telefone,
            logradouro,
            pais,
            estado,
            cidade
        });

        return response.sendStatus(200);
    },

    async read(request, response) {
        const [count] = await connection("funcionario").count();

        const funcionarios = await connection("funcionario").select("*");

        response.header("X-Total-Count", count["count(*)"]);

        return response.json(funcionarios);
    },

    async update(request, response) {
        const {
            primNome,
            sobrenome,
            genero,
            cpf,
            rg,
            email,
            telefone,
            logradouro,
            pais,
            estado,
            cidade
        } = request.body;

        await connection("funcionario").update({
            primNome,
            sobrenome,
            genero,
            cpf,
            rg,
            email,
            telefone,
            logradouro,
            pais,
            estado,
            cidade
        })

        return response.sendStatus(200);
    },

    async delete(request, response) {
        const { rg } = request.body;

        await connection("funcionario").delete(rg);

        return response.sendStatus(200);
    },
};