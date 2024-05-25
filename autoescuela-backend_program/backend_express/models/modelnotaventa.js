const dao = require('./dao');
const objeto_dao = new dao();

class modelnotaventa {
    constructor(){}

    //CREATE
    registrarNotaVenta(data){
        var sql    = 'insert into nota_venta (nombre, fecha_emision, total, id_usuario, id_inscripcion)'+' values ($1, $2, $3, $4, $5) returning id_notaventa';
        var params = [
            data.nombre, 
            data.fecha_emision, 
            data.total, 
            data.id_usuario, 
            data.id_inscripcion
        ]
        return objeto_dao.execute_one(sql, params);
    }

    //READ
    obtenerNotaVentas(){
        var sql = 'select * from nota_venta order by 1';
        return objeto_dao.select(sql);
    }
    //UPDATE
    actualizarNotaVenta(data){
        var sql    = 'update nota_venta set nombre = $1, fecha_emision = $2, total = $3, id_usuario = $4, id_inscripcion = $5 '+' where id_notaventa = $6';
        var params = [
            data.nombre, 
            data.fecha_emision, 
            data.total, 
            data.id_usuario, 
            data.id_inscripcion, 
            data.id_notaventa
        ]
        return objeto_dao.execute_none(sql, params);
    }

    //DELETE
    eliminarNotaVenta(data){
        var sql    = 'delete from nota_venta where id_notaventa = $1';
        var params = [data.id_notaventa];
        return objeto_dao.execute_none(sql, params);
    }
}

module.exports = modelnotaventa;