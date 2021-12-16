const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
const _examenpacienteController = require("../ExamenPaciente/ExamenPaciente.controller");


/**
 * Método de consultar todas los examenes de un paciente
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getExamenes = async (req, res) => {
    let sql = `SELECT id_examen, nombre, id_arealaboratorio FROM public.examen`;
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Examenes del paciente consultados",
            content: rows,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando las Examenes del paciente",
            content: error,
        });
    }
};

/**
 * Método para consultar el detalle de un examen de un paciente
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getExamen = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT * FROM public.examen WHERE id_examen = ${id}`;
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Examen de paciente consultado",
            content: rows[0],
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando el examen del paciente",
            content: error,
        });
    }
};

const createExamen = async (req, res) => {
    try {
        let examen = req.body;
        let sql = `INSERT INTO public.examen
        (nombre, id_arealaboratorio)
        VALUES('${examen.nombre}', '${examen.id_arealaboratorio}')`;
        let result = await _pg.executeSql(sql);
        console.log(result)
        if(result.rowCount==1){
            // NO SE COMO LLAMAR EL METODO
        }
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Examen creado" : "El examen no fue creado",
            content: examen,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando el examen",
            content: error,
        });

    }
};

module.exports = { getExamenes, getExamen, createExamen};