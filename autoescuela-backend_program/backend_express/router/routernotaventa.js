const express    = require('express');
const router     = express.Router();
const controller = require('../controller/controllernotaventa');

router.get('/obtenerNotasVentas', controller.obtenerNotasVentas);
router.post('/guardarNotaVenta', controller.registrarNotaVenta);
router.delete('/eliminarNotaVenta', controller.eliminarNotaVenta);

module.exports = router;