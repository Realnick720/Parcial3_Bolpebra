const modeltipovehiculo = require('../models/modeltipovehiculo');
const modelvehiculo     = require('../models/modelvehiculo');
const objeto_modeltipovehiculo = new modeltipovehiculo();
const objeto_modelvehiculo     = new modelvehiculo();

module.exports = {
    // READ
    obtenerVehiculos: (req, res) =>{
        objeto_modelvehiculo.obtenerVehiculos().then( function (vehiculo){
            objeto_modeltipovehiculo.obtenerTiposVehiculos().then( function (tipos){
                res.type('json');
                res.send({ 'SUCESS': true, 'data': { 'vehiculos': vehiculo}, 'tipos': tipos});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            })
        }).catch(function (error){
            res.type('json');
            res.send({'Sucess': false, 'error': error.message});
        });
    },

    //CREATE + UPDATE
    guardarVehiculo: (req, res) => {
        var data = { id_vehiculo: req.body.id_vehiculo, marca: req.body.marca, modelo: req.body.modelo, color: req.body.color, placa: req.body.placa, anio: req.body.anio, transmision: req.body.transmision, id_tipovehiculo: req.body.id_tipovehiculo };
        if (data.id_vehiculo == 0){
            objeto_modelvehiculo.registrarVehiculo(data).then( data =>{
                res.type('json');
                res.send({'Sucess': true, 'data': data.id_vehiculo});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        } else {
            objeto_modelvehiculo.modificarVehiculo(data).then( function (){
                res.type('json');
                res.send({'Sucess': true});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        }
    },

    //DELETE
    eliminarVehiculo(req, res) {
        var data = { id_vehiculo: req.body.id_vehiculo };
        objeto_modelvehiculo.eliminarVehiculo(data).then( function (){
            res.type('json');
            res.send({'Sucess': true});
        }).catch(function (error){
            res.type('json');
            res.send({'Sucess': false, 'error': error.message});
        });
    }
}