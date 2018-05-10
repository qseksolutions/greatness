$(function() {

    var maintable = $('.main-table').width();
    var fixedcolumn = $('.fixed-column').width();
    var fixedwidth = maintable - fixedcolumn;
    $('.scroll-viewport').css('width',fixedwidth+'px');

    $(window).scroll(function(){
        var sticky = $('.scrollable-row'),
        scroll = $(window).scrollTop();

        if (scroll >= 556) sticky.addClass('fixed-header');
        else sticky.removeClass('fixed-header');
    });
    $('.scroll-viewport').on('scroll', function() {
        var left = $(this).scrollLeft();
        var left = left - 331;
        $('.fixed-header').css('left', -left);
    });  
});

$(window).scroll(function(){
    var sticky = $('.fixed-row'),
    scroll = $(window).scrollTop();

    if (scroll >= 556) sticky.addClass('sticky-header');
    else sticky.removeClass('sticky-header');
});

