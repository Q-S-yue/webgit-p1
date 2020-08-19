$(function () {
    getUserInfo();
})

//发请求获取用户信息
//放在入口函数外面，为了写成全局函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        },
 */
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // console.log(res);
            rederAvatar(res.data);
        }
    })
}

//封装渲染用户头像
function rederAvatar(user) {
    //渲染用户名字
    var name = user.nickname || user.username;
    $(".welcome").html('欢迎 ' + name);
    //设置用户头像
    var pic = user.user_pic;
    if (pic !== null) {
        $(".layui-nav-img").attr('src', pic).show();
        $('.user-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.user-avatar').html(name[0].toUpperCase()).show();
    }
}

//退出功能
$("#tuichu").on('click', function () {
    //当点击之后，确认用户是否退出
    layer.confirm('确认是否退出登录', {
        icon: 3,
        title: '提示'
    }, function (index) {
        localStorage.removeItem('token');
        location.href = "/login.html";
        layer.close(index);
    });
})