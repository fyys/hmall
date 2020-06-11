!function ($) {
    const $sousuo = $('.search-keyword');
    const $content = $('.sousuo-content ul')

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
                    <li>${value.goods_name}</li>
            `;
            });
            $content.html(str);
        })
        if ($sousuo.val()) {
            $content.css({
                display: 'flex'
            })
        } else {
            $content.css({
                display: 'none'
            })
        }
    })

    $content.on('click', 'li', function () {
        $sousuo.val($(this).html())
        $content.css({
            display: 'none'
        })
    })

}(jQuery)