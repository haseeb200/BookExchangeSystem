/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/json2.js" />

var summary = [], container;
$(function () {

  
    GetSummary();

});

function GetSummary() {

    $.ajax({
        type: 'POST',
        url: "../../WebPanel/Service/books.svc/GetSummary",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetSummarySuccess,
        error: GetSummaryError
    });
}

function GetSummarySuccess(data, status) {
    
    $('.countPost').empty();
    $('.countUser').empty();
    container = JSON.parse(data.d);
    var unApprovedUsers = container[0].UnApprovedUsers[0];
    var unApprovedBooks = container[0].BooksUnApproved[0];
    var comments = container[0].TotalComments[0];
    debugger;
    if (unApprovedUsers == null && unApprovedBooks == null && comments == null)
        BindSummary(0, 0, 0);

    else if (unApprovedUsers == null && comments == null)
        BindSummary(0, unApprovedBooks.UnApprovedBook, comments.Comments);

    else if (unApprovedBooks == null && comments == null)
        BindSummary(unApprovedUsers.UnApproved, 0, 0);

    else if (unApprovedUsers == null && unApprovedBooks == null)
        BindSummary(0, 0, comments.Comments);

    else if (unApprovedBooks == null)
        BindSummary(unApprovedUsers.UnApproved, 0, comments.Comments);

    else if (unApprovedUsers == null)
        BindSummary(0, unApprovedBooks.UnApprovedBook, comments.Comments);

    else if (comments == null)
        BindSummary(unApprovedUsers.UnApproved, unApprovedBooks.UnApprovedBook, 0);

    else
        BindSummary(unApprovedUsers.UnApproved, unApprovedBooks.UnApprovedBook, comments.Comments);


    $.get("../Templates/Glance.htm", function (data) {
        $.template("cacheGlanceTemplate", data);
        $('#glance').empty();
        $('#glance').append('<img src="../img/load.gif" width="20px" height="20px" style="left:110px; position:relative" />');
        $('#glance').delay(2000).queue(function () {
            $(this).empty();
            $(this).append($.tmpl("cacheGlanceTemplate", summary));
            $(this).dequeue();
        });
    });
}


function GetSummaryError(request, status, error) {
    alert(request.statusText);
}

function BindSummary(unApprovedUsers, unApprovedBooks, comments) {
    $('.countPost').append('(' + unApprovedBooks + ')');
    $('.countUser').append('(' + unApprovedUsers + ')');
    summary.push({
        "ApprovedUsers": container[0].ApprovedUsers,
        "UnApprovedUsers": unApprovedUsers,
        "BooksApproved": container[0].BooksApproved[0].ApprovedBook,
        "BooksUnApproved": unApprovedBooks,
        "Comments": comments
    });
}