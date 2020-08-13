var postId = getUrlParams('id');
//评论是否经过人工审核
var review;
$.ajax({
	type: 'get',
	url: '/posts/' + postId,
	success: function (response){
		var html = template('postTpl', response);
		$(".article").html(html);
	}
});

//点赞
$(".article").on('click', '#like', function (){
	var id = 
	$.ajax({
		type: 'post',
		url: '/posts/fabulous/' + postId,
		success: function (){
			alert('点赞成功，谢谢支持');
		}
	})
});

//获取网站的配置信息
$.ajax({
	type: 'get',
	url: '/settings',
	success: function(response){
		review = response.review
		if(response.comment){
			var html = template('commentTpl');
			$("#comment").html(html);
		}
	}
});

//评论
$("#comment").on('submit', 'form', function (){
	var content = $(this).find('textarea').val();
	var state;
	//需要人工审核
	if(review){
		state = 0;
	}else{
		state =1;
	}
	$.ajax({
		type: 'post',
		url: '/comments',
		data: {
			content: content,
			post: postId,
			state: state
		},
		success: function(){
			alert('评论成功');
			location.reload();
		},
		error: function(xhr){
			JSON.parse(xhr.responseText).message
			alert(JSON.parse(xhr.responseText).message)
		}

	})
	return false;
})