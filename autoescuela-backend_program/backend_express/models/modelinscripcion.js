const dao = require('./dao');
const objeto_dao = new dao();

class modelinscripcion {
    constructor() {}

    // CREATE
    RegistrarInscripcion(data) {
        var sql    = 'insert into inscripcion (fecha, tipo_curso, estado, id_curso, id_vehiculo, id_instructor, id_alumno)'+' values ($1, $2, $3, $4, $5, $6, $7) returning id_inscripcion';
        var params = [
            data.fecha, 
            data.tipo_curso, 
            data.estado, 
            data.id_curso, 
            data.id_vehiculo, 
            data.id_instructor, 
            data.id_alumno];
        return objeto_dao.execute_one(sql, params);
    }

    // READ
    ObtenerInscripciones() {
        var sql = 'select * from inscripcion order by 1';
        return objeto_dao.select(sql);
    }

    // UPDATE
    ModificarInscripcion(data) {
        var sql    = 'update inscripcion set fecha = $1, tipo_curso = $2, estado = $3, id_curso = $4, id_vehiculo = $5, id_instructor = $6, id_alumno = $7 where id_inscripcion = $8';
        var params = [
            data.fecha, 
            data.tipo_curso, 
            data.estado, 
            data.id_curso, 
            data.id_vehiculo, 
            data.id_instructor, 
            data.id_alumno, 
            data.id_inscripcion];
        return objeto_dao.execute_none(sql, params);
    }

    // DELETE
    EliminarInscripcion(data) {
        var sql    = 'delete from inscripcion where id_inscripcion = $1';
        var params = [data.id_inscripcion];
        return objeto_dao.execute_none(sql, params);
    }
}

module.exports = modelinscripcion;