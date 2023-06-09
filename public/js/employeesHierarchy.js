function setupPage() {
    // console.log('setup my hierarchy page')
    getEmployeeDetails()
    getEmployeeManagerList()
}

function getEmployeeDetails() {
    $('#loader').removeClass('none');
    let urlArr = window.location.href.split('/'),
        empId = urlArr[urlArr.length - 1];
    axios
        .get(`${_URL._EMPLOYEE_HERARCHY_EMP_AND_PARENT}${empId}`).then((response) => {
            let empDetails = response.data[0][0],
                mgrDetails = response.data[1][0];
            //    console.log(empDetails)
            $('#dvName').html(empDetails.firstName)
            $('#dvDesi').html(empDetails.Designation)
            $('#dvManager').html(mgrDetails.firstName)
            $('#loader').addClass('none');
        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });
}

function getEmployeeManagerList() {
    $('#loader').removeClass('none');
    let urlArr = window.location.href.split('/'),
        empId = urlArr[urlArr.length - 1];
    axios
        .get(`${_URL._EMPLOYEE_HERARCHY_MGR_LIST}${empId}`).then((response) => {
            let mgrList = response.data;
            loadComboBox(mgrList, 'cmbParent', 'empId', 'Name', null, 'UPPER');
            $('#loader').addClass('none');
        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });
}

function validateMe() {

    $('#loader').removeClass('none');

    if ($('#cmbParent').val() === "") {
        alert('select Parent');
        return false;
    }
    let urlArr = window.location.href.split('/'),
        empId = urlArr[urlArr.length - 1],
        param = {
            empId: empId,
            parentId: parseInt($('#cmbParent').val())
        }
    axios
        .post(`${_URL._EMPLOYEE_HERARCHY_EMP_MGR_UPDATE}`, param).then((response) => {
            let data = response.data[0];
            if (data.success === 'false') {
                $('#dvMsg').html(data.msg)
            } else {
                $('#dvMsg').html(data.msg)
                redirect(_URL._EMPLOYEE);
            }

            $('#loader').addClass('none');

        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });
}