const exppress   = require('express');
const router     = exppress.Router();
const controller = require('../controller/controllerinscripcion');

router.get('/obtenerInscripciones', controller.obtenerInscripciones);
router.post('/guardarInscripcion', controller.registrarInscripcion);
router.delete('/eliminarInscripcion', controller.eliminarInscripcion);

module.exports = router;