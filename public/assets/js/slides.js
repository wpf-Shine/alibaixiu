$('#file').on('change', function (){
	var file = this.files[0];
	var formData = new FormData();
	formData.append('image', file);
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response){
			$("#image").val(response[0].image);
		}
	});
});

$("#slidesForm").on("submit", function (){
	var formData = $(this).serialize();
	$.ajax({
		type: 'post',
		url: '/slides',
		data: formData,
		success: function (){
			location.reload();
		}
	})
	return false;
});

$.ajax({
	type: 'get',
	url: '/slides',
	success: function (response){
		var html = template('slideTpl', {
			data: response
		});
		$("#slideBox").html(html);
	}
});

$("#slideBox").on("click", ".btnDEL", function (){
	var id = $(this).attr("data-id");
	if(confirm("您确定要删除吗？")){
		$.ajax({
			type: 'delete',
			url: '/slides/' + id,
			success: function (){
				location.reload();
			}
		});
	}
});