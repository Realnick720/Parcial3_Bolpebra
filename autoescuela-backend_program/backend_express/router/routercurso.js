const express = require('express');
const router = express.Router();
const controller = require('../controller/controllercurso');

router.get('/obtenerCursos', controller.obtenerCursos);
router.post('/guardarCurso', controller.guardarCurso);
router.delete('/eliminarCurso', controller.eliminarCurso);

module.exports = router;