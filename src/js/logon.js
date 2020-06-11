!function ($) {
    const $form = $('form');
    const $username = $('#username');
    const $password = $('#password');
    const $repass = $('#repass');
    const $email = $('#e-mail');
    const $span = $('.tishi')


    let userflag = true;
    let passwordflag = true;
    let emailflag = true;
    let repassflag = true;
    // 1.用户名
    $username.on('focus', function () {
        $span.eq(0).html('设置后不可更改，中英文均可，最长14个英文或7个汉字').css({
            color: '#ccc'
        });
    });
    $username.on('blur', function () {
        if ($(this).val() !== '') { //有值
            let len = $(this).val().replace(/[\u4e00-\u9fa5]/g, 'aa').length; //将中文转换成两个英文计算长度
            if (len < 14) {
                $.ajax({
                    type: 'post',
                    url: 'http://127.0.0.1/worktwo/hmall/php/logon.php',
                    data: {
                        username: $username.val()
                    }
                }).done(function (result) {
                    if (result) {
                        $span.eq(0).html('该用户名已经存在').css('color', 'red');
                        userflag = false;
                    } else {
                        $span.eq(0).html('√').css('color', 'green');
                        userflag = true;
                    }
                })
            } else {
                $span.eq(0).html('用户名长度有问题').css({
                    color: 'red'
                });
                userflag = false;
            }
        } else {
            $span.eq(0).html('用户名不能为空').css({
                color: 'red'
            });
            userflag = false;
        }
    });
    // 2.密码
    $password.on('focus', function () {
        $span.eq(1).html('长度为8~14个字符,至少包含2种字符').css({
            color: '#ccc'
        });
    });
    $password.on('input', function () {
        let $pass = $(this).val();
        if ($pass.length >= 8 && $pass.length <= 14) {
            let regnum = /\d+/;
            let regupper = /[A-Z]+/;
            let reglower = /[a-z]+/;
            let regother = /[\W\_]+/; 

            let $count = 0; //计数

            if (regnum.test($pass)) {
                $count++;
            }

            if (regupper.test($pass)) {
                $count++;
            }

            if (reglower.test($pass)) {
                $count++;
            }

            if (regother.test($pass)) {
                $count++;
            }

            switch ($count) {
                case 1:
                    $span.eq(1).html('弱').css({
                        color: 'green'
                    });
                    passwordflag = false;
                    break;

                case 2:
                case 3:
                    $span.eq(1).html('中').css({
                        color: 'yellow'
                    });
                    passwordflag = true;
                    break;
                case 4:
                    $span.eq(1).html('强').css({
                        color: 'red'
                    });
                    passwordflag = true;
                    break;
            }

        } else {
            $span.eq(1).html('密码长度错误').css({
                color: 'red'
            });
            passwordflag = false;
        }
        if ($repass.val() != '') {
            if ($(this).val() != $repass.val()) {
                $span.eq(2).html('两次密码不相同').css({
                    color: 'red'
                });
                repassflag = false;
            } else {
                $span.eq(2).html('√').css({
                    color: 'green'
                });
                repassflag = true;
            }
        }

    });
    $password.on('blur', function () {
        if ($(this).val() !== '') {
            if (passwordflag) {
                $span.eq(1).html('√').css({
                    color: 'green'
                });
                passwordflag = true;
            }
        } else {
            $span.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            passwordflag = false;
        }
    });


    // 3.密码二次确认
    $repass.on('focus', function () {
        $span.eq(2).html('确认两次密码一致').css({
            color: '#ccc'
        });
    })
    $repass.on('input', function () {
        if ($(this).val() != $password.val()) {
            $span.eq(2).html('两次密码不相同').css({
                color: 'red'
            });
            repassflag = false;
        } else {
            $span.eq(2).html('√').css({
                color: 'green'
            });
            repassflag = true;
        }
    })
    $repass.on('blur', function () {
        if ($(this).val() == '') {
            $span.eq(2).html('请确认密码').css({
                color: 'red'
            });
            repassflag = false;
        }
    })
    // 4.邮箱
    $email.on('focus', function () {
        $span.eq(3).html('该邮箱用于发送信息和密码找回').css({
            color: '#ccc'
        });
    });
    $email.on('input', function () {
        let $em = $(this).val();
        let email = /^(\w+[\+\-\.]*\w+)\@(\w+[\-\.]*\w+)\.(\w+[\-\.]*\w+)$/;
        if (email.test($em)) {
            $span.eq(3).html('√').css({
                color: 'green'
            });
            emailflag = true;
        } else {
            $span.eq(3).html('邮箱格式错误').css({
                color: 'red'
            });
            emailflag = false;
        }
    });
    $email.on('blur', function () {
        if ($(this).val() !== '') {
            if (emailflag) {
                $span.eq(1).html('√').css({
                    color: 'green'
                });
                emailflag = true;
            }
        } else {
            $span.eq(3).html('邮箱不能为空').css({
                color: 'red'
            });
            emailflag = false;
        }
    });
    // 提交
    $form.on('submit', function () {
        if ($username.val() === '') {
            $span.eq(0).html('该用户名不能为空').css({
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

        if ($repass.val() === '') {
            $span.eq(2).html('请确认密码').css({
                color: 'red'
            });
            repassflag = false;
        }

        if ($password.val() === '') {
            $span.eq(3).html('邮箱不能为空').css({
                color: 'red'
            });
            emailflag = false;
        }
        if (!userflag || !passwordflag || !emailflag || !repassflag) {
            return false;
        }
    });
}(jQuery);