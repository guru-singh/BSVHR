/*jshint esversion: 6 */

const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const { isArray } = require("util");

const app = express();
const twoDay = 1000 * 60 * 60 * 48;
console.log(twoDay);

app.use(sessions({
  secret: "spak5u9rbRWBkWTSmu9kspak",
  saveUninitialized: true,
  cookie: { maxAge: twoDay },
  resave: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cookieParser());


 const hospitalsRoutes = require('./routes/hospitals');
 //const managerRoutes = require('./routes/manager');
 const employeesRoutes = require('./routes/employee');
 const adminRoutes = require('./routes/admin');

app.use(express.static(path.join(__dirname, "public")));

app.use(hospitalsRoutes);
app.use(adminRoutes);
app.use(employeesRoutes);

//app.use(managerRoutes);



app.listen(process.env.PORT || 3333, () => {
  console.clear();
  console.log("Application listening on port 3333!");
});