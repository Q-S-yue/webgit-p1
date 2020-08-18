$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //自定义验证规则
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (value !== pwd) {
                return '两次密码不一致！'
            }
        }
    });

    // 用ajaxPrefilter过滤器拼接url根路径
    // var rootUrl = 'http://ajax.frontend.itheima.net/';

    //注册
    var layer = layui.layer;
    $("#form_reg").on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功，请登录");

                //模拟自动跳转到登录页面
                setTimeout(function () {
                    $('#link_login').click();
                    //用原生dom对象方法来清空表单
                    $("#form_reg")[0].reset();
                }, 1500)

            }
        })
    })

    //登录
    $("#form_login").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登录成功");

                //保存用户认证信息，token字符串保存到locastrage中
                localStorage.setItem('token', res.token);
                //模拟自动跳转到登录页面
                location.href = '/index.html';

            }
        })
    })
})