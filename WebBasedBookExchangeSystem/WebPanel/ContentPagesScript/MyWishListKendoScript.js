/// <reference path="jquery-1.7.1.js" />
/// <reference path="json2.js" />
/// <reference path="kendo.all.min.js" />


var DataSource, UserName;

$(function () {

    UserName = $('#userLabel').val();

    $('.wishlist').click(function () {

        $('#content').addClass('animated bounceOut');
        setTimeout(function () {
            $('#left').html('<div id="content" class="animated bounceIn"></div>');
            GetWishListDataSource();
            CreateWishListGrid();
            $('#content').on("click", ".k-grid-ViewDetail", function () {
               
                var uid = $(this).parent().parent().attr('data-uid');
                document.location.href = "BooksLibrary.aspx?bid=" + DataSource.getByUid(uid).Book_Id;
                
            });
        }, 1000);

    });


});


function GetWishListDataSource() {

    DataSource = new kendo.data.DataSource({
        pageSize: 10,
        change: function (e) {
            var records = DataSource.total();
            if (records > 0)
                $('#grid').css('display', 'block');
        },
        transport: {
            read: {
                type: "POST",
                url: "../Service/books.svc/GetUserWishList",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            },
            destroy: {
                type: "POST",
                url: "../Service/books.svc/DeleteUserWishList",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            },
            parameterMap: function (data, operation) {
                if (operation == "destroy")
                    return kendo.stringify({ deleteBook: data });
                else if (operation == "read")
                    return kendo.stringify({ user: UserName });
            }
        },

        schema: {

            parse: function (data) {

                return JSON.parse(data.d);

            },
            model: {
                id: "Book_Id",
                fields: {
                    "Book_Id": { type: "number" },
                    "Title": { type: "string" },
                    "ISBN": { type: "string" },
                    "Author": { type: "string" },
                    "Price": { type: "number" }
                }
            }
        }
    });

    DataSource.read();
}

function CreateWishListGrid() {

    $('#content').kendoGrid({

        filterable: true,
        sortable: true,
        pageable: true,
        scrollable: false,
        editable: "popup",
        columns: [
                    { field: "ISBN", filterable: false, width: 50, title: "ISBN NO" },
                    { field: "Title", title: "Book Title", width: 180 },
                    { field: "Author", filterable: false, width: 180, title: "Book Author" },
                    { field: "Price", filterable: false, width: 50, title: "Price (Rs)" },
                    { command: ["ViewDetail", "destroy"], title: "Action", width: 5 }
                 ],

        dataSource: DataSource

    });
}