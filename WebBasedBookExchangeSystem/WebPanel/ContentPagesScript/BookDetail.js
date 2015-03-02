/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jquery-ui-1.8.18.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/json2.js" />
/// <reference path="../../Scripts/moment.js" />
/// <reference path="../../Scripts/rwQueryString-1.0.jquery.min.js" />
/// <reference path="BookReviews.js" />
/// <reference path="BooksLibrary.js" />
/// <reference path="../../Scripts/jquery.toastmessage.js" />
/// <reference path="../../Scripts/jquery.inputValue.js" />

/// <reference path="../../Scripts/jquery.validate.js" />

var BookID, BookDetail, BookCategories, date, cid = "", user = null;

$(function () {
    //alert("ok");
    user = $('#userLabel').val();

    $('#pageContent').ajaxStop(function () {

        $('button[title=ViewDetail]').click(function () {

            BookID = $(this).attr('type');
            $('#casing, #navigation').addClass('animated fadeOutLeftBig');

            GetBookCategories();
            GetBookDetail();


            return false;
        });

        $('a[type=categories]').click(function () {
            cid = $(this).attr('class');
            $('#casing').addClass('animated fadeOutLeftBig');

            setTimeout(function () {
                $.getScript("../ContentPagesScript/BooksLibrary.js");
            }, 500);

        });

    });


});

function GetBookDetail() {
    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/GetBookDetail",
        data: '{"BookID":' + JSON.stringify(BookID) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetBookDetailSuccess,
        error: GetBookDetailError
    });
}

function GetBookDetailSuccess(data, status) {


    BookDetail = $.parseJSON(data.d);
    date = moment(BookDetail[0].DateTime).format('dddd, MMMM Do YYYY, h:mm:ss a');

    $('#pageContent').html('<div id="casing"></div>');
    $('#casing').addClass('animated fadeInRightBig');
    //$('#casing').html($.tmpl("#TemplateDetail", BookDetail));
    $('#casing').html($("#TemplateDetail").tmpl(BookDetail));
    $('.title').append('<br /><div class="addthis_toolbox addthis_default_style "><a class="addthis_button_facebook_like" fb="button_count" like="button_count" layout="button_count"></a><a class="addthis_button_tweet"></a><a class="addthis_counter addthis_pill_style"></a></div>');
    $.getScript("../../Scripts/addthis.js");
    //$('.categories').append($.tmpl("#TemplateCategory", BookCategories));
    $('.categories').append($("#TemplateCategory").tmpl(BookCategories));
    $('.bookDescription').html(BookDetail[0].Description);
    $('.DateTime').append(date);
    $.getScript("../../Scripts/jquery.raty.min.js");
    $.getScript("../ContentPagesScript/Rating.js");
    $.getScript("../ContentPagesScript/BookRatingDetail.js");
    $.getScript("../ContentPagesScript/WishList.js");
    GetBookReviews();

    if (BookDetail[0].UserName == user) {
        $('button[title=email], button[title=MyWish]').css("display", "none");
    }

    $('.commentSection').accordion({
        collapsible: true,
        autoHeight: false,
        active: false

    });

    $('button[title=email]').click(function () {
        //alert("cick");
        window.location.href = "SendMail.aspx?id=" + $(this).attr('type') + "&email=" + $(this).attr('name');
        return false;
    });



    $('button[title=SubmitReviews]').click(function () {


        if (user == "") {
            $().toastmessage('showToast', {
                text: 'you have to login first',
                sticky: true,
                position: 'top-center',
                type: 'error'

            });

            $('#MessageTextBox').val('');
            //alert("you have to login first");

        }
        else {

            var BookReviews = new Object();
            BookReviews.Book_ID = BookID;
            BookReviews.Reviews = $('#MessageTextBox').val();
            if ($('#MessageTextBox').val() != '')
                PostBookReviews(BookReviews, user);
            $('#MessageTextBox').val('');
            //$('#MessageTextBox').clearInputs();
        }

        return false;
    });
}

function GetBookDetailError(request, status, error) {
    alert(request.statusText);
}



function GetBookCategories() {

    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/GetBookCategories",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetBookCategoriesSuccess,
        error: GetBookCategoriesError
    });
}

function GetBookCategoriesSuccess(data, status) {

    BookCategories = JSON.parse(data.d);
}

function GetBookCategoriesError(request, status, error) {
    alert(request.statusText);
}
