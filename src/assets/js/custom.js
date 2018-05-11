
$('.selectpicker').select2();

setTimeout(() => {
  $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    gutter: 30
  });
}, 2000);

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
});


