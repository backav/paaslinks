$(document.body).ready(function(){

	var lastClickTime=0;
	var clickTimer;
	$(document.body).on('click','.backav-paas-links-a',function(){

		var appid = $(this).attr('data-app');

		var now=new Date();
		if (now.getTime()-lastClickTime<500) {
			clearTimeout(clickTimer);
			var url ='log-service/#/apps/'+appid+'/all-tasks'
			window.open(url)
			return;
		};

		clickTimer=setTimeout(function(){
			var url='../log-service/#/realtime-log/'+appid;
			window.open(url)
		},500);
		lastClickTime=now.getTime();
	});

	function add_links(){
		if(location.hash.indexOf('apps') < 0){
			$('.backav-paas-links-a').remove();
			return;
		}

		var $apps = $('.app-list li')
		if ($apps.length<=0) {
			setTimeout(add_links,1000)
			return;
		};

		$apps.each(function(){
			var p = $(this).position()
			$(document.body).append($('<a class="backav-paas-links-a" data-app="'+$('a',this).attr('href').replace('#/apps/','')+'" target="_blank" style="cursor:pointer;display:block;position:absolute;top:'+(p.top+10)+'px;left:'+(p.left-30)+'px;color:#12cb53;font-size:12px;" title="点击:实时  双击:文件">日志</a>'));
		});
	}

	add_links();
	window.onhashchange=add_links
})