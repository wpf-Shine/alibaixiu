$("#modifyForm").on("submit", function (){
	var formData = $(this).serialize();
	console.log(formData);
	$.ajax({
		type: 'put',
		url: '/users/password',
		data: formData,
		success: function (){
			location.href = "/admin/login.html";
		},
		error: function (xhr){
			var message = JSON.parse(xhr.responseText).message;
			alert(message);
		}
	})
	return false;
});