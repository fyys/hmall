!function ($) {
    const $sousuo = $('.search-keyword');
    const $btn = $('.btn-search');
    const $row4 = $('.row-4')
    let array_default = [];//排序前的li数组
    let array = [];//排序中的数组
    let prev = null;
    let next = null;

    $sousuo.on('input', function () {
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1/worktwo/hmall/php/sousuo.php',
            data: {
                goodsname: $sousuo.val()
            },
            dataType: 'json'
        }).done(function (data) {
            let str = '';
            $.each(data, function (index, value) {
                str += `
                    <li class="col">
                        <div class="header">
                            <a href="detail.html">
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
                            <a href="javascript:void(0)"><span>商品详情</span></a>
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
            $('.col-r li').each(function (index, element) {
                array[index] = $(this);
                array_default[index] = $(this);
            });
        })
    })
}(jQuery)