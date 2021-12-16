const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

//Traer todas los Medicamentos
const getMedicamentos = async (req, res) => {
    let sql = `select * from medicamento`;
    try {
        let result = await _pg.executeSql(sql);
        console.log(result.rows);
        return res.send(result.rows);
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando los medicamentos", content: error, });
    }
};

//Traer un Medicamento en específico
const getMedicamento = async (req, res) => {
    let medicamento = req.body;
    let sql = `select * from medicamento where id_medicamento = '${medicamento.id_medicamento}'`;
    try {
        let result = await _pg.executeSql(sql);
        console.log(result.rows);
        return res.send(result.rows);
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando el medicamento", content: error, });
    }
};

//Crear un Medicamento
const createMedicamento = async (req, res) => {
    try {
        let medicamento = req.body;
        let sql = `insert into medicamento (nombre, descripcion) values('${medicamento.nombre}', '${medicamento.descripcion}'`;
        let result = await _pg.executeSql(sql);
        console.log(result.rows);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El medicamento no fue creado" : "Medicamento creado", content: estudiante, });
    } catch (error) {
        return res.send({ ok: false, message: "Error creado el medicameto", content: error, });
    }
};

//Actualizar Medicamento
const updateMedicamento = async (req, res) => {

};

//Eliminar Medicamento
const deleteMedicamento = async (req, res) => {
    try {
        let medicamento = req.body;
        let sql = `delete * from medicamento where id_medicamento = '${medicamento.id_medicamento}'`;
        let result = await _pg.executeSql(sql);
        console.log(result.rows);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El medicamento no fue eliminado" : "Medicamento eliminado", content: estudiante, });
    } catch (error) {
        return res.send({ ok: false, message: "Error eliminando el medicameto", content: error, });
    }
};

module.exports = { getMedicamentos, getMedicamento, createMedicamento, updateMedicamento, deleteMedicamento};