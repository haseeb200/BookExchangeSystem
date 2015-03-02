/// <reference path="../Scripts/jquery-1.7.1.js" />
/// <reference path="../Scripts/json2.js" />
/// <reference path="../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/kendo.all.min.js" />




var DataSource, method, divTemplate, managePostMethod;

$(function () {


    $('.ViewAllPost').click(function () {

        $('#dashboardBox').addClass('animated bounceOut');
        $('.loadingCommentImage').css('display', 'block');
        $('#contentContainer').delay(2000).queue(function () {
            $('.loadingCommentImage').css('display', 'none');
            $(this).empty();
            method = "ViewAllPost";
            divTemplate = $('#AllPostTemplate');
            $(this).html("<div id='dashboardBox' class='animated bounceIn'></div>");
            GetPostDataSource();
            CreatePostGrid();
            $(this).dequeue();
            $('#dashboardBox').on("click", ".k-grid-delete", function () {
                var id = $(this).attr('data-id');
                managePostMethod = "DeletePost";
		$.getScript("/WebBasedBookExchangeSystem/AdminPanel/AdminScripts/Glance.js");
                ManagePost(id);
            });
            $('#dashboardBox').on("click", ".k-viewpost-grid", function () {
                window.location.href = "../../WebPanel/ContentPages/BooksLibrary.aspx?bid=" + $(this).attr('data-id');
            });
        });

    });

    $('.PendingPost').click(function () {
        $('#dashboardBox').addClass('animated bounceOut');
        $('.loadingCommentImage').css('display', 'block');
        $('#contentContainer').delay(2000).queue(function () {
            $('.loadingCommentImage').css('display', 'none');
            $(this).empty();
            method = "PendingPost";
            divTemplate = $('#PendingPostTemplate');
            $(this).html("<div id='dashboardBox' class='animated bounceIn'></div>");
            GetPostDataSource();
            CreatePostGrid();
           
            $(this).dequeue();
            $('#dashboardBox').on("click", ".k-grid-delete", function () {
                var id = $(this).attr('data-id');
                managePostMethod = "DeletePost";
                $.getScript("/WebBasedBookExchangeSystem/AdminPanel/AdminScripts/Glance.js");
                ManagePost(id);
                
            });
            $('#dashboardBox').on("click", ".k-viewpost-grid", function () {
                window.location.href = "../../WebPanel/ContentPages/BooksLibrary.aspx?bid=" + $(this).attr('data-id');
            });

            $('#dashboardBox').on("click", ".k-publish-grid", function () {
                $(this).parent().parent().hide();
//                $.getScript("/WebBasedBookExchangeSystem/AdminPanel/AdminScripts/Glance.js");
                var id = $(this).attr('data-id');
                managePostMethod = "PublishPost";
                ManagePost(id);
                
            });
        });
    });
});




function GetPostDataSource() {

    DataSource = new kendo.data.DataSource({
        pageSize: 10,
        
        transport: {
            read: {
                type: "POST",
                url: "../../WebPanel/Service/books.svc/" + method,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
                
            }
        },

        schema: {

            parse: function (data) {
                return JSON.parse(data.d);

            },
            model: {
                id: "Book_Id"

            }
        }

    });

    DataSource.read();
}

function CreatePostGrid() {
    $('#dashboardBox').kendoGrid({

        pageable: true,
        scrollable: false,
        editable: "popup",
        columns: [
        "Book Cover",
            "Title",
            "Posted By",
            "Action"

        ],

        dataSource: DataSource,
        rowTemplate: kendo.template($(divTemplate).html())


    });
}


function ManagePost(bookId) {

    $.ajax({
        type: "POST",
        url: "../../WebPanel/Service/books.svc/" + managePostMethod,
        data: '{"bookId":' + parseInt(bookId) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ManagePostSuccess,
        error: ManagePostFail
    });
}


function ManagePostSuccess(data, status) {
    $.getScript("/WebBasedBookExchangeSystem/AdminPanel/AdminScripts/Glance.js");
}


function ManagePostFail(request, status, error) {
    alert(request.statusText);
}