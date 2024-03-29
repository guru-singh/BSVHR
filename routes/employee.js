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
router.get('/employee-add/', controller.getEmployeeDetailsPage);
router.post('/employee-add/', controller.addNewEmployee);



// // //ADD
// router.get('/employee-add/', controller.getEmployeeDetailsPage);
// router.post('/employee-add/', controller.addNewEmployee);



//employee hospital list
router.get('/employee-hospital/:empId', controller.getAssingedHospitalPage);
router.get('/employee-hospital-list/:empId', controller.getAssingedHospitaList);
router.post('/employee-hospital-edit/:empId/:hospitalId', controller.removeHospitalFromEmployeeList);

router.get('/employee-hospital-new/:empId', controller.getAssignNewHospitalToEmployeePage);
router.get('/employee-hospital-un-assigned', controller.getUnAssingedHospitals);
router.post('/employee-hospital-un-assigned-update', controller.updateUnAssingedHosptalstoEmployee);


router.get('/employee-my-team/:empId', controller.getMyTeam);
router.get('/employee-my-team-list/:empId', controller.getMyTeamList);



//router.post('/employee-add/', controller.addNewEmployee);


module.exports = router;