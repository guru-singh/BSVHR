const _SUCCESSFUL_STATUS_CODE = 200;
const _INVAID_SESSION = 202
const _FAILURE_STATUS_CODE = 201
const _POSTLOGINURL = '/dashboard'


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