/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/json2.js" />
/// <reference path="../../Scripts/jquery.raty.js" />


var topPostContainer = [];

$(function () {
    GetTopPosts();
});

function GetTopPosts() {

    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/TopPosts",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetTopPostsSuccess,
        error: GetTopPostsError
    });
}

function GetTopPostsSuccess(data, status) {

    var jsonData = JSON.parse(data.d);
    for (var i = 0; i < jsonData.length; i++) {
        topPostContainer.push({
            "Book_Id": jsonData[i].Book_Id,
            "Rating": jsonData[i].Rating,
            "CategoryName": jsonData[i].BookDetail[0].CategoryName,
            "BookImageName": jsonData[i].BookDetail[0].BookImageName,
            "Title": jsonData[i].BookDetail[0].Title,
            "Users":jsonData[i].Users,
            "Category_Id": jsonData[i].BookDetail[0].Category_Id
        });
    }


    $.get("../Templates/TopPosts.htm", function (data) {
        
        $.template("cacheTopPostsTemplate", data);
        $('.sidetops').append($.tmpl("cacheTopPostsTemplate", topPostContainer));
        $.getScript("../ContentPagesScript/Rating.js");
    });

}

function GetTopPostsError(request, status, error) {
    alert(request.statusText);
}