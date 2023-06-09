function getHospitalList() {

    $('#loader').removeClass('none');

    let param = {
        method: 'getHospitalList'
    };

    axios
        .get("/hospitals/list", param).then((response) => {
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
    $("#hospitalList").DataTable().clear();
    var length = data.length;
    //  console.log(length)
    if (length == 0) {
        $("#hospitalList").DataTable().clear();
    } else {
        var i = 1;
        data.forEach(item => {
            $('#hospitalList').dataTable().fnAddData([
                i,
                item.hospitalName,
                item.regionName,
                item.bedNo,
                item.ICUbedNo,
                `<a href="/hospitals-edit/${item.hospitalId}">Edit</a> | <a href='javascript:void(0)' onclick='DeleteHospital(${item.hospitalId},"${item.hospitalName}");return false;'>Delete</a>`
            ]);
            i++;
        });
    }
}


function getHospitaDetails() {

    if (!isEditPage()) {
        return;
    }
    $('#loader').removeClass('none');
    let urlArr = window.location.href.split('/'),
        hospitalId = urlArr[urlArr.length - 1];

    console.log(hospitalId);

    let param = {
        method: 'getHospitalById',
        hospitalId: hospitalId
    };

    axios
        .get('/hospitals-details/' + hospitalId).then((response) => {
            let hospitalData = response.data[0];
            console.log(hospitalData);
            $('#txtHospitalName').val(hospitalData.hospitalname);
            $('#txtRegionName').val(hospitalData.regionName);
            $("#chkIsDisable").prop("checked", hospitalData.isDisabled);
            $('#loader').addClass('none');
        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });
}


function DeleteHospital(id, name) {
    $('#loader').removeClass('none');
    let text = `Are you sure you want to delete "${name}"`; // "Are you sure you want to delete '+  +'!\nEither OK or Cancel.";
    if (confirm(text) == true) {
        let param = {
            method: 'deleteHospital',
            hospitalId: id
        };
        //  console.log(param)
        axios
            .post("/hospitals/delete", param).then((response) => {
                //console.log(response.data)
                alert(response.data.msg);
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


function getQueryStringValue(key) {
    console.log(window.location)
    let urlSearchParams = new URLSearchParams(window.location.search);
    console.log(urlSearchParams)
    return urlSearchParams.get(key);


}

function validateMe() {
    $('#loader').removeClass('none');
    //debugger;
    let urlArr = window.location.href.split('/'),
        hospitalId = urlArr[urlArr.length - 1];
    // console.log($('#chkIsDisable').is(":checked"));
    //console.log(hospitalId);

    let param = {
        hospitalName: $('#txtHospitalName').val(),
        hospitalregion: $('#txtRegionName').val(),
        isDisabled: $('#chkIsDisable').is(":checked") ? 'Checked' : ''
    }

    URL = isEditPage() ? _URL._HOSPITAL_UPDATE + hospitalId : _URL._HOSPITAL_ADD

    axios
        .post(URL, param).then((response) => {
            console.log(response.data[0])
            let res = response.data[0];
            // if (res.sucess === 'true') {
            //     redirect(_URL._hospitalListing);
            // } else {
            //     $('#lblMsg').text(res.msg);
            // }

            redirect(_URL._hospitalListing);

            $('#loader').addClass('none');
        }).catch((err) => {
            console.log(err);
            $('#loader').addClass('none');
        });



}