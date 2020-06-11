!function ($) {
    const $row4 = $('.row-4')
    let array_default = [];//排序前的li数组
    let array = [];//排序中的数组
    let prev = null;
    let next = null;
    //2.添加商品
    $.ajax({
        url: 'http://127.0.0.1/worktwo/hmall/php/indexgoods.php',
        dataType: 'json'
    }).done(function (data) {
        let str = '';
        $.each(data, function (index, value) {
            str += `
                <li class="col-1">
                    <div class="header">
                        <a href="detail.html?sid=${value.goods_id}">
                            <img class="lazy" data-original="${value.goods_big_logo}" >
                        </a>
                    </div>
                    <ul class="content">
                        <li class="name">
                            <a href="javascript:void(0)">${value.goods_name}</a>
                        </li>
                        <li>
                            <span class="price">￥${value.goods_price}</span>
                        </li>
                    </ul>
                </li>   
            `;
        });
        $row4.html(str);

        //未循环只改变一次
        $('#main-louceng').children().eq(0).children('.col-r').children('.row-4').children().eq(2).addClass('col-2').removeClass('col-1')
        $('#main-louceng').children().eq(1).children('.col-r').children('.row-4').children().eq(0).addClass('col-2').removeClass('col-1')
        $('#main-louceng').children().eq(2).children('.col-r').children('.row-4').children().eq(4).addClass('col-2').removeClass('col-1')

        // 添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = [];//排序前的li数组
        array = [];//排序中的数组
        prev = null;
        next = null;
        //将页面的li元素加载到两个数组中
        $('.col-r li').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });
}(jQuery)