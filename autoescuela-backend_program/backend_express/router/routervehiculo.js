const express    = require('express');
const router     = express.Router();
const controller = require('../controller/controllervehiculo');

router.get('/obtenerVehiculos', controller.obtenerVehiculos);
router.post('/guardarVehiculo', controller.guardarVehiculo);
router.delete('/eliminarVehiculo', controller.eliminarVehiculo);

module.exports = router;