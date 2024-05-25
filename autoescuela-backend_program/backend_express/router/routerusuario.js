const express    = require('express');
const router     = express.Router();
const controller = require('../controller/controlerusuario');

router.get('/obtenerUsuarios', controller.obtenerUsuarios);
router.post('/guardarUsuario', controller.guardarUsuario);
router.delete('/eliminarUsuario', controller.eliminarUsuario);

module.exports = router