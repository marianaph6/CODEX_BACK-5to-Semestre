const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
//const _examenpacienteController = require("../controllers/ExamenPaciente/ExamenPaciente.controller");


/**
 * Método de consultar todas las posologias de una entrada
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getEntradasPosologias = async (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM public.entradaposologia WHERE id_entrada = ${id}`;
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Posologías de la entrada consultadas",
            content: rows,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando las Posologías de la entrada",
            content: error,
        });
    }
};

/**
 * Método para consultar el detalle de una posología 
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getEntradaPosologia = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT * FROM public.entradaposologia WHERE id_entradaposologia = ${id}`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Posología consultada",
            content: rows[0],
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando la Posología",
            content: error,
        });
    }
};

const createEntradaPosologia = async (req, res) => {
    try {
        let entradaposologia = req.body;

        let sql = `INSERT INTO public.entradaposologia (posologia, id_medicamento, id_entrada) VALUES('${entradaposologia.posologia}', '${entradaposologia.id_medicamento}', '${entradaposologia.id_entrada}')`;
        let result = await _pg.executeSql(sql);
        console.log(result)
        if(result.rowCount==1){
            // NO SE COMO LLAMAR EL METODO
        }
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Posología de la entrada creada" : "La Posología de la entrada no fue creada",
            content: entradaposologia,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando la Posología de la entrada",
            content: error,
        });

    }
};

module.exports = { getEntradasPosologias, getEntradaPosologia, createEntradaPosologia};