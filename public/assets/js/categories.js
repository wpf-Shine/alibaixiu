$("#addCategory").on("submit", function (){
	var formData = $(this).serialize();
	$.ajax({
		type: 'post',
		url: '/categories',
		data: formData,
		success: function (){
			location.reload();
		},
		error: function(xhr){
			var err = JSON.parse(xhr.responseText).message;
			$(".alert-error").show();
			$(".alert-error").html("<strong>错误！</strong>" + err);
		}
	})
	//阻止表单的默认提交行为
	return false;
});

//向服务器请求数据
$.ajax({
	type: 'get',
	url: '/categories',
	success: function(response){
		var html = template('categoriesTpl', {
			data: response
		});
		$("#categoriesBox").html(html);
	}
});

//删除单个
$("#categoriesBox").on("click", ".btnDltCategories", function (){
	var id = $(this).attr("data-id");
	if(confirm('您确定要删除吗？')){
		$.ajax({
			type: 'delete',
			url: '/categories/' + id,
			success: function (){
				location.reload();
			}
		})
	}
});

//删除多个
var selectAll = $("#selectAll");
selectAll.on("change", function(){
	var status = $(this).prop("checked");
	if(status){
		$("#deleteMany").attr("disabled", false);
	}else{
		$("#deleteMany").attr("disabled", true);
	}
	$("#categoriesBox").find("input").prop("checked", status);
});

$("#categoriesBox").on("change", function (){
	var inputs = $("#categoriesBox").find("input");
	if(inputs.length == inputs.filter(":checked").length){
		selectAll.prop("checked", true);
	}else{
		selectAll.prop("checked", false);
	}
	if(inputs.filter(":checked").length > 0){
		$("#deleteMany").attr("disabled", false)
	}else{
		$("#deleteMany").attr("disabled", true);
	}
});

$("#deleteMany").on("click", function(){
	var ids = [];
	var checkedUser = $("#categoriesBox").find("input").filter(":checked");
	checkedUser.each(function (index, element){
		ids.push($(element).attr('data-id'));
	});
	if(confirm("您确定要进行批量删除操作吗？")){
		$.ajax({
			type: 'delete',
			url: '/categories/' + ids.join('-'),
			success: function (){
				location.reload();
			}
		})
	}
});

//通过事件委托给编辑按钮绑定点击事件
$("#categoriesBox").on("click", ".btnEdit", function (){
	var id = $(this).siblings().attr("data-id");
	$.ajax({
		type: 'get',
		url: '/categories/' + id,
		success: function (response){
			var html = template('modifyTpl', response);
			$("#modifyBox").html(html);
		}
	});
});

$("#modifyBox").on("submit", "#modifyCategory", function(){
	var formData = $(this).serialize();
	var id = $(this).attr("data-id");
	$.ajax({
		type: 'put',
		url: '/categories/' + id,
		data: formData,
		success: function (){
			location.reload();
		}
	});
	return false;
});