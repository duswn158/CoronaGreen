<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>QNA</title>
<link href="resources/css/green_qna_select.css" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css2?family=Lato&family=Open+Sans&display=swap" rel="stylesheet">

<!-- 썸머노트 -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>

<script>
$(document).ready(function() {
	  $('#summernote').summernote({
 	    	placeholder: 'content',
	        minHeight: 200,
	        maxHeight: 200,
	        focus: true, 
	        lang : 'ko-KR'
	  });
});
</script>
 
</head>
<body>

	
	
    <%@ include file="/WEB-INF/views/header.jsp" %>
    
    <section class="green__board__select">
    <input type="hidden" id="alarm_boardno" value="${list.boardno }">
	<input type="hidden" id="recipient" value="${list.id }"/>
	<input type="hidden" id="sender" value="${dto.id }"/>
	<input type="hidden" id="qna_title" value="${list.title}"/>
        <div class="board__title">
            <div class="title"><p>TITLE</p></div>
            <div class="title__name">${list.title }</div>
        </div>
        <div class="line"></div>
        <div class="board__content">
            <div class="content">${list.content }</div>
            <c:choose>
            	<c:when test="${dto.id eq list.id }">
		            <div class="content__buttons">
		                <input class="button" type="button" name="" value="UPDATE" onclick="location.href='qnaupdate.do?boardno=${list.boardno}'" />
		                <input class="button" type="button" name="" value="DELETE" onclick="location.href='qnadelete.do?boardno=${list.boardno}'" />
		            </div>
	            </c:when>
	            <c:otherwise></c:otherwise>
            </c:choose>
        </div>
        <div class="line"></div>
        <c:choose>
        	<c:when test="${relist.content != null }">
		        <div class="board__reply">
		            <div class="reply__admin"><p>Admin</p></div>
		            <div class="reply__comments">${relist.content }</div>
		        </div>
	        </c:when>
	        <c:when test="${dto.role eq 'ADMIN' }">
	        	<form action="qnaReinsert.do" class="class__qnaReinsert">
			        <div class="line"></div>
			        <div class="board__reply__insert">
			            <div class="reply__admin">Admin</div>
			            <div class="reply__comments__insert">
			            	<input type="hidden" name="boardno" value="${list.boardno }">
			                <textarea class="comments__text" required="required" name="content" id="summernote">text</textarea>
			                <div class="reply__buttons">
			                    <input class="button" type="button" value="SUBMIT" onclick="sendMessage()" />
			                </div>
			            </div>
			        </div>
		        </form>
	        </c:when>
	        <c:otherwise></c:otherwise>
        </c:choose>
        <script src="resources/js/green_socket_qnare.js"></script>
    </section> 
	
	<%@ include file="/WEB-INF/views/footer.jsp" %>

</body>

<style>
p {
	margin-top: 15px;
}
</style>
</html>