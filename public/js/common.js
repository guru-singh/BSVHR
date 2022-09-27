const _SUCCESSFUL_STATUS_CODE = 200;
const _INVAID_SESSION = 202
const _FAILURE_STATUS_CODE = 201


const _URL = {
        _hospitalListing: '/hospitals',
        _POSTLOGINURL:  '/dashboard',
        _HOSPITAL_UPDATE:'/hospitals-update/',
        _HOSPITAL_ADD:'/hospitals-add/',
        _EMPLOYEES_LIST: '/employees/list',
        _EMPLOYEE_DELETE: '/employee-delete',
        _EMPLOYEE_EDIT: '/employee-edit/',
        _EMPLOYEE_DETAILS: '/employee-details/',
        _EMPLOYEE_MASTER: '/employee-master',
        _EMPLOYEE_UPDATE:'/employee-update/',
        _EMPLOYEE_ADD:'/employee-add',
        _EMPLOYEE:'/employees',
        _EMPLOYEE_HERARCHY: '/employee-hierarchy/'

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

function loadComboBox(data, dropdown, displayValue, displayText, optionTextAlongWithDisplayText, txtFormat) {
    
    $('#' + dropdown).empty();
    //$('#' + dropdown).append($('<option></option>').val('').html('---- Select ----'));

    let selectHeader = '';

    switch(dropdown) {
        case 'cmbHosp':
            selectHeader = 'Select Hospital';
        break;
        case 'cmbRegion':
            selectHeader = 'Select State';
        break;
        case 'cmbBrandList':
            selectHeader = 'Select Brand';
        break;
        case 'cmbKam':
            selectHeader = 'Select KAM';
        break;
        case 'cmbRBM':
            selectHeader = 'Select RBM';
        break;
        case 'cmbZBM':
            selectHeader = 'Select ZBM';
        break;
        case 'cmbZone':
            selectHeader = 'Select Zone';
        break;
        default:
            selectHeader = '----Select----';
            break;
    }

    $('#' + dropdown).append($('<option></option>').val('').html(`${selectHeader}`));
    $.each(data, function (index, item) {
        let text = (item[displayText]) ? formatText(item[displayText], txtFormat) : '',
            optinalText = ((optionTextAlongWithDisplayText) ? item[optionTextAlongWithDisplayText] : ''),
            textPlusOptionl = text + ((optinalText.length > 0) ? ' - ' + optinalText.toUpperCase() : '');
        //  console.log('-------------------------------------------')
        //  console.log(text)
        //  console.log(optinalText)
        //  console.log()
        //  console.log('-------------------------------------------')
        $('#' + dropdown).append(
            $('<option></option>').val(item[displayValue]).html((textPlusOptionl))
        );
    });
}

function formatText(str, type) {
//    console.log('text format -->' + type)
    switch(type) {
        case 'UPPER':
            return str.toUpperCase()
        break;
        default:
            return camelCaseText(str)
            break;
    }
   
}

function camelCaseText(str) {
    if (str) {
        let arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();

        }
        return arr.join(" ");
    }
}