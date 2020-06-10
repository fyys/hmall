! function ($) {
    // 1.渲染数据
    function showlist(sid, num) { //sid：编号  num：数量
        $.ajax({
            url: 'http://127.0.0.1/worktwo/hmall/php/alldata.php',
            dataType: 'json'
        }).done(function (data) {
            $.each(data, function (index, value) {
                if (sid == value.goods_id) {
                    let $clonebox = $('.goods-main:hidden').clone(true, true); //克隆隐藏元素
                    $clonebox.find('.li-1').find('img').attr('src', value.goods_big_logo);
                    $clonebox.find('.li-1').find('img').attr('sid', value.goods_id);
                    $clonebox.find('.li-2').find('a').html(value.goods_name);
                    $clonebox.find('.li-4').html(value.goods_price);
                    $clonebox.find('.li-5').find('input').val(num);
                    //计算单个商品的价格
                    $clonebox.find('.li-7').html((value.goods_price * num).toFixed(2));
                    $clonebox.css({ 'display': 'flex' });
                    $('.goods').append($clonebox);
                    sumAllprice();
                }
            });
        });
    }

    //2.获取cookie渲染数据
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let goodsid = $.cookie('cookiesid').split(',');
        let goodsnum = $.cookie('cookienum').split(',');
        // console.log(goodsid)
        // console.log(goodsnum)
        $.each(goodsid, function (index, value) {
            showlist(goodsid[index], goodsnum[index]);
        });
    }
    //3.修改数量
    $('.num_add').on('click', function () {//加
        let $num = $(this).parents('.goods-main').find('.buy_num').val();
        $num++;
        $(this).parents('.goods-main').find('.li-5 input').val($num);
        $(this).parents('.goods-main').find('.li-7').html(sumprice($(this)));
        setnewcookie($(this));
        sumAllprice();
    });

    $('.num_del').on('click', function () {//减
        let $num = $(this).parents('.goods-main').find('.buy_num').val();
        $num--;
        if ($num < 1) {
            $num = 1;
            alert('数量不能少于0')
        }
        $(this).parents('.goods-main').find('.li-5 input').val($num);
        $(this).parents('.goods-main').find('.li-7').html(sumprice($(this)));
        setnewcookie($(this));
        sumAllprice();
    });

    $('.li-5 input').on('input', function () {//直接修改
        let $reg = /^\d+$/g;//只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) {
            $(this).val(1);
        }
        $(this).parents('.goods-main').find('.li-7').html(sumprice($(this)));
        setnewcookie($(this));
        sumAllprice();
    });

    //4.计算单价
    function sumprice(obj) {
        let $price = parseFloat(obj.parents('.goods-main').find('.li-4').html());
        let $num = parseInt(obj.parents('.goods-main').find('.li-5 input').val());
        return ($price * $num).toFixed(2)
    }

    //5.计算总价
    function sumAllprice() {
        let $numall = 0; //商品的件数
        let $priceall = 0; //商品的总价
        $('.goods-main:visible').each(function(index, ele) {
            if ($(ele).find('.li-0 input').prop('checked')) { //复选框勾选
                $numall += parseInt($(ele).find('.li-5 input').val());
                $priceall += parseFloat($(ele).find('.li-7').html());
            }
        });
        $('.sumprice').html($priceall.toFixed(2));
    }

    //6.全选
    $('#checkAll').on('change', function() {
        $('.goods-main:visible').find(':checkbox').prop('checked',$(this).prop('checked'));
        $('#checkAll').prop('checked', $(this).prop('checked'));
        sumAllprice()
    });
    $('.goods').on('change', $('.goods-main:visible').find(':checkbox'), function() {
        if ($('.goods-main:visible').find(':checkbox').length === $('.goods-main:visible').find('input:checked').length) {
            $('#checkAll').prop('checked', true);
        } else {
            $('#checkAll').prop('checked', false);
        }
        sumAllprice();
    });

    // 7.重新添加修改后的cookie
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    function getoldcookie() {//获取旧cookie
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(','); 
        } else {
            arrsid = [];
            arrnum = [];
        }
    }
    function setnewcookie(obj) {//设置新cookie
        getoldcookie();
        let $sid = obj.parents('.goods-main').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-main').find('.li-5 input').val();
        $.cookie('cookienum', arrnum,{ expires: 10, path: '/' });
    }

    // 8.删除
    function delcookie(sid, arrsid) {
        let $index = -1; //删除的索引位置
        $.each(arrsid, function(index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);

        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }
    $('.li-8 span').on('click', function() {
        getoldcookie();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.goods-main').remove();
            delcookie($(this).parents('.goods-main').find('img').attr('sid'), arrsid);
            sumAllprice(); //计算总价
        }
    });
}(jQuery);