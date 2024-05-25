const modelinscripcion = require('../models/modelinscripcion');
const modelusuario     = require('../models/modelusuario');
const modelnotaventa   = require('../models/modelnotaventa');
const objeto_modelinscripcion = new modelinscripcion();
const objeto_modelusuario     = new modelusuario();
const objeto_modelnotaventa   = new modelnotaventa();

module.exports = {
    // READ
    obtenerNotasVentas (req, res) {
        objeto_modelnotaventa.obtenerNotaVentas().then( (notaventas) => {
            objeto_modelinscripcion.ObtenerInscripciones().then( (inscripciones) => {
                objeto_modelusuario.obtenerUsuarios().then( (usuarios) => {
                    res.type('json');
                    res.send({
                        'Success': true,
                        'Data': {
                            'NotasVentas'  : notaventas,
                            'Inscripciones': inscripciones,
                            'Usuarios'     : usuarios
                        }
                    });
                }).catch( (error) => {
                    res.type('json');
                    res.send({
                        'Success': false,
                        'Error'  : error.message
                    });
                });
            }).catch( (error) => {
                res.type('json');
                res.send({
                    'Success': false,
                    'Error'  : error.message
                });
            });
        }).catch( (error) => {
            res.type('json');
            res.send({
                'Success': false,
                'Error'  : error.message
            });
        });
    },

    // CREATE + UPDATE
    registrarNotaVenta(req, res) {
        var data = {
            id_notaventa : req.body.id_notaventa,
            nombre        : req.body.nombre,
            fecha_emision : req.body.fecha_emision,
            total         : req.body.total,
            id_usuario    : req.body.id_usuario,
            id_inscripcion: req.body.id_inscripcion
        };
        if (data.id_notaventa == 0){
            objeto_modelnotaventa.registrarNotaVenta(data).then( () => {
                res.type('json');
                res.send({
                    'Success': true,
                    'Data': data.id_notaventa
                });
            }).catch((error) => {
                res.type('json');
                res.send({
                    'Success': false,
                    'Error'  : error.message
                });
            })
        }
    },

    // DELETE
    eliminarNotaVenta(req, res){
        var data = {
            id_notaventa : req.body.id_notaventa
        };
        objeto_modelnotaventa.eliminarNotaVenta(data).then( () => {
            res.type('json');
            res.send({
                'Success': true
            });
        }).catch((error) => {
            res.type('json');
            res.send({
                'Success': false,
                'Error'  : error.message
            });
        })
    }
}