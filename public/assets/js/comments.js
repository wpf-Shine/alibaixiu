//发送请求，获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response);
        var html = template('commentsTpl', response);
        $("#commentsBox").html(html);
   		var pageHTML = template('pageTpl', response);
   		$("#pageBox").html(html);
    }
});

function changePage(page){
	$.ajax({
	    type: 'get',
	    url: '/comments',
	    data: {
	    	page: page
	    },
	    success: function (response) {
	        console.log(response);
	        var html = template('commentsTpl', response);
	        $("#commentsBox").html(html);
	   		var pageHTML = template('pageTpl', response);
	   		$("#pageBox").html(html);
	    }
	});
}

//审核按钮点击事件
$("#commentsBox").on("click", ".status", function (){
	var status = $(this).attr("data-status");
	var id = $(this).attr("data-id");
	$.ajax({
		type: 'put',
		url: '/comments/' + id,
		data: {
			state: status == 0 ? 1 : 0
		},
		success: function (){
			location.reload();
		}
	})
});

$("#commentsBox").on("click", ".btnDEL", function (){
	var id = $(this).siblings().attr("data-id");
	if(confirm('您确定要删除该评论吗？')){
		$.ajax({
			type: 'delete',
			url: '/comments/' + id,
			success: function(){
				location.reload();
			}
		})
	}
});