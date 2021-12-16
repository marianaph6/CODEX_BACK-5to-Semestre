const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
//const _entradasController = require("../controllers/Entradas/Entradas.Controller");


/**
 * Método de consultar todas las entradas de la historia clinica de un paciente
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getEntradas = async (req, res) => {
    let id = req.params.id;
    let sql = "SELECT id_historiaclinica, id_entrada, fecha, motivoconsulta FROM public.entrada WHERE id_historiaclinica='" + id + "'";
    try {
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Entradas de la historia clinica consultadas",
            content: rows,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando las entradas de la historia clinica",
            content: error,
        });
    }
};

/**
 * Método para consultar el detalle de una entrada de la historia clinica de un paciente
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getEntrada = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = "SELECT * FROM public.entrada WHERE id_entrada='" + id + "'";
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Entrada de la historia clinica consultada",
            content: rows[0],
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando la entrada de la historia clinica",
            content: error,
        });
    }
};

const createRemision = async (remision_especialidad,remision_descripcion, res) => {
    try {
        //let remision = req.body;
        let sql = `INSERT INTO public.remision (id_especialidad, descripcion) VALUES('${remision_especialidad}', '${remision_descripcion}')`;
        let result = await _pg.executeSql(sql);
        console.log(result)
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

const createEntrada = async (req, res) => {
    var date = new Date();
    let fecha=(date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear());
    try {
        let entrada = req.body;
        //Editar campos del insert
        /* try {
            createRemision(entrada.remision_esp,entrada.remision_desc,res)
            
        } catch (error) {
            console.log(error);
        } */
        // let sql2 = `select id_remision FROM public.remision order by id_remision desc limit 1`;
        //let result2 = await _pg.executeSql(sql2);
        let sql = `INSERT INTO public.entrada (peso, estatura, fecha, motivoconsulta, descripcion,id_historiaclinica) VALUES('${entrada.peso}', '${entrada.estatura}', '${fecha}', '${entrada.motivoconsulta}', '${entrada.descripcion}', '${entrada.id_historia}');`
        let result = await _pg.executeSql(sql);
        console.log(result)
        
        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Entrada de la historia clinica creada" : "La entrada de la historia clinica no fue creada",
            content: entrada,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando la entrada de la historia clinica",
            content: error,
        });

    }
};

module.exports = { getEntradas, getEntrada, createEntrada};