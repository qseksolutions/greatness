setTimeout(function(){ 
    var maintable = $('.main-table').width();
    var fixedcolumn = $('.fixed-column').width();
    var fixedwidth = maintable - fixedcolumn;
    $('.scroll-viewport').css('width',fixedwidth+'px');

    $(window).scroll(function(){
        var sticky = $('.header-fix'),
        scroll = $(window).scrollTop();
        var scrolldiv = $('.scrollable-row');
        if (scroll >= 556) {
            scrolldiv.addClass('fixed-scroll');
            sticky.addClass('fixed-header');
            // sticky.removeClass('notfixed-header');
        }
        else {
            // sticky.addClass('notfixed-header');
            scrolldiv.removeClass('fixed-scroll');
            sticky.removeClass('fixed-header');
        }
    });

    /*$('.scroll-viewport').on('scroll', function() {
        var left = $(this).scrollLeft();
        $('.notfixed-header').css('left', -left);
    });*/

    $('.scroll-viewport').on('scroll', function() {
        var left = $(this).scrollLeft();
        var left = left;
        $('.fixed-scroll').css('left', -left);
    });  

    /*$(window).scroll(function(){
        var sticky = $('.fixed-row'),
        scroll = $(window).scrollTop();

        if (scroll >= 556) sticky.addClass('sticky-header');
        else sticky.removeClass('sticky-header');
    });*/
}, 3000);

