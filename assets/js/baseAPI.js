// $.get $.post $.ajax  前调用这个 函数
// 可以拿到我们给` ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
  //   console.log(options.url);
  // 在发起真正的 ajax 之前拼接同意请求的根路径
  options.url = 'http://127.0.0.1:3007' + options.url;
  // 统一为有权限的headers设置请求头
  if (options.url.indexOf('/my') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || '',
    };
  }

  // 全局统一配置 complete 回调函数
  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败'
    ) {
      // 1. 强制清空token
      localStorage.removeItem('token');
      // 2.强制跳转到登录页面
      location.href = '/login.html';
    }
  };
});
