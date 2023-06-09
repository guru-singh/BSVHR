function getEmployeeList() {

    $('#loader').removeClass('none');

    let param = {
        method: 'getEmployeesList'
    };

    axios
        .get(_URL._EMPLOYEES_LIST, param).then((response) => {
            console.log(response.data);
            populateDataTable(response.data);
            $('#loader').addClass('none');
        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });
}


function populateDataTable(data) {
    //  console.log("populating data table...");
    // clear the table before populating it with more data
    $("#employeesList").DataTable().clear();
    var length = data.length;
    //  console.log(length)
    if (length == 0) {
        $("#employeesList").DataTable().clear();
        $("#empHospitalList .dataTables_empty").html('xxxx')
    } else {

        data.forEach(item => {

            $('#employeesList').dataTable().fnAddData([
                item.empnumber,
                item.designation,
                item.firstName,
                item.email,
                item.mobileNumber,
                item.zoneName,
                item.StateName,
                item.hocode,
                item.hqname,
                item.regionName,
                item.doj,
                item.isDisabled,
                //item.comments.split('/r/n')[0],
                item.comments,
                `<a href='${_URL._EMPLOYEE_EDIT}${item.empId}'>Edit</a> | <br>
                <a href='${_URL._EMPLOYEE_HERARCHY}${item.empId}'>Change Manager</a> | <br>
                ${item.designation === 'KAM' || item.designation === 'Sr KAM' ?
                    `<a href=${_URL._EMPLOYEE_HOSPITAL}${item.empId}>List of Hospitals</a> | <br>` : ''}
                ${item.designation === 'ZBM' || item.designation === 'RBM' ?
                    `<a href=${_URL._EMPLOYEE_MY_TEAM}${item.empId}>My Team</a> | <br>` : ''}
                
                <a href='javascript:void(0)' onclick='DeleteEmployee(${item.empId},"${item.firstName}");return false;'>Delete</a>`
            ]);
        });
    }
}


function DeleteEmployee(id, name) {
    $('#loader').removeClass('none');
    let text = `Are you sure you want to delete "${name}"`; // "Are you sure you want to delete '+  +'!\nEither OK or Cancel.";
    if (confirm(text) == true) {
        axios
            .post(_URL._EMPLOYEE_DELETE + '/' + id).then((response) => {
                //console.log(response.data)
                alert(response.data.msg)
                $('#loader').addClass('none');
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                $('#loader').addClass('none');
            });
    } else {
        text = "You canceled!";
    }
}

function getMasterData() {
    axios
        .get(`${_URL._EMPLOYEE_MASTER}`).then((response) => {
            // console.log(response.data)
            let zoneList = response.data[0],
                stateList = response.data[1],
                designationList = response.data[2];
            // LIST HOSPITALS
            //  loadComboBox(zoneList, 'combzone', 'zoneID', 'NAME');
            loadComboBox(stateList, 'cmbState', 'stateId', 'stateName');
            loadComboBox(designationList, 'cmbDesignation', 'designationId', 'designation', '', 'UPPER');
        }).catch((err) => {
            console.log(err);
        });
}
function getEmployeeDetails() {
    getMasterData();

    if (!isEditPage()) {
        $('#txtEmail').prop('readonly', false);
        $('#dvOldComments').hide();
        return;
    }

    $('#loader').removeClass('none');
    let urlArr = window.location.href.split('/'),
        empId = urlArr[urlArr.length - 1];

    console.log(`${_URL._EMPLOYEE_DETAILS}${empId}`);

    axios
        .get(`${_URL._EMPLOYEE_DETAILS}${empId}`).then((response) => {
            console.log(response.data)
            let empDetails = response.data[0];
            //   combzone
            //   cmbState
            //   cmbDesignation            
            $('#txtHqCode').val(empDetails.HoCode);
            $('#txtEmpNumber').val(empDetails.EmpNumber);
            $('#txtFirstName').val(empDetails.firstName);
            $('#txtHqName').val(empDetails.HQName);
            $('#txtRegion').val(empDetails.RegionName);
            $('#txtDOJ').val(empDetails.DOJ);
            $('#txtMobile').val(empDetails.MobileNumber);
            $('#txtEmail').val(empDetails.Email);
            $('#txtPassword').val(empDetails.Password);
            //$('#chkDisable').val(empDetails.)
            if (empDetails.comments) {
                empDetails.comments.toString().replaceAll('/r/n', '<br>');
                var str = empDetails.comments.toString().replaceAll('/r/n', '<br>');
                var regex = /<br\s*[\/]?>/gi;
                $("#txtComment").val(str.replace(regex, "\n"));
            }

            $('#cmbZone').val(empDetails.ZoneID);
            $('#txtStateId').val(empDetails.StateID);
            $('#txtDesignation').val(empDetails.DesignationID);


            setTimeout(cmbValues, 500);
            $("#chkDisable").prop("checked", empDetails.empDisabled);
            $('#loader').addClass('none');

        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });
}

function cmbValues() {
    $("#cmbState").val($('#txtStateId').val());

    $("#cmbDesignation").val($('#txtDesignation').val())
}


