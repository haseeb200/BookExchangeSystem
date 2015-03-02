/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/json2.js" />

var reviews = [];

$(function () {

    GetAllComments();
    $('.Comments').click(function () {

        $('#dashboardBox').addClass('animated bounceOut');
        $('#contentContainer').delay(2000).queue(function () {
            $('.loadingCommentImage').show();
            reviews = [];
            GetAllComments();
            $(this).dequeue();
        });
    });
});

function GetAllComments() {
    
    $.ajax({
        type: 'POST',
        url: "../../WebPanel/Service/books.svc/GetAllComments",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetAllCommentsSuccess,
        error: GetAllCommentsError
    });
}

function GetAllCommentsSuccess(data, status) {
   
    var container = JSON.parse(data.d);
    for (var i = 0; i < container.length; i++) {

        reviews.push({
            "BookID": container[i].BookID,
            "BookTitle": container[i].BookTitle[0].Title,
            "Reviews": container[i].Comment,
            "Reviewer": container[i].Reviewers[0].Reviewer
        });
    }

    $.get("../Templates/Comments.htm", function (data) {
        $.template("cacheCommentsTemplate", data);
        $('#contentContainer').delay(3000).queue(function () {
            $('.loadingCommentImage').hide();
            $(this).html('<div class="box animated bounceIn" id="dashboardBox"><h2>Latest Comments</h2><table id="latestComments"></table></div>');
            $('#latestComments').append($.tmpl("cacheCommentsTemplate", reviews));
            $('#latestComments').tablePagination(setOptions());
            $('#tablePagination_prevPage, #tablePagination_lastPage, #tablePagination_nextPage, #tablePagination_firstPage').mouseover(function () {
                $(this).css('cursor', 'pointer');
            });
            MangeLinks();
            $(this).dequeue();
        });


    });

}

function GetAllCommentsError(request, status, error) {
    alert(request.statusText);
}

function setOptions() {
    var options = {
        rowsPerPage: 8,
        optionsForRows: [8, 12],
        firstArrow: (new Image()).src = "../img/first.gif",
        prevArrow: (new Image()).src = "../img/prev.gif",
        lastArrow: (new Image()).src = "../img/last.gif",
        nextArrow: (new Image()).src = "../img/next.gif"
    };
    return options;
}

function MangeLinks() {
    $('a[type=ViewPost], a[type=DeletePost]').hover(function () {
        $(this).css({ 'cursor': 'pointer', 'text-decoration': 'underline' });
    },
        function () {
            $(this).css({ 'text-decoration': 'none' });
        });


    $('a[type=ViewPost]').click(function () {
        window.location.href = "../../WebPanel/ContentPages/BooksLibrary.aspx?bid=" + $(this).attr('class');
    });

    $('a[type=DeletePost]').click(function () {
        $(this).parents('span').parents('p').parents('tr').remove();
        DeleteComment($(this).attr('class'));
    });
}




function DeleteComment(bookId) {
    $.ajax({
        type: 'POST',
        url: "../../WebPanel/Service/books.svc/DeleteComment",
        data: '{"bookId":' + JSON.stringify(bookId) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: DeleteCommentSuccess,
        error: DeleteCommentError
    });
}

function DeleteCommentSuccess(data, status) {
    $.getScript("/WebBasedBookExchangeSystem/AdminPanel/AdminScripts/Glance.js");
}

function DeleteCommentError(request, status, error) {
    alert(request.statusText);
}

