const _SUCCESSFUL_STATUS_CODE = 200;
const _INVAID_SESSION = 202
const _FAILURE_STATUS_CODE = 201


const _URL = {
        _hospitalListing: '/hospitals',
        _POSTLOGINURL:  '/dashboard',
        _HOSPITAL_UPDATE:'/hospitals-update/',
        _HOSPITAL_ADD:'/hospitals-add/',

    }


function checkIfValidStatus(statusCode) {
    switch (statusCode) {
        case _SUCCESSFUL_STATUS_CODE:
            return 1;
            break;
        case _FAILURE_STATUS_CODE:
            return 2;
            break;
        case _INVAID_SESSION:
            // lets do something
            break;
        default:
            break;
    }

}

function redirect(url) {
    document.location.href = url;
}

function isEditPage(){
    return (location.pathname.indexOf('add') < 0)

}