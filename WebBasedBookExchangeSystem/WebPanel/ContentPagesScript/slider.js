/// <reference path="../../Scripts/jquery-1.7.1.js" />
/// <reference path="../../Scripts/jQuery.tmpl.js" />
/// <reference path="../../Scripts/json2.js" />


var sliderContainer;
$(function () {
    GenerateSlider();

});

function GenerateSlider() {

    $.ajax({
        type: 'POST',
        url: "../Service/books.svc/Slider",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GenerateSliderSuccess,
        error: GenerateSliderError
    });
}

function GenerateSliderSuccess(data, status) {

    sliderContainer = JSON.parse(data.d);
    
    $.get("../Templates/slider.htm", function (data) {
        $.template("cacheSliderTemplate", data);
        $('#carousel').append($.tmpl("cacheSliderTemplate", sliderContainer));
        $.getScript("../js/jquery.carouFredSel-5.5.0.js");
        $.getScript("../js/custom.js");
    });
}

function GenerateSliderError(request, status, error) {
    alert(request.statusText);
}