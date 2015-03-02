/// <reference path="jquery-1.7.1.js" />
/// <reference path="json2.js" />
/// <reference path="../animate-custom.css" />





$(function () {

    var user = $('#userLabel').val();

    var id = $('button[title=MyWish]').attr('type');


    if (user != "")
        UserWishListContainer(user, id);

    else
        $('button[title=MyWish]').css('display', 'none');


    $('button[title=MyWish]').click(function () {
        MyWishList(user, $(this).attr('type'));

        $(this).animate({
            "margin-left": "-150px"
        }, "slow", function () {
            $(this).hide();
        });



        return false;
    });

});


function MyWishList(user, Book_ID) {
    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/MyWishList",
        data: '{"user":' + JSON.stringify(user) + ',"ID":' + JSON.stringify(Book_ID) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MyWishListSuccess,
        error: MyWishListError
    });
}

function MyWishListSuccess(data, status) {

}

function MyWishListError(request, status, error) {
    alert(request.statusText);
}


function UserWishListContainer(user, id) {
    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/UserWishListContainer",
        data: '{"user":' + JSON.stringify(user) + ',"ID":' + JSON.stringify(id) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: UserWishListContainerSuccess,
        error: UserWishListContainerError
    });
}

function UserWishListContainerSuccess(data, status) {
    if (data.d != "null")
        $('button[title=MyWish]').css('display', 'none');
}

function UserWishListContainerError(request, status, error) {
    alert(request.statusText);
}

