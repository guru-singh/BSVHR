const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
const { Console } = require('console');
let _STATUSCODE = 200;


exports.listingPage = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/employees/list.html`);
};



exports.getEmployeesList = (req, res, next) => {
    getEmployeesList(req.body).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};


getEmployeesList = (objParam) => {
    //console.log('I am Here', objParam);
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .execute("USP_BSVHR_LIST_EMPLOYEES")
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


/************* DELETE MODULE *************/

exports.deleteEmployee = (req, res, next) => {
    deleteEmployee(req.params).then(result => {
        console.result;
        res.status(_STATUSCODE).json(result)
    })
};




deleteEmployee = (objParam) => {
   // console.log('delete employee', objParam.empId);
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("empId", sql.Int, objParam.empId)
                    .execute("USP_BSVHR_DELETE_EMPLOYEE")
                    .then(function (resp) {
                        let json = { success: true, msg: 'Employee deleted successfully' };
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

/************* DELETE MODULE *************/




/************* EDIT MODULE *************/
exports.getEmployeeDetailsPage = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/employees/detail.html`);
};


exports.getEmployeeDetailsById = (req, res, next) => {
    getEmployeeDetailsById(req.params).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};




getEmployeeDetailsById = (objParam) => {
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("empId", sql.Int, objParam.empId)
                    .execute("USP_BSVHR_GET_EMPLOYEE_DETAILS_BY_ID")
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

//getHospitalDetailsPage
/************* EDIT MODULE *************/
/************* MASTER MODULE *************/
exports.getMasterData = (req, res, next) => {
    getMasterData(req.params).then((result) => {
        res.status(_STATUSCODE).json(result);
    });
};


getMasterData = (objParam) => {
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .execute("USP_BSVHR_GET_MASTER_DATA")
                    .then(function (resp) {
                        resolve(resp.recordsets);
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
/************* MASTER MODULE *************/


