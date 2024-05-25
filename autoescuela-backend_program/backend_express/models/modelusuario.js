const dao = require('./dao');
const objeto_dao = new dao();

class modelusuario{
    constructor(){}

    //CREATE
    crearUsuario (data){
        var sql    = 'insert into usuario (usuario, contrasena, id_persona)'+' values ($1, $2, $3) returning id_usuario';
        var params = [data.usuario, data.contrasena, data.id_persona];
        return objeto_dao.execute_one(sql, params);
    }

    //READ
    obtenerUsuarios (){
        var sql = 'select * from usuario order by 1';
        return objeto_dao.select(sql);
    }

    //UPDATE
    actualizarUsuario (data){
        var sql    = 'update usuario set usuario = $1, contrasena = $2, id_persona = $3 '+' where id_usuario = $4';
        var params = [data.usuario, data.contrasena, data.id_persona, data.id_usuario];
        return objeto_dao.execute_none(sql, params);
    }

    //DELETE
    eliminarUsuario (data){
        var sql    = 'delete from usuario where id_usuario = $1';
        var params = [data.id_usuario];
        return objeto_dao.execute_none(sql, params);
    }
}

module.exports = modelusuario