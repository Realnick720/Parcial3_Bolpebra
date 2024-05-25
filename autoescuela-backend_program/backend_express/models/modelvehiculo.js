const dao = require('./dao');
const objeto_dao = new dao();

class modelvehiculo{
    constructor(){}

    //CREATE
    registrarVehiculo (data){
        var sql = 'insert into vehiculo (marca, modelo, color, placa, anio, transmision, id_tipovehiculo)'+' values ($1, $2, $3, $4, $5, $6, $7) returning id_vehiculo';
        var params = [data.marca, data.modelo, data.color, data.placa, data.anio, data.transmision, data.id_tipovehiculo];
        return objeto_dao.execute_one(sql, params);
    }

    //READ
    obtenerVehiculos (){
        var sql = 'select * from vehiculo order by 1';
        return objeto_dao.select(sql);
    }

    //UPDATE
    modificarVehiculo (data){
        var sql = 'update vehiculo set marca = $1, modelo = $2, color = $3, placa = $4, anio = $5, transmision = $6, id_tipovehiculo = $7 '+' where id_vehiculo = $8';
        var params = [data.marca, data.modelo, data.color, data.placa, data.anio, data.transmision, data.id_tipovehiculo, data.id_vehiculo];
        return objeto_dao.execute_none(sql, params);
    }

    //DELETE
    eliminarVehiculo (data){
        var sql = 'delete from vehiculo where id_vehiculo = $1';
        var params = [data.id_vehiculo];
        return objeto_dao.execute_none(sql, params);
    }
}

module.exports = modelvehiculo;