! function ($) {
    const $loutinav = $('#loutinav');
    const $louti = $('#loutinav li');
    const $louceng = $('#main-louceng .louceng')
    const $loucengLast = $('#loutinav ul li.last')
    const $box = $('.box')

    // 1.楼梯效果和顶层浮动效果
    function gunlun() {
        let $top = $(window).scrollTop();//滚条的top

        // 搜索框
        if ($top >= 143) {
            $box.stop().css({ 'position': 'fixed' }).addClass('fixed').animate({
                top: 0
            }, 200, 'swing').children().css({ 'padding-top': '5px' });
        } else {
            $box.stop().css({ 'position': 'static' }).removeClass('fixed').animate({
                top: -110
            }, 200, 'swing').children().css({ 'padding-top': '20px' })
        }
        //楼梯出现
        $top >= 500 ? $loutinav.show() : $loutinav.hide();

        $louceng.each(function (index, element) {
            let $loucengtop = $(this).offset().top + $(element).outerHeight() / 2;//楼层的top
            if ($loucengtop > $top) {
                $louti.removeClass('active');
                $louti.eq(index).addClass('active');
                return false;
            }
        });

        $(window).on('scroll', function () {
            let $top = $(window).scrollTop()//滚条的top

            if ($top >= 143) {
                $box.stop().css({ 'position': 'fixed' }).addClass('fixed').animate({
                    top: 0
                }, 200, 'swing').children().css({ 'padding-top': '5px' });
            } else {
                $box.stop().css({ 'position': 'static' }).removeClass('fixed').animate({
                    top: -110
                }, 200, 'swing').children().css({ 'padding-top': '20px' })
            }
            //楼梯出现
            $top >= 500 ? $loutinav.show() : $loutinav.hide()

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

        //获取楼层top值
        let $loucengtop = $louceng.eq($(this).index()).offset().top;

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