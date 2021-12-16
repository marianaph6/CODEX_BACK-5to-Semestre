const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
//const _examenpacienteController = require("../controllers/ExamenPaciente/ExamenPaciente.controller");


/**
 * Método de consultar todas las remisiones de una entrada
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getRemisiones = async (req, res) => {
    let id = req.params.id;
    //editar id igual al de otra tabla
    let sql = `SELECT * FROM public.remision WHERE id_remision = ${id}`;
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Remisiones de la entrada consultadas",
            content: rows,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando las Remisiones de la entrada",
            content: error,
        });
    }
};

/**
 * Método para consultar el detalle de una remision
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getRemision = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT * FROM public.remision WHERE id_remision = ${id}`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Remisión consultada",
            content: rows[0],
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando la Remisión",
            content: error,
        });
    }
};

const createRemision = async (req, res) => {
    try {
        let remision = req.body;
        let sql = `INSERT INTO public.remision (id_especialidad, descripcion) VALUES('${remision.id_especialidad}', '${remision.descripcion}')`;
        let result = await _pg.executeSql(sql);
        console.log(result)
        if(result.rowCount==1){
            // NO SE COMO LLAMAR EL METODO
        }
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Remisión de la entrada creada" : "La Remisión de la entrada no fue creada",
            content: remision,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando la Remisión de la entrada",
            content: error,
        });

    }
};

module.exports = { getRemisiones, getRemision, createRemision};