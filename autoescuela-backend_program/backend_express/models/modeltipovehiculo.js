const dao        = require('./dao');
const objeto_dao = new dao();

class modeltipovehiculo{
    constructor(){}

    //CREATE
    guardarTipoVehiculo (data){
        var sql    = 'insert into tipo_vehiculo (descripcion, capacidad_kg)'+' values ($1, $2) returning id_tipovehiculo';
        var params = [data.descripcion, data.capacidad_kg];
        return objeto_dao.execute_one(sql, params);
    }

    //READ
    obtenerTiposVehiculos (){
        var sql = 'select * from tipo_vehiculo order by 1';
        return objeto_dao.select(sql);
    }

    //UPDATE
    actualizarTipoVehiculo (data){
        var sql    = 'update tipo_vehiculo set descripcion = $1, capacidad_kg = $2 '+' where id_tipovehiculo = $3';
        var params = [data.descripcion, data.capacidad_kg, data.id_tipovehiculo];
        return objeto_dao.execute_none(sql, params);
    }

    //DELETE
    eliminarTipoVehiculo (data){
        var sql    = 'delete from tipo_vehiculo where id_tipovehiculo = $1';
        var params = [data.id_tipovehiculo];
        return objeto_dao.execute_none(sql, params);
    }
}

module.exports = modeltipovehiculo;