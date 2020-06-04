! function ($) {
    const $menuli = $('.menu li');//左表
    const $cartlist = $('.cartlist');//右表
    const $items = $('.item');//右表内容
    const $banner = $('.banner');//整体

    $menuli.hover(function () {
        $cartlist.show()
        $(this).addClass('active').siblings('.menu li').removeClass('active');
        $items.eq($(this).index()).show().siblings('.item').hide();

        if ($(window).scrollTop() > $banner.offset().top) {
            $cartlist.css({
                top: $(window).scrollTop() - $banner.offset().top
            })
        } else {
            $cartlist.css({
                top: 0
            })
        }
    }, function () {
        $cartlist.hide()
    })

    $cartlist.hover(function () {
        $cartlist.show()
    }, function () {
        $cartlist.hide()
    })
}(jQuery)