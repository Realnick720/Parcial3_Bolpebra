const modelpersona        = require('../models/modelpersona');
const objeto_modelpersona = new modelpersona();

module.exports = {
    // READ
    obtenerPersonas: (req, res) => {
        objeto_modelpersona.ObtenerPersonas().then( function (data){
            res.type('json');
            res.send({'Sucess': true, 'data': data});
        }).catch(function (error){
            res.type('json');
            res.send({'Sucess': false, 'error': error.message});
        });
    },

    //CREATE + UPDATE
    guardarPersona: (req, res) => {
        var data = { id_persona: req.body.id_persona, nombres: req.body.nombres, apellidos: req.body.apellidos, fecha_nacimiento: req.body.fecha_nacimiento, ci: req.body.ci, telefono: req.body.telefono };
        if (data.id_persona == 0){
            objeto_modelpersona.RegistrarPersona(data).then( data =>{
                res.type('json');
                res.send({'Sucess': true, 'data': data.id_persona});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        } else {
            objeto_modelpersona.ModificarPersona(data).then( function (){
                res.type('json');
                res.send({'Sucess': true});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        }
    },

    //DELETE
    eliminarPersona(req, res) {
        var data = { id_persona: req.body.id_persona };
        objeto_modelpersona.EliminarPersona(data).then( function (){
            res.type('json');
            res.send({'Sucess': true});
        }).catch(function (error){
            res.type('json');
            res.send({'Sucess': false, 'error': error.message});
        });
    }
}