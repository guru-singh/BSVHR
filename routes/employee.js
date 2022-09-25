const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController')

router.use((req, res, next) => {
   // console.clear();
  //  console.log('Time: ', Date.now())
    next()
  })

// //   //listing

router.get('/employees', controller.listingPage);
router.get('/employees/list', controller.getEmployeesList);


// // // update
router.get('/employee-edit/:id', controller.getEmployeeDetailsPage);
router.get('/employee-details/:empId', controller.getEmployeeDetailsById);
router.get('/employee-master', controller.getMasterData);
router.post('/employee-update/:empId', controller.updateEmployee);


// // // DELETE
router.post('/employee-delete/:empId', controller.deleteEmployee);


// // //ADD
// // router.get('/employees-add/', controller.getHospitalDetailsPage);
// // router.post('/employees-add/', controller.addNewHospital);

module.exports = router;