<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원가입</title>
</head>
<body>
    <h2>회원가입</h2>
    <form action="signUp" method="post">
        <label for="username">닉네임:</label>
        <input type="text" id="nickname" name="userName" required><br><br>
        
        <label for="email">이메일:</label>
        <input type="email" id="email" name="userEmail" required><br><br>
        
        <label for="password">비밀번호:</label>
        <input type="password" id="password" name="userPw" required><br><br>
        <select id="cex" name="userGender">
        <option value="남">남</option>
        <option value="여">여</option>
        </select>
        <label for="age">나이:</label>
        <input type="number" id="userAge" name="userAge" required><br><br>	
        <input type="submit" value="가입하기">
    </form>
</body>
</html>

