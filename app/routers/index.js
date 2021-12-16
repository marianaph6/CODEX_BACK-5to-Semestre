const express = require('express');
const router = express.Router();
const _usuariosController = require('../controllers/Usuarios/Usuarios.controller');
const _entradasController = require("../controllers/Entradas/Entradas.Controller");
const _examenesController = require("../controllers/Examenes/Examenes.controller");
const _examenesPacienteController = require("../controllers/ExamenPaciente/ExamenPaciente.controller");
const _authController = require("../controllers/Usuarios/auth.controller");
const _medicamentosController = require('../controllers/Medicamentos/Medicamentos.controllers');
const _especialidadesController = require('../controllers/Especialidades/Especialidades.controller');
const _entradaposologiaController = require("../controllers/Entradas/EntradaPosologia.Controller");
const _remisionController = require("../controllers/Entradas/Remision.Controller");



// RUTAS PUBLICAS
// Rutas no necesitan un token
router.post("/login", _authController.getUserLogin);

//REGISTRO DEL MIDDLEWARE
//router.use([_authController.verifyTokenMiddleware]);
// RUTAS PRIVADAS
router
  // Descrifrar y verificar token
  .get("/verify", _authController.verifyToken)

  //CRUD USUARIOS
  .get('/usuarios', _usuariosController.getUsuarios)
  .get('/usuario', _usuariosController.getUsuario)
  .post('/usuarios', _usuariosController.createUsuario)
  .put('/usuario', _usuariosController.updateUsuario)
  .delete('/usuario', _usuariosController.deleteUsuario);

//CRUD ENTRADAS
router
  .get('/entradas', _entradasController.getEntradas)
  .get('/entrada', _entradasController.getEntrada)
  .post('/entradas', _entradasController.createEntrada);

//CRUD EXAMENES
router
  .get('/examenes', _examenesController.getExamenes)
  .get('/examen', _examenesController.getExamen)
  .post('/examenes', _examenesController.createExamen);

//CRUD EXAMEN_PACIENTE
router
  .get('/examenes_paciente', _examenesPacienteController.getExamenesPaciente)
  .get('/examen_paciente', _examenesPacienteController.getExamenPaciente)
  .post('/examen_paciente', _examenesPacienteController.createExamenPaciente);

router
  //CRUD MEDICAMENTOS
  .get('/medicamentos', _medicamentosController.getMedicamentos)
  .get('/medicamento', _medicamentosController.getMedicamento)
  .post('/medicamentos', _medicamentosController.createMedicamento)
  .put('/medicamento', _medicamentosController.updateMedicamento)
  .delete('/medicamento', _medicamentosController.deleteMedicamento);

//CRUD ESPECIALIDADES
router
  .get('/especialidades', _especialidadesController.getEspecialidades)
  .get('/especialidad', _especialidadesController.getEspecialidad)
  .post('/especialidades', _especialidadesController.createEspecialidad)
  .put('/medicamento', _especialidadesController.updateEspecialidad)
  .delete('/medicamento', _especialidadesController.deleteEspecialidad);

//CRUD ENTRADA_POSOLOGÍA
router
  .get('/entradaposologia', _entradaposologiaController.getEntradasPosologias)
  .get('/entradaposologia', _entradaposologiaController.getEntradaPosologia)
  .post('/entradaposologia', _entradaposologiaController.createEntradaPosologia);

//CRUD REMISIÓN
router
  .get('/remision', _remisionController.getRemisiones)
  .get('/remision', _remisionController.getRemision)
  .post('/remision', _remisionController.createRemision);

module.exports = router;

