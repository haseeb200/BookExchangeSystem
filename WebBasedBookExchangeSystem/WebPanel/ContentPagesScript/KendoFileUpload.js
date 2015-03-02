/// <reference path="jquery-1.7.1.js" />
/// <reference path="../../Scripts/kendo.all.min.js" />
/// <reference path="../../Scripts/jquery.toastmessage.js" />



var file, fileName, counter = 0;
var upload = $('#files').data("kendoUpload");

$(function () {
    $('#files').kendoUpload({

        async: {
            saveUrl: "../GenericHandler/CustomFileUploadHandler.ashx",
            removeUrl: "../GenericHandler/CustomFileUploadHandler.ashx",
            autoUpload: true

        },
        upload: onUpload,
        complete: onComplete,
        remove: onRemove


    });

});

function onUpload(e) {
    if (counter > 0) {
        $('.k-upload-files li:last').hide();
        $().toastmessage('showToast', {
            text: 'you can not upload more than one image',
            sticky: true,
            position: 'top-center',
            type: 'error'

        });
    
        upload.disable();
    }
    fileName = e.files;
    var extension = fileName[0].extension;

    if (extension == ".jpg" || extension == ".gif" || extension == ".png" || extension == ".jpeg" || extension == ".JPG" || extension == ".GIF"
                    || extension == ".JPEG" || extension == ".PNG") {

    }
    else {
        //alert("File type not allowed");
        $().toastmessage('showToast', {
            text: 'File type not allowed',
            sticky: true,
            position: 'top-center',
            type: 'warning'

        });
        e.preventDefault();
    }

}

function onComplete(e) {
    $('.message').hide();
    var path = "../../BookImages/" + fileName[0].name;
    $('.BookImage').attr('src', path);
    //$('.BookImage').css({ 'width': '210', 'height': '290' });
    counter++;

}

function onRemove(e) {
    counter = 0;
    $('.BookImage').attr('src', '../images/image-not-available.gif');
   // $('.BookImage').css({ 'width': '90', 'height': '130' });
    $('.k-upload-files').hide();
    $('.message').show();
}