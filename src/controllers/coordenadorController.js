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

        await connection("coordenador").insert({
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
        const [count] = await connection("coordenador").count();

        const coordenadores = await connection("coordenador").select("*");

        response.header("X-Total-Count", count["count(*)"]);

        return response.json(coordenadores);
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

        await connection("coordenador").update({
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

        await connection("coordenador").delete(rg);

        return response.sendStatus(200);
    },
};