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
        }
        else {
            scrolldiv.removeClass('fixed-scroll');
            sticky.removeClass('fixed-header');
        }
    });

    $('.scroll-viewport').on('scroll', function() {
        var left = $(this).scrollLeft();
        var left = left;
        $('.scrollable-row').css('left', -left);
    });  
}, 5000);

