const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();


/**
 * Método de consultar todos los examenes de un paciente
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getExamenesPaciente = async (req, res) => {
    let id = req.params.id;
    let sql = `SELECT id_examen,id_paciente FROM public.examenpaciente WHERE id_paciente = ${id}`;
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
            message: "Ha ocurrido un error consultando los Examenes del paciente",
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
const getExamenPaciente = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT * FROM public.examenpaciente WHERE id_examenpaciente = ${id}`;
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

const createExamenPaciente = async (req, res) => {
    try {
        let examenpaciente = req.body;
        let sql = `INSERT INTO public.examenpaciente (id_examen, id_paciente, id_medicoauxiliar, id_entrada, resultado, fecha) VALUES('${examenpaciente.id_examen}', '${examenpaciente.id_paciente}', '${examenpaciente.medicoauxiliar}', '${examenpaciente.id_entrada}', '${examenpaciente.resultado}', '${examenpaciente.fecha}')`;
        let result = await _pg.executeSql(sql);
        console.log(result)
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Examen creado" : "El examen no fue creado",
            content: examenpaciente,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando el examen",
            content: error,
        });

    }
};

module.exports = { getExamenesPaciente, getExamenPaciente, createExamenPaciente};