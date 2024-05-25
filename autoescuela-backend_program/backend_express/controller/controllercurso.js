const modelcurso = require('../models/modelcurso');
const objeto_modelcurso = new modelcurso();

module.exports = {
    // READ
    obtenerCursos: (req, res) => {
        objeto_modelcurso.obtenerCursos().then( function(curso){
            res.type('json');
            res.send({'Sucess': true, 'data': curso});
        }).catch(function (error){
            res.type('json');
            res.send({'Sucess': false, 'error': error.message});
        });
    },

    //CREATE + UPDATE
    guardarCurso: (req, res) => {
        var data = { id_curso: req.body.id_curso, nombre: req.body.nombre, descripcion: req.body.descripcion, costo: req.body.costo, duracion_horas: req.body.duracion_horas };
        if (data.id_curso == 0){
            objeto_modelcurso.registrarCurso(data).then( data =>{
                res.type('json');
                res.send({'Sucess': true, 'data': data.id_curso});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        } else {
            objeto_modelcurso.modificarCurso(data).then( function (){
                res.type('json');
                res.send({'Sucess': true});
            }).catch(function (error){
                res.type('json');
                res.send({'Sucess': false, 'error': error.message});
            });
        }
    },

    //DELETE
    eliminarCurso: (req, res) => {
        var data = { id_curso: req.body.id_curso };
        objeto_modelcurso.eliminarCurso(data).then( function (){
            res.type('json');
            res.send({'Sucess': true});
        }).catch(function (error){
            res.type('json');
            res.send({'Sucess': false, 'error': error.message});
        });
    }
}