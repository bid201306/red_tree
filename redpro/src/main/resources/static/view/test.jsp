<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Red Tree Project Test</title>
</head>
<body>
<p>${now},it's work</p>
<p>${words}</p>
<table>
    <tr>
        <td>id</td>
        <td>name</td>
    </tr>
    <c:forEach items="${userList}" var="user">
        <tr>
            <td>${user.staffId}</td>
            <td>${user.username}</td>
        </tr>
    </c:forEach>
</table>
</body>
</html>