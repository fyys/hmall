! function ($) {
    const $loutinav = $('#loutinav');
    const $louti = $('#loutinav li');
    const $louceng = $('#main .louceng')
    const $loucengLast = $('#loutinav ul li.last')

    function gunlun() {
        let $top = $(window).scrollTop();//滚条的top
        //楼梯出现
        $top >= 600 ? $loutinav.show() : $loutinav.hide();

        $(window).on('scroll', function () {
            let $top = $(window).scrollTop()//滚条的top
            //楼梯出现
            $top >= 600 ? $loutinav.show() : $loutinav.hide()

            // 楼层定楼梯
            $louceng.each(function (index, element) {
                let $loucengtop = $(this).offset().top + $(element).outerHeight() / 2;//楼层的top
                if ($loucengtop > $top) {
                    $louti.removeClass('active');
                    $louti.eq(index).addClass('active');
                    return false;
                }
            });
        });
    }
    gunlun();

    // 楼梯定楼层
    $louti.not('.last').on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active')

        $(window).off()

        let $loucengtop = $louceng.eq($(this).index()).offset().top; //获取楼层top值

        $('html,body').animate({
            scrollTop: $loucengtop
        }, function () {
            $(window).on('scroll', function () {
                gunlun();
            });
        });

    })

    //返回顶部
    $loucengLast.on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        })
    })
}(jQuery);