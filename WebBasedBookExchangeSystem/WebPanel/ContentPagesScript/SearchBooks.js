/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/kendo.all.min.js" />
/// <reference path="../../Scripts/json2.js" />
/// <reference path="../../Scripts/jquery.inputValue.js" />

var autoComplete;

$(function () {

    //autocomplete = $("titles").data("kendoAutoComplete");

   

    autoComplete = $('#titles').kendoAutoComplete({
        minLength: 3,
        dataTextField: "Title",
        select: function (e) {
            debugger;
            var container = e.item[0].outerHTML;
            var bid = $(container).find('span').attr('class');
            document.location.href = "BooksLibrary.aspx?bid=" + bid;
        },
        template: '<img src="../../BookImages/${BookImageName}" alt="${Title}" />' +
                                  '<h3>' +
                                      '${Title} ' +
                                      '<span class="${Book_Id}">Price: ${Price} Rs</span>' +
                                  '</h3>',
        dataSource: {

            transport: {
                read: {
                    type: "POST",
                    url: "../Service/books.svc/SearchBooks",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
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
                        "BookImageName": { type: "string" },
                        "Price": { type: "number" }
                    }
                }
            }

        }
    });

    $('#titles').inputLetter();

});