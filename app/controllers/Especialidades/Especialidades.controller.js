const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

//Traer todas las especialidades
const getEspecialidades = async (req, res) => {
    let sql = `select * from especialidad`;
    try {
        let result = await _pg.executeSql(sql);
        console.log(result.rows);
        return res.send(result.rows);
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando las especialidades", content: error, });
    }
};

//Traer una Especialidad en específico
const getEspecialidad = async (req, res) => {
    let especialidad = req.body;
    let sql = `select * from especialidad where id_especialidad = '${especialidad.id_especialidad}'`;
    try {
        let result = await _pg.executeSql(sql);
        console.log(result.rows);
        return res.send(result.rows);
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando la especialidad", content: error, });
    }
};

//Crear una Especialidad
const createEspecialidad = async (req, res) => {
    try {
        let especialidad = req.body;
        let sql = `insert into especialidad (nombre, descripcion) values('${especialidad.nombre}', '${especialidad.descripcion}')`;
        let result = await _pg.executeSql(sql);
        console.log(result.rows);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "La especialidad no fue creado" : "Especialidad creada", content: especialidad, });
    } catch (error) {
        return res.send({ ok: false, message: "Error creado la especialidad", content: error, });
    }
};

//Actualizar Especialidad
const updateEspecialidad = async (req, res) => {

};

//Eliminar Especialidad
const deleteEspecialidad = async (req, res) => {
    try {
        let especialidad = req.body;
        let sql = `delete * from especialidad where id_especialidad = '${especialidad.id_especialidad}')`;
        let result = await _pg.executeSql(sql);
        console.log(result.rows);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "La especialidad no fue eliminada" : "Especialidad eliminada", content: especialidad, });
    } catch (error) {
        return res.send({ ok: false, message: "Error eliminando la especialidad", content: error, });
    }
};

module.exports = { getEspecialidades, getEspecialidad, createEspecialidad, updateEspecialidad, deleteEspecialidad};