function validateMe() {

    $('#loader').removeClass('none');

    let urlArr = window.location.href.split('/'),
        empId = urlArr[urlArr.length - 1];

    console.log($('#chkDisable').is(":checked"));

    let param = {
        cmbZone: $('#cmbZone').val(),
        cmbState: $('#cmbState').val(),
        txtHqCode: $('#txtHqCode').val(),
        txtEmpNumber: $('#txtEmpNumber').val(),
        txtFirstName: $('#txtFirstName').val(),
        cmbDesignation: $('#cmbDesignation').val(),
        txtHqName: $('#txtHqName').val(),
        txtRegion: $('#txtRegion').val(),
        txtDOJ: $('#txtDOJ').val(),
        txtMobile: $('#txtMobile').val(),
        txtEmail: $('#txtEmail').val(),
        txtPassword: $('#txtPassword').val(),
        txtNewComment: $('#txtNewComment').val(),
        chkDisable: $('#chkDisable').is(':checked'), //($('#chkDisable').val() === 'on'),
        cmbState: $('#cmbState').val(),
    },
        URL = isEditPage() ? _URL._EMPLOYEE_UPDATE + empId : _URL._EMPLOYEE_ADD;

    console.log(param);

    axios
        .post(URL, param).then((response) => {
            console.log(response.data[0])
            let res = response.data[0];
            // if (res.sucess === 'true') {
            //     redirect(_URL._EMPLOYEE);
            // } else {
            //     $('#lblMsg').text(res.msg);
            // }

            $('#loader').addClass('none');
            redirect(_URL._EMPLOYEE);
        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });

}


/** EMPLOYEE MANAGER LIST */
function setupEmployeeHospitalPage() {
    console.log('ready to roll')
    // get employee list
    getEmployeeHospitalList()
}

function getEmployeeHospitalList() {
    let empId = getIdFromURL();
    console.log(empId);
    $('#loader').removeClass('none');
    axios
        .get(`${_URL._EMPLOYEE_HOSPITAL_LIST}${empId}`).then((response) => {
            // console.log(response.data)

            populateEmployeeHospitalDataTable(response.data[0]);
            $('#loader').addClass('none');

        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });
    //console.log(formatText('this is my idea', 'UPPER'))
}


function populateEmployeeHospitalDataTable(data) {
    //  console.log("populating data table...");
    // clear the table before populating it with more data
    $("#empHospitalList").DataTable().clear();
    var length = data.length;
    //  console.log(length)
    if (length == 0) {
        $("#empHospitalList").DataTable().clear();
    } else {
        var i = 1;
        data.forEach(item => {
            $('#empHospitalList').dataTable().fnAddData([
                item.hospitalName,
                item.regionName,
                `<a href='javascript:void(0)' onclick='removeHospitalFromEmployeeList(${getIdFromURL()},${item.hospitalId}, "${item.hospitalName}");return false;'>Delete</a>`
            ]);
            i++;
        });
    }
}
//`<a href='javascript:void(0)' onClick=removeHospitalFromEmployeeList(${getIdFromURL()},${item.hospitalId},"")>${item.hospitalName} | Emp Remove</a>`

function removeHospitalFromEmployeeList(empId, hospitalId, name) {
    console.log(arguments)
    let text = `Are you sure you want to remove "${name} from the selected employee"`; // "Are you sure you want to delete '+  +'!\nEither OK or Cancel.";
    if (confirm(text) == true) {
        axios
            .post(_URL._EMPLOYEE_HOSPITAL_EDIT + empId + '/' + hospitalId).then((response) => {
                console.log(response.data[0])
                alert(response.data[0].msg)

            }).catch((err) => {
                console.log(err);
            });
    } else {
        text = "You canceled!";
    }
}



function setupAssignNewHospitalToEmployeePage() {
    // console.log('ready to roll')
    // get employee list
    getAllUnAssingedHospitals()
}

function getAllUnAssingedHospitals() {
    $('#loader').removeClass('none');
    axios
        .get(`${_URL._EMPLOYEE_HOSPITAL_UN_ASSIGNED}`).then((response) => {
            // console.log(response.data)
            populateUnAssingedHospitalDataTable(response.data);
            $('#loader').addClass('none');
        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });
    //console.log(formatText('this is my idea', 'UPPER'))
}


function populateUnAssingedHospitalDataTable(data) {
    //  console.log("populating data table...");
    // clear the table before populating it with more data
    $("#un-assinged-hospital-list").DataTable().clear();
    var length = data.length;
    //  console.log(length)
    if (length == 0) {
        $("#un-assinged-hospital-list").DataTable().clear();
    } else {
        data.forEach(item => {
            $('#un-assinged-hospital-list').dataTable().fnAddData([
                `<input type="checkbox" class="selectedchk" value="${item.hospitalId}"></input>`,
                item.hospitalName,
                item.regionName
            ]);
        });
    }
}

