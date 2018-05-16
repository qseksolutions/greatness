// $('.dark-theme-btn').on('click', function() {
//   $('body').addClass('dark-theme');
//   return false;
// });
// $('.light-theme-btn').on('click', function() {
//   $('body').removeClass('dark-theme');
//   return false;
// });

$('body').on('mouseenter mouseleave', '.dropdown', function (e) {
    var _d = $(e.target).closest('.dropdown'); _d.addClass('show');
    setTimeout(function () {
        _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
        $('[data-toggle="dropdown"]', _d).attr('aria-expanded', _d.is(':hover'));
    }, 300);
});
$(document).ready(function () {
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
    $("#sel_exch").select2({
        placeholder: "Select exchanges...",
        allowClear: true
    });

    $('[data-toggle="tooltip"]').tooltip()
});