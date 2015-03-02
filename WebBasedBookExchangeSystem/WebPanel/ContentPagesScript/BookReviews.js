/// <reference path="jquery-1.7.1.js" />
/// <reference path="json2.js" />
/// <reference path="BooksLibrary.js" />


//var user = null;

$(function () {

  //  user = $('#userLabel').val();
    var txt;
    //    $('#welcomePage').hide();
    //    $('#welcomePage').delay(3000).queue(function () {
    //        $('.image').remove();
    //        $('#BookDetailForm').removeClass('loadingframe');
    //        $(this).show();
    //    });

    $('#SubmitButton').mouseover(function () {
        $(this).css('cursor', 'pointer');
    });
    $('#SubmitButton').css({ 'position': 'relative', 'margin-left': '170px', 'margin-top': '10px' });

    //var CurrentBook_ID = $('.SelectedBook').val();

    // GetBookReviews(BookID);

   
});


function PostBookReviews(BookReviews,user) {
    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/PostBookReviews",
        data: '{"postBookReviews":' + JSON.stringify(BookReviews) +',"user":'+JSON.stringify(user)+ '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: PostBookReviewsSuccess,
        error: PostBookReviewsError
    });
}

function PostBookReviewsSuccess(data, status) {
    if (data.d == "not success") {
        alert("you have to login first");
    }
    else {
        var BookReviewsContainer = JSON.parse(data.d);


        $('.ReviewsContainer').append('<br /><img src="/WebBasedBookExchangeSystem/WebPanel/images/user.png" /><span class="ReviewInfo"><strong>' + "  " + BookReviewsContainer[0].Name + ' says: ' + "on " + BookReviewsContainer[0].DateTimes + '</strong></span><div class="UserCommnets" style="padding-left:30px;padding-top:10px;color:darkred">' + BookReviewsContainer[0].Reviews + '</div>');
        $('.ReviewInfo').css('color', 'blue');
        $('#MessageTextBox').val('');
    }
}

function PostBookReviewsError(request, status, error) {
    alert(request.statusText);
}


function ErrorMessage() {
    var source = "../ContentPages/BookReviews.aspx.htm";
    var width = 180;
    var align = "center";
    var top = 100;
    var padding = 10;
    var backgroundColor = "#FFFFFF";
    var borderColor = "#000000";
    var borderWeight = 4;
    var borderRadius = 5;
    var fadeOutTime = 300;
    var disableColor = "#666666";
    var disableOpacity = 40;
    var loadingImage = "../images/loading.gif";

    //This method initialises the modal popup


    modalPopup(align,
		    top,
		    width,
		    padding,
		    disableColor,
		    disableOpacity,
		    backgroundColor,
		    borderColor,
		    borderWeight,
		    borderRadius,
		    fadeOutTime,
		    source,
		    loadingImage);



    //This method hides the popup when the escape key is pressed
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            closePopup(fadeOutTime);
        }
    });
}



/*-----------------------------------------------------------------------GET ALL BOOKS REVEIWS-----------------------------------------------------------------*/

function GetBookReviews() {
   
    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/GetBookReviews",
        data: '{"Book_ID":' + parseInt(BookID) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetBookReviewsSuccess,
        error: GetBookReviewsError
    });
}

function GetBookReviewsSuccess(data, status) {

    var BookReviewsContainer = JSON.parse(data.d);
    $('.commentsHeader').append('(' + BookReviewsContainer.length + ')');
    
    for (var i = 0; i < BookReviewsContainer.length; i++) {
        $('.ReviewsContainer').append('<br /><img src="/WebBasedBookExchangeSystem/WebPanel/images/user.png" /><span class="ReviewInfo"><strong>' + "  " + BookReviewsContainer[i].Name + ' says: ' + "on " + BookReviewsContainer[i].DateTimes + '</strong></span><div class="UserCommnets" style="padding-left:30px;padding-top:10px;color:darkred">' + BookReviewsContainer[i].Reviews + '</div>');
        $('.ReviewInfo').css('color', 'blue');
    }
}

function GetBookReviewsError(request, status, error) {
    alert(request.statusText);
}