const { response } = require('express');
const path = require('path');
const sql = require('mssql');
const dbConfig = require('./config');
const { Console } = require('console');
let _STATUSCODE = 200;

exports.hierarchyPage = (req, res, next) => {
    res.sendFile(`${path.dirname(process.mainModule.filename)}/public/views/employees/hierarchy.html`);
};
