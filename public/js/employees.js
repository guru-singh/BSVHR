function getEmployeeList() {

    let param = {
        method: 'getEmployeesList'
    };

    axios
        .get(_URL._EMPLOYEES_LIST, param).then((response) => {
            console.log(response.data);
            populateDataTable(response.data);

        }).catch((err) => {
            console.log(err);
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
    } else {
        var i = 1;
        data.forEach(item => {
            $('#employeesList').dataTable().fnAddData([
                i,
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
                item.comments.split('/r/n')[0],
                `<a href='${_URL._EMPLOYEE_EDIT}${item.empId}'>Edit</a> | <a href='javascript:void(0)' onclick='DeleteEmployee(${item.empId},"${item.firstName}");return false;'>Delete</a>`
            ]);
            i++;
        });
    }
}


function DeleteEmployee(id, name) {
    let text = `Are you sure you want to delete "${name}"`; // "Are you sure you want to delete '+  +'!\nEither OK or Cancel.";
    if (confirm(text) == true) {
        axios
            .post(_URL._EMPLOYEE_DELETE + '/' + id).then((response) => {
                //console.log(response.data)
                alert(response.data.msg)

            }).catch((err) => {
                console.log(err);
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
    let urlArr = window.location.href.split('/'),
        empId = urlArr[urlArr.length - 1];

    console.log(empId);

    axios
        .get(`${_URL._EMPLOYEE_DETAILS}${empId}`).then((response) => {
           // console.log(response.data)
            let empDetails = response.data[0];
            //   combzone
            //   cmbState
            //   cmbDesignation
           // console.log(empDetails)
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
            empDetails.comments.toString().replaceAll('/r/n', '<br>')

            $('#cmbZone').val(empDetails.ZoneID);
            $('#txtStateId').val(empDetails.stateID);
            $('#txtDesignation').val(empDetails.DesignationID);


            var str = empDetails.comments.toString().replaceAll('/r/n', '<br>');
            var regex = /<br\s*[\/]?>/gi;
            $("#txtComment").val(str.replace(regex, "\n"));
            setTimeout(
                cmbValues
                ,
                500);
            $("#chkDisable").prop("checked", empDetails.empDisabled);


        }).catch((err) => {
            console.log(err);
        });
}

function cmbValues() {
    $("#cmbState").val($('#txtStateId').val());

    $("#cmbDesignation").val($('#txtDesignation').val())
}


function validateMe()
{
    let urlArr = window.location.href.split('/'),
    empId = urlArr[urlArr.length - 1];



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
        chkDisable: ($('#chkDisable').val() === 'on')
    },
    URL =  isEditPage()? _URL._EMPLOYEE_UPDATE+empId: _URL._EMPLOYEE_ADD;
debugger;
    
    axios
    .post(URL, param).then((response) => {
        console.log(response.data[0])
        let res = response.data[0];
        if (res.sucess === 'true') {
             redirect(_URL._EMPLOYEE);
        } else {
            $('#lblMsg').text(res.msg);
        }
    }).catch((err) => {
        console.log(err);
    });
    
}