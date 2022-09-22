function getHospitalList() {

    let param = {
        method: 'getHospitalList'
    };

    axios
        .get("/hospitals/list", param).then((response) => {

            populateDataTable(response.data);

        }).catch((err) => {
            console.log(err);
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
                `<a href="/hospitals/${item.hospitalId}">Edit</a> | <a href='javascript:void(0)' onclick='DeleteHospital(${item.hospitalId},"${item.hospitalName}");return false;'>Delete</a>`
            ]);
            i++;
        });
    }
}


function getHospitaDetails() {
    //getQueryStringValue('xxx')
    let urlArr = window.location.href.split('/'),
        hospitalId = urlArr[urlArr.length - 1];

    console.log(hospitalId);

    let param = {
        method: 'getHospitalById',
        hospitalId: hospitalId
    };

    axios
        .get('/hospitals/details/:'+hospitalId).then((response) => {
           

        }).catch((err) => {
            console.log(err);
        });
}


function DeleteHospital(id, name) {
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
                alert(response.data.msg)

            }).catch((err) => {
                console.log(err);
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