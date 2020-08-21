$(function () {
    //自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位'],
        samePwd: function (value) {
            if ($('[name=oldPwd]').val() === value) {
                return "新密码和原密码不可以相同"
            }
        },
        rePwd: function (value) {
            if ($('[name=newPwd]').val() !== value) {
                return "确认密码不一致"
            }
        }
    })

    //表单提交
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("修改密码成功！");

                //清空
                $("form")[0].reset();
            }
        })
    })

    //用户渲染
    /* initUserInfo();
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
    } */


    //表单重置
    /* $("#resetBtn").on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    }) */









})