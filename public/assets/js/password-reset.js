$("#modifyForm").on("submit", function (){
	var formData = $(this).serialize();
	$.ajax({
		type: 'put',
		url: '/users/password',
		data: formData,
		success: function (){
			location.href = "/admin/login.html";
		},
		error: function (xhr){
			var err = JSON.parse(xhr.responseText).message;
			$(".alert-error").show().html("<strong>错误！</strong>" + err);
		}
	})
	return false;
});