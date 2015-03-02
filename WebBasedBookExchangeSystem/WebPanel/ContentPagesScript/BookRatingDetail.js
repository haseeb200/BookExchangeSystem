
/// <reference path="jquery-1.7.1.js" />
/// <reference path="json2.js" />
/// <reference path="jquery.raty.js" />
/// <reference path="BooksLibrary.js" />
/// <reference path="../../Scripts/jquery-ui-1.8.18.js" />
/// <reference path="BookDetail.js" />
/// <reference path="BookReviews.js" />



$(function () {

   
    $('.bars').css({ 'padding-top': '10px', 'padding-left': '25px', 'list-style-type': 'none', 'margin-bottom': '5px' });
    $('.bars li').css('margin-top', '5px');
    $('.insidebars').css({ 'list-style-type': 'none', 'margin-top': '20px' });
    $('.insidebars li').css('margin-top', '9px');
//    $('#welcomePage').hide();
//    $('#welcomePage').delay(3000).queue(function () {
//        $('.image').remove();
//        $('#BookDetailForm').removeClass('loadingframe');
//        $(this).show();
//    });



    //var id = $('.star').attr('id');
    GetBookRatingDetail();


});

function GetBookRatingDetail() {
    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/GetBookRatingDetail",
        data: '{"Book_ID":' + parseInt(BookDetail[0].Book_Id) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetBookRatingDetailSuccess,
        error: GetBookRatingDetailError
    });
}

function GetBookRatingDetailSuccess(data, status) {
   
    var RatingDetail = JSON.parse(data.d);

    $('.star').append('<br /><span class="BookDetailReview" style="font-size: small;margin-left:15px;" type='+BookDetail[0].Book_Id+'>(' + RatingDetail[0].ReviewsCount + ' Customer Reviews)</span>');
    $('.RatingTable tr td.style3').prepend('<span style="padding-left: 20px;"><strong>' + RatingDetail[0].RatingCount + ' User Rate This Book</strong></span>');
    $('.outsidebars').append('<li class="users">' + (RatingDetail[0].Stars_5) + '</li>');
    $('.outsidebars').append('<li class="users">' + (RatingDetail[0].Stars_4) + '</li>');
    $('.outsidebars').append('<li class="users">' + (RatingDetail[0].Stars_3) + '</li>');
    $('.outsidebars').append('<li class="users">' + (RatingDetail[0].Stars_2) + '</li>');
    $('.outsidebars').append('<li class="users">' + (RatingDetail[0].Stars_1) + '</li>');
    $('.outsidebars').css({ 'list-style-type': 'none', 'margin-top': '20px' });
    $('.outsidebars li').css('margin-top', '9px');
    $('.progress1').progressbar({ value: (RatingDetail[0].Stars_5 / RatingDetail[0].RatingCount) * 100 });
    $('.progress2').progressbar({ value: (RatingDetail[0].Stars_4 / RatingDetail[0].RatingCount) * 100 });
    $('.progress3').progressbar({ value: (RatingDetail[0].Stars_3 / RatingDetail[0].RatingCount) * 100 });
    $('.progress4').progressbar({ value: (RatingDetail[0].Stars_2 / RatingDetail[0].RatingCount) * 100 });
    $('.progress5').progressbar({ value: (RatingDetail[0].Stars_1 / RatingDetail[0].RatingCount) * 100 });
    $('.ui-progressbar-value').css({ 'background': 'none repeat scroll 0 0 orange', 'height': '20px', 'text-align': 'left', 'background-color': 'orange' });
    $('.ui-progressbar').css({ 'background': 'none repeat scroll 0 0 #FFF4D9', 'height': '19px', 'text-align': 'left', 'width': '130px', 'background-color': '#FCEDCA' });

    $('.BookDetailReview').hover(function () {
        $(this).css({ 'cursor': 'pointer', 'text-decoration': 'underline' });
    },
    function () {
        $(this).css('text-decoration', 'none');
    });

//    $('.BookDetailReview').click(function () {

//        $('.post').addClass('animated bounceOut');
//        GetBookReviews($(this).attr('type'));
//        setTimeout(function () {
//           
//                $('#left').html('<div class="post" id="post-52">');
//                $('.post').addClass('animated bounceIn');
//                $('.post').html($.tmpl(reviewsTemplate, BookDetail));
//                $('.DateTime').append(date);

//            });
//        }, 2000);
//    });
}

function GetBookRatingDetailError(request, status, error) {
    alert(request.statusText);
}


function moveToBookDetails(firstDiv, secondDiv) {

    var firstDivClass = $(firstDiv).hasClass('animated fadeOutLeftBig');
    var comingFirstDivClass = $(firstDiv).hasClass('animated fadeInLeftBig');
    var comingSecondDivClass = $(secondDiv).hasClass('animated fadeOutRightBig');
    if (!firstDivClass) {
        if (comingFirstDivClass) {
            $(firstDiv).removeClass('animated fadeInLeftBig');
            $(secondDiv).removeClass('animated fadeOutRightBig');
        }
        else if (comingSecondDivClass == true)
            $(secondDiv).removeClass('animated fadeOutRightBig');

        $(firstDiv).removeClass('animated fadeInRightBig');
        $(firstDiv).addClass('animated fadeOutLeftBig');
        $(firstDiv).delay(400).queue(function () {

            $(this).hide();
            $(this).dequeue();
        });
        $.get("BookReview.htm", function (data) {

            $.template("cacheBookReviewTemplate", data);

            //GetBookDetail();


            $(secondDiv).delay(500).queue(function () {
                $(this).html($.tmpl("cacheBookReviewTemplate", BookDetail));
                $.getScript("../../Scripts/BookReviews.js");
                $(secondDiv).show();
                $(secondDiv).addClass('animated fadeInRightBig');

                $('.backReviewButton').click(function () {
                    var pageDiv = $(this).parents().attr('id');

                    moveToBookDetails('#' + $('#' + pageDiv).siblings().next().attr('id'), '#' + pageDiv);
                });

                $(this).dequeue();
            });


        });
    }

    else {

        $(firstDiv).removeClass('animated fadeOutLeftBig');
        $(secondDiv).removeClass('animated fadeInRightBig');
        $(secondDiv).addClass('animated fadeOutRightBig');
        $(secondDiv).delay(400).queue(function () {
            $(secondDiv).hide();
            $(firstDiv).show();
            $(firstDiv).addClass('animated fadeInLeftBig');
            $(this).dequeue();
        });
    }
}


