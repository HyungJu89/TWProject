<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="cp" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
	<script src=""></script>
	<script src="${cp}/resources/js/channel/channelCreate.js"></script>
</head>
<body>

	
		검색할 스트리머<input id="channelId"> 
		<input type="submit"	value="검색" id="searchChannel">
	

	<div id="searchChannelInfo">
		<div>
			<div id="channelName"></div>
			<div id="channelImg"></div>
		</div>
		<div id="channelText"></div>
		<div id="channelCreate"></div>
	</div>




</body>
</html>