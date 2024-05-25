const dao = require('./dao');
const objeto_dao = new dao();

class modelcurso{
    constructor(){}

    // CREATE
    registrarCurso(data){
        var sql    = 'insert into curso (nombre, descripcion, costo, duracion_horas)'+' values ($1, $2, $3, $4) returning id_curso';
        var params = [data.nombre, data.descripcion, data.costo, data.duracion_horas];
        return objeto_dao.execute_one(sql, params);
    }

    // READ
    obtenerCursos(){
        var sql = 'select * from curso order by 1';
        return objeto_dao.select(sql);
    }

    // UPDATE
    modificarCurso(data){
        var sql    = 'update curso set nombre = $1, descripcion = $2, costo = $3, duracion_horas = $4 '+' where id_curso = $5';
        var params = [data.nombre, data.descripcion, data.costo, data.duracion_horas, data.id_curso];
        return objeto_dao.execute_none(sql, params);
    }

    // DELETE
    eliminarCurso(data){
        var sql    = 'delete from curso where id_curso = $1';
        var params = [data.id_curso];
        return objeto_dao.execute_none(sql, params);
    }
}

module.exports = modelcurso;