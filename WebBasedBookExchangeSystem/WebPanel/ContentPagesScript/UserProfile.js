/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jquery.validate.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/json2.js" />
/// <reference path="../../Scripts/jquery.activity-indicator-1.0.0.js" />
/// <reference path="../../Scripts/jquery.toastmessage.js" />
/// <reference path="../../Scripts/jquery.inputValue.js" />


var userTemplate;


$(function () {

    $('#busy1').activity();


    $.get("../Templates/UserProfile.htm", function (data) {

        userTemplate = $.template("cacheUserProfileTemplate", data);

    });

    GetAccountDetail();

    $('.profile').click(function () {
        $('#content').addClass('animated bounceOut');
        GetAccountDetail();
    });



    $('form').validate({
        rules: {
            fname: "required",
            lname: "required",
            country: "required",
            city: "required",
            cellphone: "required",
            checkemail: {
                required: true,
                email: true
            },
            gender: "required"
        },
        messages: {
            fname: "*",
            lname: "*",
            country: "*",
            city: "*",
            cellphone: "*",
            gender: "*",
            checkemail: {
                required: "*",
                email: "*"
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "gender")
                error.appendTo($('#genderError'));
            else {
                error.insertAfter(element);
            }
        }
    });


    return false;


});


function GetAccountDetail() {
    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/GetAccountDetail",
        data: '{"user":' + JSON.stringify($('#userLabel').val()) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetAccountDetailSuccess,
        error: GetAccountDetailError
    });
}

function GetAccountDetailSuccess(data, status) {
    var accountDetailContainer = JSON.parse(data.d);


    setTimeout(function () {
        $('#left').html($.tmpl(userTemplate, accountDetailContainer));
        $('#busy1').activity(false);

        $('#FirstNameTextBox, #LastNameTextBox').inputLetter();
        $('#EmailAddressTextBox').inputEmail();
        $('#CellPhoneTextBox').inputInteger();

        $('#submitButton').click(function () {
            var check = $('form').valid();
            $('label.error').css('color', 'red');
            debugger;
            if (check) {
                var updateAccount = new Object();
                updateAccount.FirstName = $('#FirstNameTextBox').val();
                updateAccount.LastName = $('#LastNameTextBox').val();
                updateAccount.EmailAddress = $('#EmailAddressTextBox').val();
                updateAccount.CellPhone = $('#CellPhoneTextBox').val();
                UpdateAccountDetail(updateAccount);

            }
        });
    }, 1000);




    //    $('#FirstNameTextBox').val(accountDetailContainer[0].FirstName);
    //    $('#LastNameTextBox').val(accountDetailContainer[0].LastName);
    //    $('#EmailAddressTextBox').val(accountDetailContainer[0].EmailAddress);
    //    $('#CountryTextBox').val(accountDetailContainer[0].Country);
    //    $('#CityTextBox').val(accountDetailContainer[0].City);
    //    $('#CellPhoneTextBox').val(accountDetailContainer[0].CellPhone);
    //    $('#CountryTextBox').attr('readonly', true);
    //    $('#CityTextBox').attr('readonly', true);

}

function GetAccountDetailError(request, status, error) {
    alert(request.statusText);

}


function UpdateAccountDetail(updateAccount) {
    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/UpdateAccountDetail",
        data: '{"user":' + JSON.stringify($('#userLabel').val()) + ',"updateAccount":' + JSON.stringify(updateAccount) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: UpdateAccountDetailSuccess,
        error: UpdateAccountDetailError
    });
}

function UpdateAccountDetailSuccess(data, status) {
    $().toastmessage('showToast', {
        text: 'Changes has been made ...',
        sticky: true,
        position: 'top-center',
        type: 'success'

    });
    

}

function UpdateAccountDetailError(request, status, error) {
    alert(request.statusText);
}