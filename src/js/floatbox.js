! function ($) {
    const $box = $('.box')
    $(window).on('scroll', function () {
        let $top = $(window).scrollTop()
        if ($top >= 143) {
            $box.stop().css({ 'position': 'fixed' }).addClass('fixed').animate({
                top: 0
            }, 200, 'swing').children().css({ 'padding-top': '5px' });
        } else {
            $box.stop().css({ 'position': 'static' }).removeClass('fixed').animate({
                top: -110
            }, 200, 'swing').children().css({ 'padding-top': '20px' })
        }
    })
}(jQuery);