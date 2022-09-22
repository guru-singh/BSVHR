const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
let _STATUSCODE = 200;


exports.listHospitals = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/hospitals/list.html`);
};

exports.getHospitalDetailsPage = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/hospitals/detail.html`);
};



exports.getHospitalList = (req, res, next) => {
    listHospitalsList(req.body).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};

exports.getHospitalDetailsById = (req, res, next) => {
    getHospitalDetailsById(req.params).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};


exports.addHospitals = () => {

};

exports.updateHospitals = () => {

};

exports.deleteHospitals = (req, res, next) => {
    deleteHospital(req.body).then(result => {
        console.result;
        res.status(_STATUSCODE).json(result)
    })
};


listHospitalsList = (objParam) => {
    //console.log('I am Here', objParam);
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .execute("USP_BSVHR_LIST_HOSPITAL")
                    .then(function (resp) {
                        // console.log(resp)
                        resolve(resp.recordset);
                        dbConn.close();
                    })
                    .catch(function (err) {
                        //console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                //console.log(err);
            });
    });
};


deleteHospital = (objParam) => {
    // console.log('I am Here', objParam);
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("hospitalId", sql.Int, objParam.hospitalId)
                    .execute("USP_BSVHR_DELETE_HOSPITAL")
                    .then(function (resp) {
                        let json = { success: true, msg: 'Hospital deleted successfully' };
                        resolve(json);
                        dbConn.close();
                    })
                    .catch(function (err) {
                        //console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                //console.log(err);
            });
    });
};



getHospitalDetailsById = (objParam) => {
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("hospitalId", sql.Int, objParam.hospitalId)
                    .execute("USP_BSVHR_GET_HOSPITAL_DETAILS_BY_ID")
                    .then(function (resp) {
                        //console.log(resp)
                        resolve(resp.recordset);
                        dbConn.close();
                    })
                    .catch(function (err) {
                        //console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                //console.log(err);
            });
    });
};
