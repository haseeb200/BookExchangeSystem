/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/json2.js" />
/// <reference path="../../Scripts/kendo.all.min.js" />

var DataSource;
$(function () {
    $('.Category').click(function () {

        $('#dashboardBox').addClass('animated bounceOut');
        $('.loadingCommentImage').css('display', 'block');
        $('#contentContainer').delay(2000).queue(function () {
            $('.loadingCommentImage').css('display', 'none');
            $(this).empty();
            $(this).html("<div id='dashboardBox' class='animated bounceIn'></div>");
            GetCategoryDataSource();
            CreateCategoryGrid();
           
            $(this).dequeue();
        });
    });
});

function GetCategoryDataSource() {

    DataSource = new kendo.data.DataSource({
        pageSize: 10,
        transport: {
            read: {
                type: "POST",
                url: "../../WebPanel/Service/books.svc/GetAllBookCategories",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            },
            create: {
                type: "POST",
                url: "../../WebPanel/Service/books.svc/AddNewCategory",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                complete: function (e) {

                    $('#dashboardBox').data('kendoGrid').dataSource.read();
                }
            },
            update: {
                type: "POST",
                url: "../../WebPanel/Service/books.svc/UpdateExistingCategory",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            },
            destroy: {
                type: "POST",
                url: "../../WebPanel/Service/books.svc/DeleteCategory",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            },
            parameterMap: function (data, operation) {
                if (operation == "create") {

                    return kendo.stringify({ addCategory: data });

                }

                else if (operation == "destroy") {

                    return kendo.stringify({ deleteCategory: data });
                }


                else if (operation == "update") {

                    return kendo.stringify({ updateCategory: data });
                }
            }

        },

        schema: {
            parse: function (data) {

                return JSON.parse(data.d);

            },
            model: {
                id: "Category_Id",
                fields: {
                    "Category_Id": { type: "number", editable: false, nullable: false },
                    "CategoryName": { type: "string", validation: { required: true} }

                }
            }

        }

    });

}

function CreateCategoryGrid() {
    $('#dashboardBox').kendoGrid({

        filterable: true,
        sortable: true,
        pageable: true,
        scrollable: false,
        toolbar: [{ name: "create", text: "Add new category"}],
        columns: [
                               {
                                   field: "CategoryName",
                                   title: "Category",
                                   width: 100
                               },
                                {
                                    command: ["edit", "destroy"], title: "Action", width: 50
                                }
                            ],

        dataSource: DataSource,
        editable: "popup"

    });
}
    
