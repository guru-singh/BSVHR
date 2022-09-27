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


exports.updateEmployee = (req, res, next) => {
   // console.log('inside update employee');
    let params = Object.assign(req.params, req.body);
    updateEmployee(params).then(result => {
        res.status(_STATUSCODE).json(result)
    })
};

function updateEmployee( objParam ) {
    // console.log('--------------------------------')
    // console.log(objParam)
    // console.log('--------------------------------')
    return new Promise((resolve) => {
        var dbConn = new sql.ConnectionPool(dbConfig.dataBaseConfig);
        dbConn
            .connect()
            .then(function () {
                var request = new sql.Request(dbConn);
                request
                    .input("EmpID", sql.Int, objParam.empId)
                    .input("firstName", sql.NVarChar, objParam.txtFirstName)
                    .input("MobileNumber", sql.NVarChar, objParam.txtMobile)
                    .input("Password", sql.NVarChar, (objParam.txtPassword))
                    .input("Designation", sql.NVarChar, '')
                    .input("DesignationID", sql.Int, objParam.cmbDesignation)
                    .input("EmpNumber", sql.NVarChar, objParam.txtEmpNumber)
                    .input("HoCode", sql.NVarChar, objParam.txtHqCode)
                    .input("ZoneID", sql.Int, objParam.cmbZone)
                    .input("StateID", sql.Int, (objParam.cmbState))
                    .input("HQName", sql.NVarChar, objParam.txtHqName)
                    .input("RegionName", sql.NVarChar, objParam.txtRegion)
                    .input("DOJ", sql.NVarChar, objParam.txtDOJ)
                    .input("isDisabled", sql.Bit, objParam.chkDisable)
                    .input("comments", sql.NVarChar, (objParam.txtNewComment))
                    .input("email", sql.NVarChar, (objParam.txtEmail))
                    
                    .execute("USP_BSVHR_UPDATE_EMPLOYEE_DETAILS_BY_ID")
                    .then(function (resp) {
                        //console.log(resp.recordset)
                        resolve(resp.recordset);
                        dbConn.close();
                    })
                    .catch(function (err) {
                        console.log(err);
                        dbConn.close();
                    });
            })
            .catch(function (err) {
                console.log(err);
            });
    });
};


//
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

/************* ADD MODULE *************/

exports.addNewEmployee = (req, res, next) => {
    let params = Object.assign({id:null}, req.body);
    // console.log('*****************************')
    // console.log(params)
    // console.log('*****************************')
    updateEmployee(params).then(result => {
        res.status(_STATUSCODE).json(result)
    })
};

/************* ADD MODULE *************/


