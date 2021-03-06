!function ($) {
    const $row4 = $('.row-4')

    let array_default = [];//排序前的li数组
    let array = [];//排序中的数组
    let prev = null;
    let next = null;
    //1.添加商品
    $.ajax({
        type: 'post',
        url: 'http://127.0.0.1/worktwo/hmall/php/goodslist.php',
        dataType: 'json'
    }).done(function (data) {
        let str = '';
        $.each(data, function (index, value) {
            str += `
                    <li class="col">
                        <div class="header">
                            <a href="detail.html?sid=${value.goods_id}">
                                <img class="lazy" data-original="${value.goods_big_logo}" >
                            </a>
                        </div>
                        <ul class="main">
                            <li class="name">
                                <a href="javascript:void(0)">${value.goods_name}</a>
                            </li>
                            <li>
                                <span class="price">￥${value.goods_price}</span>
                            </li>
                        </ul>
                        <div class="footer">
                            <a href="detail.html?sid=${value.goods_id}"><span>商品详情</span></a>
                            <a href="javascript:void(0)"><span>关注</span></a>
                        </div>
                    </li>
            `;
        });
        $row4.html(str);
        // 添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = [];//排序前的li数组
        array = [];//排序中的数组
        prev = null;
        next = null;
        //将页面的li元素加载到两个数组中
        $('.row-4 .col').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    })

    // 2.分页
    //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
    $('.page').pagination({
        pageCount: 8,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());//获取的页码给后端
            $.ajax({
                url: 'http://127.0.0.1/worktwo/hmall/php/goodslist.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let str = '';
                $.each(data, function (index, value) {
                    str += `
                            <li class="col">
                                <div class="header">
                                    <a href="detail.html?sid=${value.goods_id}" target="_blank">
                                        <img src="${value.goods_big_logo}" >
                                    </a>
                                </div>
                                <ul class="main">
                                    <li class="name">
                                        <a href="javascript:void(0)">${value.goods_name}</a>
                                    </li>
                                    <li>
                                        <span class="price">￥${value.goods_price}</span>
                                    </li>
                                </ul>
                                <div class="footer">
                                    <a href="detail.html?sid=${value.goods_id}"><span>商品详情</span></a>
                                    <a href="javascript:void(0)"><span>关注</span></a>
                                </div>
                            </li>
                    `;
                });
                $row4.html(str);

                array_default = [];//排序前的li数组
                array = [];//排序中的数组
                prev = null;
                next = null;

                //将页面的li元素加载到两个数组中
                $('.row-4 .col').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });


    //3.排序
    $('.select').children('a').eq(0).on('click', function () {
       
        $(this).addClass('current').siblings('a').removeClass('current')
        $.each(array_default, function (index, value) {
            $('.list .row-4').append(value);
        });
        return;
    });
    $('.select').children('a').eq(1).on('click', function () {
        $(this).addClass('current').siblings('a').removeClass('current')
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $.each(array, function (index, value) {

            // console.log(value);
            $('.list .row-4').append(value);
        });
    });
    $('.select').children('a').eq(2).on('click', function () {
        $(this).addClass('current').siblings('a').removeClass('current')
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                // console.log(prev)
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                // console.log(next)
                // //通过价格的判断，改变的是li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $.each(array, function (index, value) {

            // console.log(value);
            $('.list .row-4').append(value);
        });
    })

}(jQuery)