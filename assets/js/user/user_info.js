$(function () {
  let form = layui.form;
  let layer = layui.layer;
  // 创建自己的验证规则 基于layui
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度在 1~6 个字符之间';
      }
    },
  });
  initUserInfo();
  function initUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      method: 'GET',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败');
        }
        // console.log(res);
        // 调用 form.val()快速为表单赋值
        form.val('formUserInfo', res.data);
      },
    });
  }
  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    // 阻止表单默认重置行为
    e.preventDefault();
    initUserInfo();
  });

  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    // 发起 ajax 请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('更新用户信息失败!');
        console.log('更新用户信息成功');
        // 调用父页面的方法 重新渲染用户头像
        // 子页面 调 父页面 函数
        window.parent.getUserInfo();
      },
    });
  });
});
