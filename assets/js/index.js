$(function () {
  // 调用函数获取用户基本信息
  getUserInfo();

  // 退出用户
  let layer = layui.layer;
  $('#btnLogout').on('click', function () {
    // 提示用户是否退出
    layer.confirm(
      '确定退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        // console.log('啊啊啊');
        // 1. 清空本地存储中的token
        localStorage.removeItem('token');
        // 2. 跳转到登录页
        location.href = '/login.html';
        // 关闭 confirm 询问框
        layer.close(index);
      }
    );
  });
});

// 获取用户基本信息函数
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // 请求头配置对象
    /*  headers: {
      Authorization: localStorage.getItem('token') || '',
    }, */
    success: function (res) {
      //   console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败');
      }
      // 调用 renderAvatar()  函数 渲染用户的头像
      renderAvatar(res.data);
    },
    // 不论成功失败都会调用 complete 函数 // 在baseAPI中全局配置
    /* complete: function (res) {
      //   console.log('执行了 complete 回调');
      //   console.log(res);
      // 在 complete 里面 的 res.responseJSON 拿到服务器反应回来的数据
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message === '身份认证失败'
      ) {
        // 1. 强制清空token
        localStorage.removeItem('token');
        // 2.强制跳转到登录页面
        location.href = '/login.html';
      }
    }, */
  });
}

// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户名称
  let name = user.nickname || user.username;
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
  // 3. 按需渲染用户头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide();
    // 获取用户名注册名的第一个字母并大写
    let first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
}
