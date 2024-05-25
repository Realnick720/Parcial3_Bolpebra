const promise = require('bluebird');
const pgp     = require('pg-promise')();
const db      = pgp('postgres://miguel:13538451@localhost:5432/autoescuela');

class dao{
    constructor(){}

    select (sql, params = []){
        return new promise((resolve, reject) => {
            db.any(sql, params).then( data => {
                resolve(data);
            }).catch( function (error) {
                console.log('Error running sql' + sql);
                console.log(error);
                reject(error);
            })
        })
    }

    execute_one (sql, params = []){
        return new promise((resolve, reject) => {
            db.one(sql, params).then( data => {
                resolve(data);
            }).catch( function (error) {
                console.log('Error running sql' + sql);
                console.log(error);
                reject(error);
            })
        })
    }

    execute_none (sql, params = []){
        return new promise((resolve, reject) => {
            db.none(sql, params).then( data => {
                resolve(data);
            }).catch( function (error) {
                console.log('Error running sql' + sql);
                console.log(error);
                reject(error);
            })
        })
    }

    master_detail(sqlmaester, sqldetail, param = [], list_parad = []){
        return new promise ((resolve, reject) => {
            db.tx( async transaction => {
                const id = await transaction.one(sqlmaester, param, firstvalue => +firstvalue.id_notaventa );
                list_parad.forEach( async parad => {
                    parad[0] = id;
                    await transaction.none(sqldetail, parad);
                });
                return id;
            }).then( data => {
                resolve(data);
            }).catch( function (error) {
                console.log('Error running sql' + sql);
                console.log(error);
                reject(error);
            });
        })
    }
}

module.exports = dao;