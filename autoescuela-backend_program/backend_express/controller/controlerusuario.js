const modelpersona = require('../models/modelpersona');
const modelusuario = require('../models/modelusuario');
const objeto_modelpersona = new modelpersona();
const objeto_modelusuario = new modelusuario();

module.exports = {
    // READ
    obtenerUsuarios: (req, res) => {
        objeto_modelusuario.obtenerUsuarios().then( function(usuario){
            objeto_modelpersona.ObtenerPersonas().then( function(persona){
                res.type('json');
                res.send({ 'SUCESS': true, 'data': { 'usuario': usuario, 'persona': persona } });
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
    guardarUsuario: (req, res) => {
        var data = { id_usuario: req.body.id_usuario, usuario: req.body.usuario, contrasena: req.body.contrasena, id_persona: req.body.id_persona };
        if (data.id_usuario == 0){
            objeto_modelusuario.crearUsuario(data).then( data =>{
                res.type('json');
                res.send({'Sucess': true, 'data': data.id_usuario});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        } else {
            objeto_modelusuario.modificarUsuario(data).then( function (){
                res.type('json');
                res.send({'Sucess': true});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        }
    },

    //DELETE
    eliminarUsuario(req, res) {
        var data = { id_usuario: req.body.id_usuario };
        objeto_modelusuario.eliminarUsuario(data).then( function (){
            res.type('json');
            res.send({'Sucess': true});
        }).catch(function (error){
            res.type('json');
            res.send({'Sucess': false, 'error': error.message});
        });
    }
}