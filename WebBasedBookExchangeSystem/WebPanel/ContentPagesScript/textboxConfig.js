/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jquery.inputValue.js" />



$(function () {
    $('.textEntry').inputValue({ allow: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' });
    $('.usertextEntry').inputValue({ allow: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890' });
    $('.textEmail').inputEmail();
    $('.textnumeric').inputInteger();
});