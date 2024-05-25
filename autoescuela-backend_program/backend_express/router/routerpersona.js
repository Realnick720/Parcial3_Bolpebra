const express    = require('express');
const router     = express.Router();
const controller = require('../controller/controllerpersona');

router.get('/obtenerPersonas', controller.obtenerPersonas);
router.post('/guardarPersona', controller.guardarPersona);
router.delete('/eliminarPersona', controller.eliminarPersona);

module.exports = router