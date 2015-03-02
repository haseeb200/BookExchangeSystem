/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/json2.js" />
/// <reference path="../../Scripts/moment.js" />


var reviewsContainer = [];

$(function () {
    GetRecentReviews();
});

function GetRecentReviews() {

    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/RecentReviews",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetRecentReviewsSuccess,
        error: GetRecentReviewsError
    });
}

function GetRecentReviewsSuccess(data, status) {
   
    var jsonData = JSON.parse(data.d);

    for (var i = 0; i < jsonData.length; i++) {
        var date = moment(jsonData[i].DateTime).format('dddd, MMMM Do YYYY');
        reviewsContainer.push({
            "Book_Id": jsonData[i].Book_Id,
            "User_Id":jsonData[i].User_Id,
            "UserName": jsonData[i].UserName,
            "Category_Id":jsonData[i].Category_Id,
            "CategoryName": jsonData[i].CategoryName,
            "Title": jsonData[i].Title,
            "BookImageName": jsonData[i].BookImageName,
            "Comment": jsonData[i].Comment,
            "DateTime": date
        });
    }
    
    $.get("../Templates/RecentReviews.htm", function (data) {
        $.template("cacheRecentReviewsTemplate", data);
        $('.siderevs').append($.tmpl("cacheRecentReviewsTemplate", reviewsContainer));

    });

}

function GetRecentReviewsError(request, status, error) {
    alert(request.statusText);
}