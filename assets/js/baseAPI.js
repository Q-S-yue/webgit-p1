//开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";
//测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net/";
//生产环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net/";
// 拦截所有ajax请求
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
})