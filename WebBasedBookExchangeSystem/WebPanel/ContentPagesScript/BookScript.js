
/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/json2.js" />
/// <reference path="../../Scripts/jquery.validate.js" />
/// <reference path="modal.popup.js" />
/// <reference path="../../Scripts/kendo.all.min.js" />
/// <reference path="KendoFileUpload.js" />
/// <reference path="../../Scripts/jquery.toastmessage.js" />
/// <reference path="../../Scripts/jquery.inputValue.js" />


var dropdownlist, editor, user;
var numericTextBox;
$(function () {

    user = $('#userLabel').val();

    $('#TitleTextBox, #AuthorTextBox, #PublisherTextBox').inputValue({ allow: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ' });

    $('#EditionTextBox').inputValue({ allow: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789' });

    $('#ISBNTextBox').inputInteger();


    $('.error').css('color', 'red');

    $('#editor').kendoEditor({

    });

    $('.k-editor').css('width', '600px');

    $('#categoryDropDown').kendoDropDownList({
        optionLabel: {
            CategoryName: "Select An Option"
            // Category_Id: ""
        },
        scrollable: false,
        dataTextField: "CategoryName",
        dataValueField: "Category_Id",
        dataSource: {
            transport: {
                read: {
                    url: "../Service/books.svc/BindDropDown",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                }
            },
            schema: {
                parse: function (data) {
                    return JSON.parse(data.d);
                },
                model: {
                    id: "Category_Id",
                    fields: {
                        "Category_Id": { type: "number" },
                        "CategoryName": { type: "string" }
                    }
                }
            }
        }
    });


    $('#conditionDropDown').kendoDropDownList({
        optionLabel: "Select An Option"
    });








    $('#numeric').kendoNumericTextBox({

    });
    $('#SubmitButton').mouseenter(function () {
        $(this).css('cursor', 'pointer');
    });

    $('#SllingPriceTextBox').keydown(function (e) {
        if (e.keyCode == 46 || e.keyCode == 8) {
            // let it happen, don't do anything
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (e.keyCode < 48 || e.keyCode > 57) {
                e.preventDefault();
            }
        }

    });


    $('form').validate({
        rules: {
            booktitle: "required",
            isbn: "required",
            edition: "required",
            author: "required",
            publisher: "required",
            price: "required"

        },
        messages: {
            booktitle: "*",
            isbn: "*",
            edition: "*",
            author: "*",
            publisher: "*",
            price: "*"

        },
        errorPlacement: function (error, element) {

            error.insertAfter(element);
        }
    });

    var validatable = $("form").kendoValidator({
        rules: {
            custom: function (input) {
                if (input[0].type == "file") {
                    return input.closest(".k-upload").find(".k-file").length;
                }

                return true;
            }
        }
    }).data("kendoValidator");

    $('#SubmitButton').click(function () {

        window.scrollTo(80, 700);
        editor = $('#editor').data('kendoEditor');
        numericTextBox = $('#numeric').data("kendoNumericTextBox");
        var conditionDropDownList = $("#conditionDropDown").data("kendoDropDownList");
        var categoryDropDownList = $("#categoryDropDown").data("kendoDropDownList");


        if ($('form').valid()) {

            if (categoryDropDownList.value() == "Select An Option") {
               
                $().toastmessage('showToast', {
                    text: 'Please select a Category field',
                    sticky: true,
                    position: 'top-center',
                    type: 'warning'
                });
                $('.toast-item-wrapper').css('width', '300px');
            }


            else if (conditionDropDownList.text() == "Select An Option") {
                $().toastmessage('showToast', {
                    text: 'Please select a Condition field',
                    sticky: true,
                    position: 'top-center',
                    type: 'warning'
                });
                $('.toast-item-wrapper').css('width', '300px');
            }


            else if (validatable.validate()) {
                var BookInfo = new Object();
                BookInfo.ImageName = fileName[0].name;
                BookInfo.BookTitle = $('#TitleTextBox').val();
                BookInfo.ISBN = $('#ISBNTextBox').val();
                BookInfo.Edition = $('#EditionTextBox').val();
                BookInfo.Author = $('#AuthorTextBox').val();
                BookInfo.Description = editor.value();
                BookInfo.Category_Id = categoryDropDownList.value();
                BookInfo.Condition = conditionDropDownList.text();
                BookInfo.Publisher = $('#PublisherTextBox').val();
                BookInfo.Price = numericTextBox.value();
                AddBook(BookInfo);
                return false;
            }

        }

    });




    //BookInfo
    function AddBook(BookInfo) {

        $.ajax({
            type: "POST",
            url: "../Service/books.svc/BookPost",
            data: '{"bsc":' + JSON.stringify(BookInfo) + ',"user":' + JSON.stringify(user) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: PostSuccess,
            error: PostFail
        });
    }


    function PostSuccess(data, status) {

        $('#TitleTextBox, #ISBNTextBox, #EditionTextBox, #AuthorTextBox, #PublisherTextBox').val('');
        $().toastmessage('showToast', {
            text: 'Your post required to be approved by one of our staff member.We will notify you by Email once its approved. please close this window to return to the home page.',
            sticky: true,
            position: 'top-center',
            type: 'notice',
            close: function () {
                document.location.href = "../ContentPages/Home.aspx";
            }

        });

    }


    function PostFail(request, status, error) {
        alert(request.statusText);
    }

});



function SuccessMessage() {
    //Change these values to style your modal popup
    //window.scrollTo(80, 630);
    var source = "../ContentPages/SellBook.aspx.htm";
    var width = 450;
    var align = "center";
    var top = 50;
    var padding = 10;
    var backgroundColor = "#FFFFFF";
    var borderColor = "#000000";
    var borderWeight = 4;
    var borderRadius = 5;
    var fadeOutTime = 300;
    var disableColor = "#666666";
    var disableOpacity = 40;
    var loadingImage = "../images/loading.gif";

    //This method initialises the modal popup


    modalPopup(align,
		    top,
		    width,
		    padding,
		    disableColor,
		    disableOpacity,
		    backgroundColor,
		    borderColor,
		    borderWeight,
		    borderRadius,
		    fadeOutTime,
		    source,
		    loadingImage);

}