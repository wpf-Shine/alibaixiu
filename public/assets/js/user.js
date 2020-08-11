//当表单发生提交行为时
$("#userForm").on("submit", function (){
	//获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	//向服务器端发送添加用户请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function (){
			//刷新页面
			location.reload();
		},
		error: function (xhr){
			var err = JSON.parse(xhr.responseText).message;
			$(".alert-error").show().html("<strong>错误！</strong>" + err);
		}
	})
	//阻止表单的默认提交行为
	return false;
});

//当用户选择文件的时候
$("#modifyBox").on("change", "#avatar", function (){
	// console.log(this.files[0])
	var formData = new FormData();
	formData.append('avatar', this.files[0]);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		//告诉$.ajax方法不要解析请求参数
		processData: false,
		//告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response){
			// console.log(response);
			$("#preview").prop('src', response[0].avatar);
			$("#hiddenAvatar").val(response[0].avatar);
		},
		error: function(){
			$(".alert-error").show().html("<strong>错误！</strong> 文件上传失败");
		}
	})
});

//向服务器发送请求，索要用户列表数据
$.ajax({
	type: 'get',
	url: '/users',
	success: function(response){
		//使用模板引擎将数据和HTML字符串进行拼接
		var html = template('userTpl', {
			data: response
		});
		//将拼接好的字符串渲染到页面中
		$("#userBox").html(html);
	}
});

//通过事件委托为编辑按钮添加点击事件
$("#userBox").on("click", ".btnEdit", function (){
	//获取被点击用户的ID
	var id = $(this).attr("data-id");
	//根据id获取用户的详细信息
	$.ajax({
		type: 'get',
		url: '/users/' + id,
		success: function (response){
			var html = template('modifyTpl', response);
			$("#modifyBox").html(html);
		}
	})
});

//为修改表单添加表单提交事件
$("#modifyBox").on('submit', "#modifyForm", function (){
	var formData = $(this).serialize();
	var id = $(this).attr("data-id");
	$.ajax({
		type: 'put',
		url: '/users/' + id,
		data: formData,
		success: function (response){
			location.reload();
		},
		error: function (xhr){
			var err = JSON.parse(xhr.responseText).message;
			$(".alert-error").show().html("<strong>错误！</strong>" + err);
		}
	})
	//阻止表单默认提交
	return false;
});

//通过事件委托为删除按钮添加点击事件
$("#userBox").on('click', ".btnDelete", function (){
	var isConfirm = confirm('您确定要删除吗？');
	var id = $(this).attr("data-id");
	if(isConfirm){
		$.ajax({
			type: 'delete',
			url: '/users/' + id,
			success: function (){
				location.reload();
			}
		})
	}
});

var selectAll = $("#selectAll");
selectAll.on("change", function (){
	//获取到全选按钮当前的状态
	var status = $(this).prop("checked");
	if(status){
		$("#bulkDelete").attr("disabled", false);
	}else{
		$("#bulkDelete").attr("disabled", true);
	}
	//获取到所有用户并将用户的状态和全选按钮保持一致
	$("#userBox").find("input").prop("checked", status);
});

//当用户前面的复选框状态发生改变时
$("#userBox").on("change", ".userStatus", function (){
	//获取到所有用户 在所有用户中过滤出选中的用户
	//判断选中用户的数量和所有用户的数量是否一致
	//如果一致 就说明所有的用户都是选中的
	var inputs = $("#userBox").find("input");
	if(inputs.length == inputs.filter(":checked").length){
		selectAll.prop("checked", true);
	}else{
		selectAll.prop("checked", false);
	}
	if(inputs.filter(":checked").length > 0){
		$("#bulkDelete").attr("disabled", false);
	}else{
		$("#bulkDelete").attr("disabled", true);
	}
});

//为批量删除按钮添加点击事件
$("#bulkDelete").on("click", function(){
	var ids = [];
	 var checkedUser = $("#userBox").find("input").filter(":checked");
	 checkedUser.each(function (index, element){
	 	ids.push($(element).attr("data-id"));
	 });
	 var isConfilm = confirm('您确定要进行批量删除吗？');
	 if(isConfilm){
	 	$.ajax({
	 		type: 'delete',
	 		url: '/users/' + ids.join("-"),
	 		success: function (){
	 			location.reload();
	 		} 
	 	})
	 }
})