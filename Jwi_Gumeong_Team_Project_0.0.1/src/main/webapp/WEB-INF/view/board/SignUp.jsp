<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원가입</title>
</head>
<body>
    <h2>회원가입</h2>
    <form action="signup" method="post">
        <label for="username">닉네임:</label>
        <input type="text" id="nickname" name="userName" required><br><br>
        
        <label for="email">이메일:</label>
        <input type="email" id="email" name="userEmail" required><br><br>
        
        <label for="password">비밀번호:</label>
        <input type="password" id="password" name="userPw" required><br><br>
        
        <label for="gender">성별</label> 
		 <select class="box" name="userGender">
			<option value="남">남</option>
			<option value="여">여</option>
		 </select> <br><br>
		 
		<label for="age">나이:</label>
        <input type="number" id="age" name="userAge" required><br><br>
        
        
        <input type="submit" value="가입하기">
        
        
    </form>
</body>
</html>