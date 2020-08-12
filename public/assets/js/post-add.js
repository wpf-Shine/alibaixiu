//向服务器发送请求获取文章分类数据
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (response){
		var html = template('categoryTpl', {
			data: response
		});
		$("#category").html(html);
	}
});

//文件上传功能
$("#feature").on("change", function (){
	//获取选择的文件
	var file = this.files[0];
	//创建formData对象 实现二进制文件上传
	var formData = new FormData();
	//将选择的文件追加到formData对象中
	formData.append('cover', file);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		//告诉$.ajax方法不要处理data属性对应的参数
		processData: false,
		//不要设置参数类型
		contentType: false,
		success: function (response){
			$("#thumbnail").val(response[0].cover)
		}
	});
});

// 当添加文章表单提交的时候
$('#addForm').on('submit', function () {
	// 获取管理员在表单中输入的内容
	var formData = $(this).serialize();
	// 向服务器端发送请求 实现添加文章功能
	$.ajax({
		type: 'post',
		url: '/posts',
		data: formData,
		success: function () {
			// 文章添加成功 跳转到文章列表页面
			location.href = '/admin/posts.html'
		}
	})
	// 阻止表单默认提交的行为
	return false;
});

var id = getUrlParams('id');
//当前在做修改文章操作
if(id != -1){
	//根据id获取文章的详细信息
	$.ajax({
		type: 'get',
		url: '/posts/' + id,
		success: function (response){
		//向服务器发送请求获取文章分类数据
			$.ajax({
				type: 'get',
				url: '/categories',
				success: function (categories){
					response.categories = categories;
					var html = template('modifyTpl', response);
					$("#parentBox").html(html);
				}
			});
		}
	})
}

//从浏览器地址栏获取查询参数
function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split('&');
	for(var i = 0;i < paramsAry.length; i++){
		var tmp = paramsAry[i].split('=');
		if(tmp[0] == name){
			return tmp[1];
		}
	}
	return -1;
}

//文章修改
$("#parentBox").on("submit", "#modifyForm", function (){
	var formData = $(this).serialize();
	var id = $(this).attr("data-id");
	$.ajax({
		type: 'put',
		url: '/posts/' + id,
		data: formData,
		success: function (){
			location.href = '/admin/posts.html';
		}
	})
	//阻止表单默认提交行为
	return false;
})