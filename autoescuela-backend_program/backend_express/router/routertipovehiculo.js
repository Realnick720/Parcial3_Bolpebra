const express = require('express');
const router = express.Router();
const controller = require('../controller/controllertipovehiculo');

router.get('/obtenerTiposVehiculos', controller.obtenerTiposVehiculos);
router.post('/guardarTipoVehiculo', controller.guardarTipoVehiculo);
router.delete('/eliminarTipoVehiculo', controller.eliminarTipoVehiculo);

module.exports = router;