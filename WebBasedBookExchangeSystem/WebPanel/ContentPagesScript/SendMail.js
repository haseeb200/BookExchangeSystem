/// <reference path="jquery-1.7.1.js" />
/// <reference path="../../Scripts/jquery.blockUI.js" />
/// <reference path="json2.js" />
/// <reference path="kendo.all.min.js" />
/// <reference path="rwQueryString-1.0.jquery.min.js" />
/// <reference path="../../Scripts/jquery.toastmessage.js" />

var id, user, email;
$(function () {

    user = $('#userLabel').val();
    id = $.readQS('id');
    email = $.readQS('email');
    $('.k-textbox').val(email);
    $('#editor').kendoEditor({

    });



    $('.k-button').click(function () {
        var editor = $('#editor').data("kendoEditor");
        var sender = $('.k-textbox').val();
        var message = editor.value();

        if (message == "") {
            $().toastmessage('showToast', {
                text: 'Empty Email Can Not Be Send',
                sticky: true,
                position: 'top-center',
                type: 'error'


            });
        }
        else {
            $.blockUI({ css: {
                border: 'none',
                left: '420px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            },
                message: '<h1>Please wait...</h1>'
            });
            SendMail(sender, message);
        }

        
    });

});
function SendMail(sender, message) {
    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/SendMail",
        data: '{"sender":' + JSON.stringify(sender) + ',"message":' + JSON.stringify(message) + ',"user":' + JSON.stringify(user) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SendSuccess,
        error: SendError
    });
}

function SendSuccess(data, status) {
    
    $.unblockUI();
    //alert("Your message has been sent.");
    //document.location.href = "BooksLibrary.aspx?bid=" + id;
    $().toastmessage('showToast', {
        text: 'Your message has been sent ...',
        sticky: true,
        position: 'top-center',
        type: 'success',
        close: function () {
            document.location.href = "BooksLibrary.aspx?bid=" + id;
        }

    });
    
}

function SendError(request, status, error) {
    alert(request.statusText);
}
