! function ($) {
    //1.获取列表页传来的sid
    let $sid = location.search.substring(1).split('=')[1];
    const $bpic = $('#bigpic');//大图
    const $midpic = $('#midpic');//中图
    const $title = $('.name h2');//商品名称
    const $price = $('.price');//价格

    //如果$sid不存在，默认$sid = 4
    if (!$sid) {
        $sid = 4;
    }

    // console.log($sid);

    //2.将sid传给后端
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1/worktwo/hmall/php/getsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function (data) {
        // console.log(data);
        $midpic.attr('src', data.goods_big_logo);
        $midpic.attr('sid', data.goods_id); //给图片添加唯一的sid
        $bpic.attr('src', data.goods_big_logo);
        $title.html(data.goods_name);
        $price.html(data.goods_price);
        // 渲染小图
        let picarr = data.goods_small_logo.split(',');
        // console.log(picarr);

        let $strhtml = '';
        $.each(picarr, function (index, value) {
            $strhtml += '<li><img src="' + value + '"/></li>';
        });
        $('#smallpic ul').html($strhtml);
    });

    //3.放大镜效果
    const $spic = $('#midArea');//中图
    const $sf = $('#zoom'); //小放
    const $bf = $('#bigArea'); //大放
    const $up = $('.up'); //上箭头
    const $down = $('.down'); //下箭头
    const $list = $('#smallpic'); //小图列表
    //$spic 中图   $bpic 大图  

    //中放/大放=中图/大图
    $sf.width($spic.width() * $bf.width() / $bpic.width());//小放的宽
    $sf.height($spic.height() * $bf.height() / $bpic.height());//小放的高
    let $bili = $bpic.width() / $spic.width(); //比例大于1 放大效果


    $spic.hover(function () {
        // alert(1)
        $sf.css('visibility', 'visible');
        $bf.css('visibility', 'visible');
        $(this).on('mousemove', function (ev) {
            // 范围限定
            let $leftvalue = ev.pageX - $('.cart_content').offset().left - $sf.width() / 2;
            let $topvalue = ev.pageY - $('.cart_content').offset().top - $sf.height() / 2;
            if ($leftvalue < 0) {
                $leftvalue = 0;
            } else if ($leftvalue >= $spic.width() - $sf.width()) {
                $leftvalue = $spic.width() - $sf.width()
            }

            if ($topvalue < 0) {
                $topvalue = 0;
            } else if ($topvalue >= $spic.height() - $sf.height()) {
                $topvalue = $spic.height() - $sf.height()
            }

            $sf.css({
                left: $leftvalue,
                top: $topvalue
            });

            $bpic.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili
            });

        });
    }, function () {
        $sf.css('visibility', 'hidden');
        $bf.css('visibility', 'hidden');
    });

    //小图切换
    $('#smallpic ul').on('click', 'li', function () {
        //$(this):当前操作的li
        let $imgurl = $(this).find('img').attr('src');
        $midpic.attr('src', $imgurl);
        $bpic.attr('src', $imgurl);
    });

    //左右箭头事件
    let $num = 6; //列表显示的图片个数
    $down.on('click', function () {
        let $lists = $('#smallpic ul li');

        if ($lists.length > $num) { //限制点击的条件
            $num++;
            $up.css('color', '#333');
            if ($lists.length == $num) {
                $down.css('color', '#fff');
            }
            $('#smallpic ul').animate({
                top: -($num - 6) * $lists.eq(0).outerHeight(true)
            });
        }
    });


    $up.on('click', function () {
        let $lists = $('#smallpic ul li');
        if ($num > 6) { //限制点击的条件
            $num--;
            $down.css('color', '#333');
            if ($num <= 6) {
                $up.css('color', '#fff');
            }
            $('#smallpic ul').animate({
                top: -($num - 6) * $lists.eq(0).outerHeight(true)
            });
        }
    });





    // 4.购物车
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。

    //取出cookie
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }


    $('.btn_b').on('click', function () {
        //获取当前商品对应的sid
        let $sid = location.search.substring(1).split('=')[1];
        //判断是第一次点击还是多次点击
        cookietoarray();
        if ($.inArray($sid, arrsid) != -1) { //不为-1表示$sid存在
            // 取出已经存在的值进行增加再cookie
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.buy_num').val());
            arrnum[$.inArray($sid, arrsid)] = $num;
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        } else {
            arrsid.push($sid); //将编号$sid push到arrsid数组中
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
            arrnum.push($('.buy_num').val()); //将数量push到arrnum数组中
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }
        alert('按钮触发了');
    });

    // 数量增减
    $('.num_del').on('click', function () {
        let $num = $(this).siblings('.buy_num').val();
        
        if($num>=1){
            --$num;
        }else{
            alert('数量不能小于0')
        }
        $(this).siblings('.buy_num').val($num);
    })
    $('.num_add').on('click', function () {
        let $num = $(this).siblings('.buy_num').val();
        ++$num;
        $(this).siblings('.buy_num').val($num);
    })
    $('.buy_num').on('input',function(){
        let $num = $(this).val();
        if($num<0){
            alert('数量不能小于0')
            $(this).val(1);
        }
    })
}(jQuery);