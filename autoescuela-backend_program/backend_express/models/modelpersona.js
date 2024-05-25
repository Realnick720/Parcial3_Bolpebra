const dao = require('./dao');
const objeto_dao = new dao();

class modelpersona{
    constructor(){}

    //CREATE
    RegistrarPersona (data){
        var sql    = 'insert into persona (nombres, apellidos, fecha_nacimiento, ci, telefono)'+' values ($1, $2, $3, $4, $5) returning id_persona';
        var params = [data.nombres, data.apellidos, data.fecha_nacimiento, data.ci, data.telefono];
        return objeto_dao.execute_one(sql, params);
    }

    //READ
    ObtenerPersonas (){
        var sql = 'select * from persona order by 1';
        return objeto_dao.select(sql);
    }

    //UPDATE
    ModificarPersona (data){
        var sql    = 'update persona set nombres = $1, apellidos = $2, fecha_nacimiento = $3, ci = $4, telefono = $5 '+' where id_persona = $6';
        var params = [data.nombres, data.apellidos, data.fecha_nacimiento, data.ci, data.telefono, data.id_persona];
        return objeto_dao.execute_none(sql, params);
    }

    //DELETE
    EliminarPersona (data){
        var sql    = 'delete from persona where id_persona = $1';
        var params = [data.id_persona];
        return objeto_dao.execute_none(sql, params);
    }
}

module.exports = modelpersona;