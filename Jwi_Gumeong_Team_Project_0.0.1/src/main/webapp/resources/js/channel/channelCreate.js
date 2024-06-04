$(document).ready(function() {
	
	$('#searchChannel').click(function() {
		channelId = $('#channelId').val();
		$.ajax({
			url: "/channelRest/search",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify({
				channelId:channelId
			}),
			success: function(response) {
				content = response.content;
				if(content.channelId != null){
					$('#channelName').html('채널명 : ' + content.channelName);
					$('#channelImg').html('<img src="' + content.channelImageUrl + '">');
					$('#channelText').html('구독자 수' + content.followerCount);
					$('#channelCreate').html('검색버튼 : <input type="submit" id = "channelCreateSubmit">');
				} else {
					alert('존재하지않는 스트리머입니다..');
				}
			},
			error: function(xhr, status, error) {
				alert('스트리머 검색중 오류가 발생하였습니다.');
				console.error(xhr, status, error);
			}
		});

	});
	
	    $('#channelCreate').on('click', '#channelCreateSubmit', function() {
			if(content.followerCount < 150){
					alert('님이 검색한사람 너무 하꼬임')
					return;
					}
						$.ajax({
			url: "/channelRest/create",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify({
				channelId:content.channelId,
				channelName:content.channelName,
				channelImageUrl:content.channelImageUrl,
				followerCount:content.followerCount
			}),
			success: function(response) {
				if(response){
					alert('채널 생성완료 생성한 채널로 이동합니다.')
					window.location.href = '/channel/postList/' + content.channelId;
				
				} else {
					alert('이미 생성되어있는 채널입니다. 검색한 채널로 이동합니다.');
					window.location.href = '/channel/postList/' + content.channelId;
					
				}
				
			},
			error: function(xhr, status, error) {
				alert('스트리머 검색중 오류가 발생하였습니다.');
				console.error(xhr, status, error);
			}
		});


    });
});