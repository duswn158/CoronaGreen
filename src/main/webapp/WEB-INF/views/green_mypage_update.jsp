<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>


<link rel="stylesheet" href="resources/css/green_mypage_update.css">
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript">
	function pw_check(){
		var pw=$("input[name=pw]").val();
		var pw_check=$("input[name=passwordconfirm]").val();
		var member_pw="${dto.pw}";
		if(pw != pw_check){
			alert("비밀번호가 서로 다릅니다")
			$("input[name=pw]").val("");
			$("input[name=passwordconfirm]").val("");
			$("input[name=passwordconfirm]").focus();
		}else{
			
			if(pw == member_pw){
				alert("기존 비밀번호와 같을 수 없습니다");
				$("input[name=pw]").val("");
				$("input[name=pw]").focus();
			}else{
				document.getElementsByClassName("update__form")[0].submit();
			}
		}					
	}
</script>
</head>
<body>

	<%@ include file="/WEB-INF/views/header.jsp" %>
	
	<section class="update__section">
        <nav class="update__side__nav">
            <p class="update__side__nav__p">
                <a href="myprofile_update.do" class="nav__link">EDIT MY PROFILE</a>
            </p>
            <p class="update__side__nav__p">
                <a href="#" class="nav__link">BOOKMARK</a>
            </p>
        </nav>
	    <div class="update__form__wrap">
	        <form action="mypage_updateres.do" method="post" class="update__form">
	            <ul class="update__form__ul">
	                <li class="form__title">
	                    UPDATE
	                </li>
	                <li class="update__form__li">
                        <span class="form__text">ID</span>
	                    <input type="text" name="id" readonly value="${dto.id }">
	                </li>
	                <li class="update__form__li">
                        <span class="form__text">PW</span>
	                    <input type="text" name="pw"  required="required">
	                </li>
	                <li class="update__form__li">
                        <span class="form__text"></span>
	                    <input type="text" name="passwordconfirm" class="password__confirm"  required="required">
	                </li>
	                <li class="update__form__li">
                        <span class="form__text">EMAIL</span>
	                    <input type="text" name="email" readonly value="${dto.email }">
	                </li>
	                <li class="update_                                                                                                                  _form__li">
                        <span class="form__text">P.H</span>
	                    <input type="text" name="phone" readonly value="${dto.phone }">
	                </li>
	                <li class="update__form__li">
                        <span class="form__text">ADDRESS</span>
	                    <input type="text" name="address" readonly value="${dto.address }">
	                </li>
	                <li class="update__form__li update__form__li__submit">
	                   <input class="update__submit" type="button" value="UPDATE" onclick="pw_check()"/>
	                </li>
	            </ul>
	        </form>
	    </div>
	</section>

	<%@ include file="/WEB-INF/views/footer.jsp" %>

</body>
</html>