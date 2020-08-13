$("#logout").on("click", function (){
  var isConfirm = confirm('您确定要退出吗？');
  if(isConfirm){
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function (){
        location.href = 'login.html';
      },
      error: function (){
        alert('退出失败');
      }
    })
  }
});

function formateDate(date) {
  //将日期时间字符串转换为日期对象
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

//请求登录用户信息
$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success: function (response){
    $('.profile .avatar').prop('src', response.avatar);
    $('.profile .name').html(response.nickName);
  }
})
