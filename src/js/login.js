!function ($) {
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
}(jQuery);