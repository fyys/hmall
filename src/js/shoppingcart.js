! function($) {
    //1.获取cookie渲染对应的商品列表
    //2.获取所有的接口数据，判断取值。
    function showlist(sid, num) { //sid：编号  num：数量
        $.ajax({
            url: 'http://127.0.0.1/worktwo/hmall/php/alldata.php',
            dataType: 'json'
        }).done(function(data) {
            // console.log(data)
            $.each(data, function(index, value) {
                if (sid == value.goods_id) {
                    let $clonebox = $('.goods-main').clone(true, true); //克隆隐藏元素
                    $clonebox.find('.li-1').find('img').attr('src', value.goods_big_logo);
                    $clonebox.find('.li-1').find('img').attr('sid', value.goods_id);
                    $clonebox.find('.li_2').find('a').html(value.goods_name);
                    $clonebox.find('.li-4').html(value.goods_price);
                    $clonebox.find('.li-5').find('input').val(num);
                    //计算单个商品的价格
                    $clonebox.find('.li-7').html((value.goods_price* num).toFixed(2));
                    $clonebox.css({'display':'flex'});
                    $('.goods').append($clonebox);
                }
            });
        });
    }

    //2.获取cookie渲染数据
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let goodsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组[1,2]
        let goodsnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组[10,20]
        // console.log(goodsid)
        // console.log(goodsnum)
        $.each(goodsid, function(index, value) {
            showlist(goodsid[index], goodsnum[index]);
        });
    }

    $('.num_add').on('click', function() {
        let $num = $(this).siblings('.buy_num').val();
        $num++;
        $(this).siblings('.buy_num').val($num);

        $(this).parents('.goods-item').find('.b-sum strong').html(sumprice($(this)));
    });

    //计算单价
    function sumprice(obj) { //obj元素对象
        let $price = parseFloat(obj.parents('.goods-main').find('.li-4').html());
        let $num = parseInt(obj.siblings('.goods-main').find('.li-5 input').val());
        return ($price * $num).toFixed(2)
    }

}(jQuery);