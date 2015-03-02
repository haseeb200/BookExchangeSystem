/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jquery.jscroll.js" />


$(function () {

    if ($('#userLabel').val() == '') {
        $('#topbar').css('display', 'block');
        $('#topbar').jScroll();
    }

    $('.cross').click(function () {
        $('#topbar').css('display', 'none');
        return false;
    });

});