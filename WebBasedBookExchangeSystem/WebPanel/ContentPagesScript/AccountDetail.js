
/// <reference path="jquery-1.7.1.js" />
/// <reference path="json2.js" />


$(function () {

    $('#UpdateButton').mouseenter(function () {
        $(this).css('cursor', 'pointer');
    });

    GetAccountDetail();
    $('#UpdateButton').click(function () {
        
        var UpdateAccount = new Object();
        UpdateAccount.FirstName = $('#FirstNameTextBox').val();
        UpdateAccount.LastName = $('#LastNameTextBox').val();
        UpdateAccount.EmailAddress = $('#EmailAddressTextBox').val();
        UpdateAccount.CellPhone = $('#CellPhoneTextBox').val();
        UpdateAccountDetail(UpdateAccount);
        return false;
    });
});

function GetAccountDetail() {
    $.ajax({
        type: 'POST',
        url: "../../WebService.asmx/GetAccountDetail",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetAccountDetailSuccess,
        error: GetAccountDetailError
    });
}

function GetAccountDetailSuccess(data, status) {
    var AccountDetailContainer = JSON.parse(data.d);
    $('#FirstNameTextBox').val(AccountDetailContainer[0].FirstName);
    $('#LastNameTextBox').val(AccountDetailContainer[0].LastName);
    $('#EmailAddressTextBox').val(AccountDetailContainer[0].EmailAddress);
    $('#CountryTextBox').val(AccountDetailContainer[0].Country);
    $('#CityTextBox').val(AccountDetailContainer[0].City);
    $('#CellPhoneTextBox').val(AccountDetailContainer[0].CellPhone);
    $('#CountryTextBox').attr('readonly', true);
    $('#CityTextBox').attr('readonly', true);

}

function GetAccountDetailError(request, status, error) {
    alert(request.statusText);
}


function UpdateAccountDetail(UpdateAccount) {
    $.ajax({
        type: 'POST',
        url: "../../WebService.asmx/UpdateAccountDetail",
        data: "{'UpdateAccount':" + JSON.stringify(UpdateAccount) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: UpdateAccountDetailSuccess,
        error: UpdateAccountDetailError
    });
}

function UpdateAccountDetailSuccess(data, status) {
    window.location.href = "AccountDetail.aspx";

}

function UpdateAccountDetailError(request, status, error) {
    alert(request.statusText);
}