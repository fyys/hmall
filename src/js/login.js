!function ($) {
    const $form = $('form');
    const $username = $('#username');
    const $password = $('#password');
    const $span = $('.tishi')
    let userflag = true;
    let passwordflag = true;
    $('.btn').on('click', function () {
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1/worktwo/hmall/php/login.php',
            data: {
                username: $('#username').val(),
                password: hex_sha1($('#password').val())
            }
        }).done(function (data) {
            if (data) {
                location.href = "http://127.0.0.1/worktwo/hmall/dist/html/index.html";
                localStorage.setItem('username', $('#username').val());
            } else {
                $('#password').val('');
                alert('用户名或者密码错误');
            }
        });
    });
    // 提交
    $form.on('submit', function () {
        if ($username.val() === '') {
            $span.eq(0).html('用户名不能为空').css({
                color: 'red'
            });
            userflag = false;
        }

        if ($password.val() === '') {
            $span.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            passwordflag = false;
        }

        if (!userflag || !passwordflag) {
            return false;
        }
    });
}(jQuery);