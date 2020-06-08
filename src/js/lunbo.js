! function ($) {
    const $lunbo = $('#banner');
    const $picul = $('#banner .lunboul');
    const $btnli = $('.btnul li');

    //1.轮播图片懒加载
    $.ajax({
        url: 'http://127.0.0.1/worktwo/hmall/php/lunbo.php',
        dataType: 'json'
    }).done(function (data) {
        let str = '';
        $.each(data, function (index, value) {
            str += `
                <li>
                    <img class="lazy" src="${value.goods_big_logo}" >
                </li> 
            `;
        });
        $picul.html(str);

        // 2.轮播效果
        const $picli = $picul.children();

        let $index = 0;
        let $timer = null;
        let $clonepic = $picli.first().clone(true, true);//复制一张
        let $liwidth = $picli.eq(0).width();//一张图的宽

        // 设置ul总长度
        $picul.append($clonepic).css({
            width: $picul.children().length * $liwidth
        });
        // 点击按钮换图
        $btnli.on('click', function () {
            $index = $(this).index();
            tabswitch();
        });

        // 自动轮播
        $timer = setInterval(() => {
            $index++;
            tabswitch();
        }, 3000);

        // 鼠标移入移出决定是否继续播放
        $lunbo.hover(function () {
            clearInterval($timer)
        }, function () {
            $timer = setInterval(() => {
                $index++;
                tabswitch();
            }, 3000);
        });

        function tabswitch() {
            if ($index === $btnli.length + 1) {
                $picul.css({
                    left: 0
                });
                $index = 1;
            }
            if ($index === $btnli.length) {
                $btnli.eq(0).addClass('btn-active').siblings('.btnul li').removeClass('btn-active');
            } else {
                $btnli.eq($index).addClass('btn-active').siblings('.btnul li').removeClass('btn-active');
            }
            $picul.stop(true).animate({
                left: -$liwidth * $index
            });
        }
    });
}(jQuery);