// $.get $.post $.ajax  前调用这个 函数
// 可以拿到我们给` ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
  //   console.log(options.url);
  // 在发起真正的 ajax 之前拼接同意请求的根路径
  options.url = 'http://127.0.0.1:3007' + options.url;
});
