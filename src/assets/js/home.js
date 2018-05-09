$(function() {

    $(window).scroll(function(){
        var sticky = $('.fixed-row'),
        scroll = $(window).scrollTop();

        if (scroll >= 556) sticky.addClass('fixed-header');
        else sticky.removeClass('fixed-header');
    });
    $('.width-responsive').on('scroll', function() {
        var left = $(this).scrollLeft();
        var left = left - 30;
        $('.fixed-header').css('left', -left);
    });  
});