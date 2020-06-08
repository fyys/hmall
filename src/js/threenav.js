! function ($) {
    const $navulLeft = $('.nav-ul1>li');//左表
    const $navliRight = $('.nav-ul2');//右表
    const $items = $('.nav-ul2>.item');//右表内容
    const $all = $('.nav-ul1');//整体

    $navulLeft.hover(function () {
        $navliRight.show()
        $(this).addClass('threeNav-li2').siblings('.nav-ul1 li').removeClass('threeNav-li2');
        $items.eq($(this).index()).show().siblings('.item').hide();

        if ($(window).scrollTop() > $all.offset().top) {
            $navliRight.css({
                top: $(window).scrollTop() - $all.offset().top
            })
        } else {
            $navliRight.css({
                top: 0
            })
        }
    }, function () {
        $navliRight.hide()
    })

    $navliRight.hover(function () {
        $navliRight.show()
    }, function () {
        $navliRight.hide()
    })
}(jQuery)