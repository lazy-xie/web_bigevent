$(function() {
    //调用getUserInfo获取用户的基本信息
    getUserInfo();

    var layer = layui.layer;

    //为退出按钮绑定点击事件，实现退出功能
    $('#btnLogout').on('click', function() {
        //弹出提示框提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //1.清空本地存储中的token
            localStorage.removeItem('token');
            //2.重新跳转到登录页面
            location.href = '/login.html';

            //关闭confirm提示框
            layer.close(index)
        })
    })
})

//获取用户的基本信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        //访问成功执行此回调函数
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        //无论访问成功还是失败，最终都会调用complete回调函数
        // complete: function(res) {
        //     //在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.强制清空token
        //         localStorage.removeItem('token');
        //         //2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//封装一个渲染用户头像的函数
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username;
    //2.设置欢迎的文本，昵称的优先级比用户的登录名高
    $('#welcome').html('欢迎&nbsp;&&nbsp;' + name);
    //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        //隐藏文本头像
        $('.text-avatar').hide();
    } else {
        //渲染文本头像，将用户名的第一个字符取出并变成大写
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        //隐藏图片头像
        $('.layui-nav-img').hide();
    }
}