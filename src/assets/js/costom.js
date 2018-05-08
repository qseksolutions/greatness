
// ;(function($) {
//    $.fn.fixMe = function() {
//       return this.each(function() {
//          var $this = $(this),
//             $t_fixed;
//          function init() {
//             $this.wrap('<div class="table-container" />');
//             $t_fixed = $this.clone();
//             $t_fixed.find("tbody").remove().end().addClass("fixed").insertBefore($this);
//             resizeFixed();
//          }
//          function resizeFixed() {
//             $t_fixed.find("th").each(function(index) {
//                $(this).attr("width",$this.find("th").eq(index).outerWidth()+"");
//             });
//          }
//          function scrollFixed() {
//             var offset = $(this).scrollTop(),
//             tableOffsetTop = $this.offset().top,
//             tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
//             if(offset < tableOffsetTop || offset > tableOffsetBottom)
//                $t_fixed.hide();
//             else if(offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden"))
//                $t_fixed.show();
//          }
//          $(window).resize(resizeFixed);
//          $(window).scroll(scrollFixed);
//          init();
//       });
//    };
// })(jQuery);

// $(document).ready(function(){
//    $("table").fixMe();
// });

var tables = document.getElementsByTagName('table');
  lrStickyHeader(tables[0]);
  lrStickyHeader(tables[1]);
  lrStickyHeader(tables[2], {parent: document.getElementById('scrollPanel')});

$('.selectpicker').select2();

// $('.dark-theme-btn').on('click', function() {
//   $('body').addClass('dark-theme');
//   return false;
// });
// $('.light-theme-btn').on('click', function() {
//   $('body').removeClass('dark-theme');
//   return false;
// });

$('body').on('mouseenter mouseleave','.dropdown',function(e){
  var _d=$(e.target).closest('.dropdown');_d.addClass('show');
  setTimeout(function(){
    _d[_d.is(':hover')?'addClass':'removeClass']('show');
    $('[data-toggle="dropdown"]', _d).attr('aria-expanded',_d.is(':hover'));
  },300);
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})  