//开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";
//测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net/";
//生产环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net/";
// 拦截所有ajax请求
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
    // 统一为有权限的接口，设置 headers 请求头
    //如果要限制之后的路径中有/my/，则可以写成indeOf等于0
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //实现，查询是否验证成功，这样可以处理失败登录
    options.complete = function (res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
        // console.log(res);
        // console.log(res.responseJSON);
    }
})