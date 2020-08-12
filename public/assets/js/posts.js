$.ajax({
	type: 'get',
	url: '/posts',
	success: function (response){
		var htmlPost = template('postsTpl', response);
		var htmlPage = template('pageTpl', response);
		$("#postsBox").html(htmlPost);
		$("#pageBox").html(htmlPage);
	}
});

//处理日期格式
function formateDate(date) {
	//将日期时间字符串转换为日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

//分页
function changePage(page){
	$.ajax({
		type: 'get',
		url: '/posts',
		data: {
			page: page
		},
		success: function (response){
			var htmlPost = template('postsTpl', response);
			var htmlPage = template('pageTpl', response);
			$("#postsBox").html(htmlPost);
			$("#pageBox").html(htmlPage);
		}
	});
}

//查询分类列表
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (response){
		var html = template('categoryTpl', {data: response});
		$("#categoryBox").html(html);
	}
});

//文章列表筛选
$("#filterForm").on("submit", function (){
	var formData = $(this).serialize();
	$.ajax({
		type: 'get',
		url: '/posts',
		data: formData,
		success: function (response){
			var htmlPost = template('postsTpl', response);
			var htmlPage = template('pageTpl', response)
			$("#postsBox").html(htmlPost);
			$("#pageBox").html(htmlPage);
		}
	});
	return false;
});

//删除文章
$("#postsBox").on("click", ".btnDEL", function (){
	var id = $(this).attr("data-id");
	if(confirm('您确定要删除该文章吗？')){
		$.ajax({
			type: 'delete',
			url: '/posts/' + id,
			success: function (){
			location.reload();
			}
		});
	}
})