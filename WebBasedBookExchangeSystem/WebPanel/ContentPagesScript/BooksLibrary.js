/// <reference path="jquery-1.7.1.js" />
/// <reference path="../WebPanel/css/animate-custom.css" />
/// <reference path="rwQueryString-1.0.jquery.min.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="BookDetail.js" />
/// <reference path="../../Scripts/rwQueryString-1.0.jquery.min.js" />
/// <reference path="../../Scripts/jquery.blockUI.js" />





var BookDetail, bid = "", uid = "", dataSource, method, detailTemplate, categoryTemplate, reviewsTemplate;



$(function () {


    //    $.get("../Templates/BookDetail.htm", function (data) {
    //        detailTemplate = $.template("cacheBookDetailTemplate", data);
    //    });

    //    $.get("../Templates/BooksCategories.htm", function (data) {
    //        categoryTemplate = $.template("cacheBooksCategoriesTemplate", data);

    //    });

    //    $.get("../Templates/BookReviews.htm", function (data) {
    //        reviewsTemplate = $.template("cacheBookReviewsTemplate", data);
    //    });


    bid = $.readQS('bid');

    if (uid == "")
        uid = $.readQS('uid');

    if (cid == "")
        cid = $.readQS('cid');


    if (bid == "" && cid == "" && uid == "") {
        
        method = "AllBooks";
        BindListView();

    }

    else if (cid != "") {
        
        method = "BookCategory";
        BindListView();
    }

    else if (uid != "") {
        
        method = "UserPost";
        BindListView();
    }

    

    else if (bid != "") {
        
        BookID = bid;
        GetBookCategories();
        GetBookDetail();

    }



});

function BindListView() {

    $('#pageContent').html('<div id="casing" class="animated fadeInRightBig"></div><div class="clear"> </div><div id="navigation" class="k-pager-wrap"></div>');

    dataSource = new kendo.data.DataSource({

        transport: {
            read: {
                type: "POST",
                url: "../Service/books.svc/" + method,
                contentType: "application/json; charset=utf-8",
                dataType: "json"

            },
            parameterMap: function (data, operation) {

                if (operation == "read" && cid != "") {

                    return kendo.stringify({ category: cid });
                }

                else if (operation == "read" && uid != "") {
                    return kendo.stringify({ UserID: uid });
                }
            }
        },

        schema: {

            parse: function (data) {
                return JSON.parse(data.d);
            }
        },
        pageSize: 10
    });

    $("#navigation").kendoPager({
        dataSource: dataSource,
        change: function (e) {

            $('.k-button').click(function () {
                BookID = $(this).attr('type');

                GetBookCategories();
                GetBookDetail();
                return false;
                //moveToBookDetail('#example', '#' + $('#example').siblings().attr('id'));
            });
        }
    });

    $("#casing").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html())

    });
}









//function GetBookDetail() {

//    $.ajax({
//        type: 'POST',
//        url: "../../books.svc/GetBookDetail",
//        data: '{"BookID":' + JSON.stringify(BookID) + '}',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: GetBookDetailSuccess,
//        error: GetBookDetailError
//    });
//}

//function GetBookDetailSuccess(data, status) {
//    BookDetail = JSON.parse(data.d);
//}

//function GetBookDetailError(request, status, error) {
//    alert(request.statusText);
//}



function moveToBookDetail(firstDiv, secondDiv) {

    var firstDivClass = $(firstDiv).hasClass('animated fadeOutLeftBig');
    var comingFirstDivClass = $(firstDiv).hasClass('animated fadeInLeftBig');
    if (!firstDivClass) {
        if (comingFirstDivClass) {
            $(firstDiv).removeClass('animated fadeInLeftBig');
            $(secondDiv).removeClass('animated fadeOutRightBig');
            $(secondDiv).removeClass('animated fadeInLeftBig');
        }
        $(firstDiv).addClass('animated fadeOutLeftBig');
        $(firstDiv).delay(400).queue(function () {

            $(this).hide();
            $(this).dequeue();
        });
        //AppendDetail(secondDiv);
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

//function AppendDetail(secondDiv) {
//    $.get("BooksLibrary.htm", function (data) {

//        $.template("cacheBookDetailTemplate", data);

//        GetBookDetail();


//        $(secondDiv).delay(500).queue(function () {
//            $(this).html($.tmpl("cacheBookDetailTemplate", BookDetail));
//            $('.bookDescription').html(BookDetail[0].Description);
//            $.getScript("../../Scripts/jquery.raty.min.js");
//            $.getScript("../../Scripts/Rating.js");
//            $.getScript("../../Scripts/BookRatingDetail.js");
//            $.getScript("../../Scripts/WishList.js");
//            $(secondDiv).show();
//            $(secondDiv).addClass('animated fadeInRightBig');

//            $('.backButton').click(function () {
//                var pageDiv = $(this).parents().attr('id');
//                moveToBookDetail('#' + $('#' + pageDiv).siblings().attr('id'), '#' + pageDiv);
//            });
//            if (bid != "")
//                $('.backButton').css('display', 'none');

//            $(this).dequeue();
//        });

//    });
//}-->