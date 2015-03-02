/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/json2.js" />
/// <reference path="../../Scripts/jquery.validate.js" />
/// <reference path="../../Scripts/jquery.toastmessage.js" />
/// <reference path="../../Scripts/jquery.inputValue.js" />


var user = null;

$(function () {

    user = $('#userLabel').val();

    $('#NameTextBox, #SubjectTextBox').inputLetter();


    if (user != "")
        GetUserInfo();


    $('form').validate({
        rules: {
            nametext: "required",
            emailtext: {
                required: true,
                email: true
            },
            subject: "required",
            message: "required"
        },
        messages: {
            nametext: "*",
            emailtext: {
                required: "*",
                email: "*"
            },
            subject: "*",
            message: "*"
        },
        errorPlacement: function (error, element) {

            if (element.attr("name") == "message")
                error.appendTo($('#messageError'));
            else {
                error.insertAfter(element);
            }
        }
    });

    $('#SubmitContactForm').click(function () {

        var check = $('form').valid();
        if (check) {
            var Contacts = new Object();
            Contacts.Name = $('#NameTextBox').val();
            Contacts.Email = $('#EmailTextBox').val();
            Contacts.Subject = $('#SubjectTextBox').val();
            Contacts.Message = $('#MessageTextBox').val();
            ContactForm(Contacts);

            return false;
        }
    });
});


function ContactForm(Contacts) {
    $.ajax({
        type: "POST",
        url: "../Service/books.svc/ContactUs",
        data: '{"Contacts":' + JSON.stringify(Contacts) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ContactFormSuccess,
        error: ContactFormError
    });
}

function ContactFormSuccess(data, status) {
    //$('.MainField').append('<br/><p style="color:red;"><strong>Your message has been sent successfully.One of our staff member will contact you soon at your specified EmailAddress.Thank you</strong></p>');
    $('#NameTextBox,#EmailTextBox,#SubjectTextBox,#MessageTextBox').val('');
    $().toastmessage('showToast', {
        text: 'Your message has been sent successfully.One of our staff member will contact you soon at your specified EmailAddress.Thank you',
        sticky: true,
        position: 'top-center',
        type: 'success'

    });
    //alert("your message has been sent");
}

function ContactFormError(request, status, error) {
    alert(request.statusText);
}



function GetUserInfo() {
    $.ajax({
        type: "POST",
        url: "../Service/books.svc/GetUserInfo",
        data: '{"user":' + JSON.stringify(user) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetUserInfoSuccess,
        error: GetUserInfoError
    });
}

function GetUserInfoSuccess(data, status) {
    var InfoContainer = JSON.parse(data.d);
    $('#NameTextBox').val(InfoContainer[0].Name);
    $('#EmailTextBox').val(InfoContainer[0].Email);
    $('#NameTextBox').attr('readonly', true);
    $('#EmailTextBox').attr('readonly', true);
}

function GetUserInfoError(request, status, error) {

}
