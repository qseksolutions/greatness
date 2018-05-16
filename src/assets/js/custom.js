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
$(document).on('click', '.filter-dropdown-toggle', function () {
    $('.dropdown-filter').toggleClass('d-none');
});
$(document).ready(function(){
  $('.selectpicker').select2();
  $("#sel_cat").select2({
      placeholder: "Select categories...",
      allowClear: true
  });
  $("#sel_tag").select2({
      placeholder: "Select tags...",
      allowClear: true
  });
  $("#sel_proof").select2({
      placeholder: "Select proof type...",
      allowClear: true
  });
  $("#sel_org").select2({
      placeholder: "Select type...",
      allowClear: true
  });
  
  $('[data-toggle="tooltip"]').tooltip()
  
  $("#Circ_Supply").ionRangeSlider({
      type: "double",
      min: 0,
      max: 8.35,
      from: 0,
      to: 8.35,
      prefix: "Tn"
  });
  $("#Circ_Supply").ionRangeSlider({
      type: "double",
      min: 0,
      max: 8.35,
      from: 0,
      to: 8.35,
      prefix: "Tn"
  });
  $("#Max_Supply").ionRangeSlider({
      type: "double",
      min: 0,
      max: 8.00,
      from: 0,
      to: 8.00,
      prefix: "Tn"
  });
  $("#gq").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      prefix: "%"
  });
  $("#team_expe").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      prefix: "%"
  });
  $("#Theory").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      prefix: "%"
  });
  $("#Tech").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      prefix: "%"
  });
  $("#Traction").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      prefix: "%"
  });
  $("#tam").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      prefix: "%"
  });
  $("#Token").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      prefix: "%"
  });
  $("#Timing").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      prefix: "%"
  });
  $("#Transformative").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 0,
      to: 100,
      prefix: "%"
  });
  $("#Market_cap").ionRangeSlider({
      type: "double",
      min: 0.00,
      max: 185.37,
      from: 0,
      to: 185.37,
      prefix: "$"
  });
  $("#coin_age").ionRangeSlider({
      type: "double",
      min: 0.00,
      max: 48.3,
      from: 0,
      to: 48.3,
      prefix: "$"
  });
});
