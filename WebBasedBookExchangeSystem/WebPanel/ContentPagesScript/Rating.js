
/// <reference path="jquery-1.7.1.js" />
/// <reference path="jquery.raty.js" />
/// <reference path="Scripts/jquery-1.7.1-vsdoc.js" />
/// <reference path="json2.js" />








var user = null;

$(function () {

    user = $('#userLabel').val();

    GetBooksRating();               //GET ALL BOOKS RATING FROM DB!!!


});




/*---------------------------------------------------------ALL BOOKS RATING INFORMATION--------------------------------------------------------------*/



function BookRatingInfoContainer(BookRatingInfo) {

    $('.star').raty({
        start: function () {

            var id = $(this).attr('id');

            for (var i = 0; i < BookRatingInfo.length; i++) {
                if (id == BookRatingInfo[i].Book_ID) {
                    return BookRatingInfo[i].Rating;
                }
            }
        },
        readOnly: true,
        size: 24,
        starHalf: '../../images/star-half.png',
        starOff: '../../images/star-off.png',
        starOn: '../../images/star-on.png',
        click: function (score, evt) {
            var book_id = $(this).attr('id');
            UserRateBook(score, book_id);
        }
    });

    GetCurrentUserRatedBooks();
}


/*--------------------X--------------------X--------------------X--------------------X--------------------X--------------------X------------------ X--*/







/*---------------------------------------------------------CURRENT USER ALL BOOKS RATING INFORMATION--------------------------------------------------*/



function CurrentUserRatedBooksInfoContainer(CurrentUserRatedBooksInfo) {
    //debugger;
    //alert(CurrentUserRatedBooksInfo);
    debugger;

    if (CurrentUserRatedBooksInfo == "" && user == "") {
      
        $('.star').raty('readOnly', true);
    }

    else if (CurrentUserRatedBooksInfo == "" && user!="") {
        //alert(CurrentUserRatedBooksInfo);
        $('.star').raty('readOnly', false);
    }
    //if (CurrentUserRatedBooksInfo != null) {
    //        alert(CurrentUserRatedBooksInfo);
    else if (CurrentUserRatedBooksInfo != null) {
        //alert(CurrentUserRatedBooksInfo);
        $('.star').raty('readOnly', false);
        for (var i = 0; i < CurrentUserRatedBooksInfo[0].UserBook_ID.length; i++) {
            $('#' + CurrentUserRatedBooksInfo[0].UserBook_ID[i]).raty('readOnly', true);
        }
    }
}


/*--------------------X--------------------X--------------------X--------------------X--------------------X--------------------X--------------------X--*/






/*---------------------------------------------------------GET ALL BOOKS RATING FROM DATABASE----------------------------------------------------------*/


function GetBooksRating() {

    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/GetBooksRating",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetBooksRatingSuccess,
        error: GetBooksRatingError
    });
}

function GetBooksRatingSuccess(data, status) {

    var BookRatingInfo = JSON.parse(data.d);
    BookRatingInfoContainer(BookRatingInfo);

}

function GetBooksRatingError(request, status, error) {
    alert(request.statusText);
}


/*--------------------X--------------------X--------------------X--------------------X--------------------X--------------------X--------------------X--*/







/*---------------------------------------------------------CURRENT USER RATE BOOKS--------------------------------------------------------------------*/


function UserRateBook(score, book_id) {

    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/UserRateBook",
        data: '{"score":' + parseInt(score) + ',"ratedBookId":' + parseInt(book_id) + ',"user":' + JSON.stringify(user) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: UserRateBookSuccess,
        error: UserRateBookError
    });
}

function UserRateBookSuccess(data, status) {
    $('#' + data.d).raty('readOnly', true);
}

function UserRateBookError(request, status, error) {
    alert(request.statusText);
}



/*--------------------X--------------------X--------------------X--------------------X--------------------X--------------------X--------------------X--*/










/*---------------------------------------------------------GET CURRENT LOGIN USER BOOKS RATED INFORMATION------------------------------------------------*/

function GetCurrentUserRatedBooks() {

    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/GetCurrentUserRatedBooks",
        data: '{"user":' + JSON.stringify(user) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetCurrentUserRatedBooksSuccess,
        error: GetCurrentUserRatedBooksError
    });
}

function GetCurrentUserRatedBooksSuccess(data, status) {
    var CurrentUserRatedBooksInfo = JSON.parse(data.d);
    CurrentUserRatedBooksInfoContainer(CurrentUserRatedBooksInfo);
}

function GetCurrentUserRatedBooksError(request, status, error) {
    alert(request.statusText);
}


/*--------------------X--------------------X--------------------X--------------------X--------------------X--------------------X--------------------X--*/