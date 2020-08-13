$("#logo").on("change", function(){
	var file = this.files[0];
	var formData = new FormData();
	formData.append('logo', file);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response){
			$("#hiddenLogo").val(response[0].logo);
			$("#img").prop('src', response[0].logo)
		}
	})
});

$("#settingsForm").on("submit", function (){
	var formData = $(this).serialize();
	$.ajax({
		type: 'post',
		url: '/settings',
		data: formData,
		success: function (){
			location.reload();
			alert("保存成功");
		}
	})
	return false;
});

$.ajax({
	type: 'get',
	url: '/settings',
	success: function(response){
		if(response){
			//将logo地址存储在隐藏域中
			$("#hiddenLogo").val(response.logo);
			$("#img").prop("src", response.logo);
			$("input[name='title'").val(response.title);
			$("input[name='comment'").prop('checked', response.comment);
			$("input[name='review'").prop('checked', response.review);
		}
		
	}
})