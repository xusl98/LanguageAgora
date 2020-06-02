$(document).ready(function () {
    $('#idiomasDesp').click(function () {
        if ($('#despleg').hasClass('fa-chevron-right')) {
            $('#despleg').removeClass('fa-chevron-right');
            $('#despleg').addClass('fa-chevron-down');
            $("html, body").animate({ scrollTop: $(document).height() }, 1000);
        } else {
            $('#despleg').addClass('fa-chevron-right');
            $('#despleg').removeClass('fa-chevron-down');
        }
    });
});