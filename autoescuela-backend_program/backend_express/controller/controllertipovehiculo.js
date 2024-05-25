const modeltipovehiculo        = require('../models/modeltipovehiculo');
const objeto_modeltipovehiculo = new modeltipovehiculo();

module.exports = {
    // READ
    obtenerTiposVehiculos: (req, res) => {
        objeto_modeltipovehiculo.obtenerTiposVehiculos().then( function (data){
            res.type('json');
            res.send({'Sucess': true, 'data': data});
        }).catch(function (error){
            res.type('json');
            res.send({'Sucess': false, 'error': error.message});
        });
    },

    //CREATE + UPDATE
    guardarTipoVehiculo: (req, res) => {
        var data = { id_tipovehiculo: req.body.id_tipovehiculo, descripcion: req.body.descripcion, capacidad_kg: req.body.capacidad_kg };
        if (data.id_tipovehiculo == 0){
            objeto_modeltipovehiculo.guardarTipoVehiculo(data).then( data =>{
                res.type('json');
                res.send({'Sucess': true, 'data': data.id_tipovehiculo});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        } else {
            objeto_modeltipovehiculo.actualizarTipoVehiculo(data).then( function (){
                res.type('json');
                res.send({'Sucess': true});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        }
    }, 

    //DELETE
    eliminarTipoVehiculo(req, res) {
        var data = { id_tipovehiculo: req.body.id_tipovehiculo };
        objeto_modeltipovehiculo.eliminarTipoVehiculo(data).then( function (){
            res.type('json');
            res.send({'Sucess': true});
        }).catch(function (error){
            res.type('json');
            res.send({'Sucess': false, 'error': error.message});
        });
    }
}