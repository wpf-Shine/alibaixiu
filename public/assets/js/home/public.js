//发送请求 索要随机推荐数据
$.ajax({
	type: 'get',
	url: '/posts/random',
	success: function (response){
		var publicTpl = `
		{{each data}}
		<li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title.substr(0,20)}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
         </li>
         {{/each}}
		`;
		var html = template.render(publicTpl, {
			data: response
		});
		$("#randomBox").html(html);
	}
});

//处理日期格式
function formateDate(date) {
	//将日期时间字符串转换为日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

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

//索要最新评论数据
$.ajax({
	type: 'get',
	url: '/comments/lasted',
	success: function (response){
		var lastedTpl = `
		{{each data}}
		<li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
         </li>
         {{/each}}
		`;
		var html = template.render(lastedTpl, {data: response});
		$("#commentBox").html(html);
	}
});

//文章分类列表数据
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (response){
		var navTpl = `
		{{each data}}
        <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
		`;
		var html = template.render(navTpl, {data: response});
		$("#navBox").html(html);
		$("#topNavBox").html(html);
	}
});

$('.search form').on('submit', function(){
	var key = $(this).find('.keys').val();
	if(key.trim().length == 0){
		alert('请输入关键字');
	}
	location.href = '/search.html?key=' + key;
	return false;
})