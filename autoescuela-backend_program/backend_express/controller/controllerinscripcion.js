const modelCurso       = require('../models/modelcurso');
const modelVehiculo    = require('../models/modelvehiculo');
const modelPersona     = require('../models/modelpersona');
const modelInscripcion = require('../models/modelinscripcion');

const objetoModelCurso       = new modelCurso();
const objetoModelVehiculo    = new modelVehiculo();
const objetoModelPersona     = new modelPersona();
const objetoModelInscripcion = new modelInscripcion();

module.exports = {
    // READ
    obtenerInscripciones: (req, res) => {
        objetoModelInscripcion.ObtenerInscripciones().then((inscripciones) => {
            objetoModelPersona.ObtenerPersonas().then((personas) => {
                objetoModelVehiculo.obtenerVehiculos().then((vehiculos) => {
                    objetoModelCurso.obtenerCursos().then((cursos) => {
                        res.type('json');
                        res.send({
                            'Success': true,
                            'Data': {
                                'Inscripciones': inscripciones,
                                'Personas': personas,
                                'Vehiculos': vehiculos,
                                'Cursos': cursos
                            }
                        });
                    }).catch((error) => {
                        res.type('json');
                        res.send({ 'Success': false, 'Error': error.message });
                    });
                }).catch((error) => {
                    res.type('json');
                    res.send({ 'Success': false, 'Error': error.message });
                });
            }).catch((error) => {
                res.type('json');
                res.send({ 'Success': false, 'Error': error.message });
            });
        }).catch((error) => {
            res.type('json');
            res.send({ 'Success': false, 'Error': error.message });
        });
    },

    // CREATE + UPDATE
    registrarInscripcion: (req, res) => {
        var data = {
            id_inscripcion: req.body.id_inscripcion,
            fecha         : req.body.fecha,
            tipo_curso    : req.body.tipo_curso,
            estado        : req.body.estado,
            id_curso      : req.body.id_curso,
            id_vehiculo   : req.body.id_vehiculo,
            id_instructor : req.body.id_instructor,
            id_alumno   : req.body.id_alumno
        };
        if (data.id_inscripcion == 0) {
            objetoModelInscripcion.RegistrarInscripcion(data).then((data) => {
                res.type('json');
                res.send({
                    'Success': true,
                    'Data': data.id_inscripcion
                });
            }).catch((error) => {
                res.type('json');
                res.send({
                    'Success': false,
                    'Error': error.message
                });
            });
        } else {
            objetoModelInscripcion.ModificarInscripcion(data).then(() => {
                res.type('json');
                res.send({
                    'Success': true
                });
            }).catch((error) => {
                res.type('json');
                res.send({
                    'Success': false,
                    'Error': error.message
                });
            });
        }
    },

    // DELETE
    eliminarInscripcion: (req, res) => {
        var data = {
            id_inscripcion: req.body.id_inscripcion
        };
        objetoModelInscripcion.EliminarInscripcion(data).then(() => {
            res.type('json');
            res.send({
                'Success': true
            });
        }).catch((error) => {
            res.type('json');
            res.send({
                'Success': false,
                'Error': error.message
            });
        });
    }
};
