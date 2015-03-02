/// <reference path="../Scripts/jquery-1.7.1.js" />
/// <reference path="../Scripts/json2.js" />
/// <reference path="../../Scripts/kendo.all.min.js" />


var DataSource, method;

$(function () {

    $('.ViewAllUsers').click(function () {

        $('#dashboardBox').addClass('animated bounceOut');
        $('.loadingCommentImage').css('display', 'block');
        $('#contentContainer').delay(2000).queue(function () {
            $('.loadingCommentImage').css('display', 'none');
            $(this).empty();
            method = "RegisteredUsers";
            $(this).html("<div id='dashboardBox' class='animated bounceIn'></div>");
            
            GetUserDataSource();
            CreateUserGrid();
            
            $(this).dequeue();
        });

    });

    $('.PendingUsers').click(function () {
        $('#dashboardBox').addClass('animated bounceOut');
        $('.loadingCommentImage').css('display', 'block');
        $('#contentContainer').delay(2000).queue(function () {
            $('.loadingCommentImage').css('display', 'none');
            $(this).empty();
            method = "UnRegisteredUsers";
            $(this).html("<div id='dashboardBox' class='animated bounceIn'></div>");
            GetUserDataSource();
            CreatePendingUserGrid();
           
            $(this).dequeue();
            $('#dashboardBox').on("click", ".k-grid-Approve", function () {
                $(this).parent().parent().hide();
//                $.getScript("/WebBasedBookExchangeSystem/AdminPanel/AdminScripts/Glance.js");
                var uid = $(this).parent().parent().attr('data-uid');
               
                ApproveUser(DataSource.getByUid(uid).UserID);
                
            });

        });
    });
});

function GetUserDataSource() {

    DataSource = new kendo.data.DataSource({
        pageSize: 10,
       
        transport: {
            read: {
                type: "POST",
                url: "../../WebPanel/Service/books.svc/" + method,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            },
            destroy: {
                type: "POST",
                url: "../../WebPanel/Service/books.svc/DeleteUser",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                complete: function () {
                    $.getScript("/WebBasedBookExchangeSystem/AdminPanel/AdminScripts/Glance.js");
                }
            },
            parameterMap: function (data, operation) {

                if (operation == "destroy") {
                    return kendo.stringify({ userId: data.UserID });
                }
            }

        },

        schema: {
            parse: function (data) {

                return JSON.parse(data.d);

            },
            model: {
                id: "UserID",
                fields: {
                    "UserID": { type: "number", editable: false, nullable: false },
                    "FullName": { type: "string", validation: { required: true} },
                    "EmailAddress": { type: "string", validation: { required: true} },
                    "Gender": { type: "string", validation: { required: true} },
                    "RegisteredDate": { type: "date" }

                }
            }

        }

    });

}

function CreateUserGrid() {
    $('#dashboardBox').kendoGrid({

        filterable: true,
        sortable: true,
        pageable: true,
        scrollable: false,
        columns: [
                               {
                                   field: "FullName",
                                   title: "User Name",
                                   width: 100
                               }, {
                                   field: "EmailAddress",
                                   title: "EmailAddress",
                                   width: 100
                               }, {
                                   field: "Gender",
                                   title: "Gender",
                                   width: 100
                               }, {
                                   field: "RegisteredDate",
                                   filterable: false,
                                   width: 100,
                                   title: "Registered",
                                   template: '#= kendo.toString(RegisteredDate,"MM/dd/yyyy") #'
                               }, {

                                   command: ["destroy"], title: "Action", width: 50
                               }
                            ],
        dataSource: DataSource,
        editable: "popup"
    });
}

function CreatePendingUserGrid() {
    $('#dashboardBox').kendoGrid({

        filterable: true,
        sortable: true,
        pageable: true,
        scrollable: false,
        columns: [
                               {
                                   field: "FullName",
                                   title: "User Name",
                                   width: 100
                               }, {
                                   field: "EmailAddress",
                                   title: "EmailAddress",
                                   width: 100
                               }, {
                                   field: "Gender",
                                   title: "Gender",
                                   width: 100
                               }, {
                                   field: "RegisteredDate",
                                   filterable: false,
                                   width: 100,
                                   title: "Registered",
                                   template: '#= kendo.toString(RegisteredDate,"MM/dd/yyyy") #'
                               }, {

                                   command: ["Approve", "destroy"], title: "Action", width: 50
                               }
                            ],
        
        dataSource: DataSource,
        editable: "popup"

    });
}

function ApproveUser(userId) {

    $.ajax({
        type: "POST",
        url: "../../WebPanel/Service/books.svc/ApproveUser",
        data: '{"userId":' + parseInt(userId) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ApproveUserSuccess,
        error: ApproveUserFail
    });
}


function ApproveUserSuccess(data, status) {
    $.getScript("/WebBasedBookExchangeSystem/AdminPanel/AdminScripts/Glance.js");
}


function ApproveUserFail(request, status, error) {
    alert(request.statusText);
}