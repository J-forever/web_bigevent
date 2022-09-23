$(function () {
  // 点击去注册账户的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  // 点击去登录的链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide();
    $('.login-box').show();
  });

  // 从 layui 种获取 form 对象
  var form = layui.form;
  let layer = layui.layer;
  // 通过 form.verify() 自定义校验规则
  form.verify({
    // 自定义了一个 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 自定义 repwd 校验两次密码是否一致
    repwd: function (value) {
      //  通过形参拿到的是密码框中的内容
      // 还需要拿到密码框中的内容
      // 进行判断 return 错误提示消息
      let pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次密码不一致!';
      }
    },
  });
  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止表单默认行为
    e.preventDefault();
    let data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
    };
    // 发起 ajax 的请求
    $.post(
      // 'http://www.liulongbin.top:3007/api/reguser',
      '/api/reguser',
      data,
      function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        // console.log('注册成功');
        layer.msg('注册成功,可以登陆了');
        // 模拟点机回 登录
        $('#link_login').click();
      }
    );
  });
  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('登陆失败');
        layer.msg('登录成功!');
        // console.log(res.token);
        // 将获取到的 token 存储在 localStorage 中
        localStorage.setItem('token', res.token);
        // 跳转到后台主页
        location.href = '/index.html';
      },
    });
    /* $.post(
      '/api/login',
      {data: $(this).serialize()},
      function (res) {
        if (res.status !== 0) return layer.msg('登陆失败');
        layer.msg('登录成功!');
    ) */
  });
});
