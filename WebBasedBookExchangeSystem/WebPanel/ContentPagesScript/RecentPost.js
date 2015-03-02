/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/json2.js" />
/// <reference path="../../Scripts/jquery.nailthumb.1.1.js" />

var postContainer;

$(function () {
    GetRecentPost();
});

function GetRecentPost() {

    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/RecentPost",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetRecentPostSuccess,
        error: GetRecentPostError
    });
}

function GetRecentPostSuccess(data, status) {

    postContainer = JSON.parse(data.d);
    
    for (var i = 0; i < postContainer.length ; i++) {
        postContainer[i].Description = strip(postContainer[i].Description);
    }
    
    $.get("../Templates/RecentPost.htm", function (data) {
        $.template("cacheRecentPostTemplate", data);
        $('#home-content').append($.tmpl("cacheRecentPostTemplate", postContainer));
       
    });

}

function GetRecentPostError(request, status, error) {
    alert(request.statusText);
}

function strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText;
}