function ValidateUnAssignedHospitals() {

    console.log('get all the selcted checkbox');

    $('#loader').removeClass('none');

    var arr = [],
        empId = getIdFromURL();
    $('.selectedchk').each(function () {
        if ($(this).prop('checked')) {
            let o = {};
            o.hospitalId = $(this).val();
            o.empId = empId;
            arr.push(o)
        }
    });
    console.log(arr);
    let param = {};
    param.param = arr;

    axios
        .post(`${_URL._EMPLOYEE_HOSPITAL_UN_ASSIGNED_UPDATE}`, param).then((response) => {
            //  console.log(response.data)
            // populateUnAssingedHospitalDataTable(response.data);
            $('#loader').addClass('none');
            redirect(`${_URL._EMPLOYEE_HOSPITAL}${empId}`);
        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });

}

/** EMPLOYEE MANAGER LIST */



/** my team list */
function getMyTeam() {
    let empId = getIdFromURL();
    //  console.log(empId)
    let param = {
        method: 'getEmployeesList',
        empId
    };

    //   console.log(param)
    axios
        .get(_URL._EMPLOYEE_MY_TEAM_LIST + empId, param).then((response) => {
            // console.log(response.data);
            let data = response.data;
            // var chartData = {};
            // var empId = getIdFromURL();
            // //console.log(empId)
            // MyDetails = data.filter(emp => {
            //     // console.log(emp) 
            //     return (emp.EmpID == empId)
            // });
            // //console.log(MyDetails[0])
            // chartData = {
            //     name: MyDetails[0].FIRSTName,
            //     //name: 'root',
            //     empId: MyDetails[0].EmpID,
            //     children: []
            // };
            // debugger;
            // var children = chartData.children;
            // data.forEach(emp => {
            //     let parentId = emp.ParentId;
            //     if (emp.ParentId) {
            //         if (empId == parentId) {
            //             // do nothing
            //             children.push({
            //                 name: emp.FIRSTName,
            //                 empId: emp.EmpID,
            //                 value: emp.EmpID,
            //                 children: []
            //             })
            //         } else {
            //             //console.log(empId, emp.ParentId, emp.EmpID)
            //             //console.log('Search in children')
            //             let parentDetails = children.find(child => {
            //                 return (child.empId == parentId)
            //             })
            //             parentDetails.children.push({
            //                 name: emp.FIRSTName,
            //                 empId: emp.EmpID,
            //                 value: emp.EmpID,
            //                 children: []
            //             });


            //         }
            //     } else {
            //         //  console.log('Parent Id is null')
            //     }
            // });

            // debugger
            // console.log(chartData)
            // // chartData = {
            // //     name: "Sreejani Biswas",
            // //     children: [
            // //       {name: "Kamlesh Vishwakarma",value: 3},
            // //       {
            // //         name: "Yogesh Sutar",value: 3
            // //       },
            // //       {
            // //         name: "Vinay Bajaj",value: 3
            // //       },
            // //       {
            // //         name: "nodeB",
            // //         children: [
            // //           {
            // //             name: "leafBA",
            // //             value: 5
            // //           },
            // //           {
            // //             name: "leafBB",
            // //             value: 1
            // //           }
            // //         ]
            // //       }
            // //     ]
            // //   };



            var chartData = {};
            MyDetails = data.find(emp => {
                // console.log(emp) 
                return (emp.EmpID == empId)
            });
            chartData = [{
                name: `${MyDetails.FIRSTName} (${MyDetails.Designation})`,
                //name: 'root',
                empId: MyDetails.EmpID,
                desig: MyDetails.Designation,
                value: empId,
                children: []
            }];

            var oldId = 0;
            data.forEach(emp => {
                //console.log('oldId--->'+ oldId)
                if (emp.ParentId) {
                    //    console.log('got ParentId -->' + oldId)

                    childrenData = (getMyChildren(data, oldId));

                    // console.log('got child data-->'+ childrenData.length)
                    chtData = findObject(chartData, 'empId', oldId);

                    //console.log(chtData)
                    if (chtData) {
                        childrenData.forEach(child => {
                            chtData[0].children.push({
                                name: `${child.FIRSTName} (${child.Designation})`,
                                empId: child.EmpID,
                                desig: child.Designation,
                                value: emp.EmpID,
                                children: []
                            })
                        })
                    }
                    // console.log('*********')
                }
                else {
                    // do notihng, as we have already created it

                }
                oldId = emp.EmpID
            })




            //  console.log(...chartData)

            const color = d3.scaleOrdinal(d3.schemePaired);
            Sunburst()
                .data(...chartData)
                .color(d => color(d.name))
                .minSliceAngle(.4)
                .excludeRoot(true)
                .maxLevels(10)
                .showLabels(true)
                .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
                (document.getElementById('chart'));

            // populateDataTable(response.data);

        }).catch((err) => {
            console.log(err);
        });
}

function findObject(obj = {}, key, value) {
    const result = [];
    function recursiveSearch(obj = {}) {
        if (!obj || typeof obj !== 'object') {
            return;
        };
        if (obj[key] === value) {
            result.push(obj);
        };
        Object.keys(obj).forEach(function (k) {
            recursiveSearch(obj[k]);
        });
    } recursiveSearch(obj);
    return result;
} console.log();

function getMyChildren(data, id) {
    let children = data.filter(emp => {
        return (emp.ParentId == id)
    });
    return children;
}


/** my team list */
