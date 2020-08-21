$(function () {
    //自定义校验规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "你的昵称不应该超过六位"
            }
        }
    })

    //用户渲染
    initUserInfo();
    var layer = layui.layer;

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // console.log(res.data);

                form.val('formUserInfo', res.data);
            }
        })
    }


    //表单重置
    $("#resetBtn").on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    //表单提交
    $('form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);

                if (res.status !== 0) {
                    return layer.msg("更新信息失败！")
                }
                layer.msg("更新信息成功！");
                //调用父框架的全局接口
                window.parent.getUserInfo();
            }
        })
    })







})