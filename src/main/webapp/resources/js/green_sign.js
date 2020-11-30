function execPostCode() {
	new daum.Postcode({
		oncomplete : function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 주소 변수
            var addr = '';
            // 참고항목 변수
            var extraAddr = '';

            // 사용자가 선택한 주소가 도로명주소일 때
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                // 사용자가 선택한 주소가 지번주소일 때 
                addr = data.jibunAddress;
            }

			// 우편번호와 주소 정보를 해당 필드에 넣는다.

			$("#roadFullAddr1").val(data.zonecode);
			$("#roadFullAddr2").val(addr);
			
			$("#addr_check").text("");
			$("#roadFullAddr1").css("outline-color", "#ddd");
			$("#roadFullAddr1").css("border", "1px solid #ddd");
			$("#roadFullAddr2").css("outline-color", "#ddd");
			$("#roadFullAddr2").css("border", "1px solid #ddd");

			/*
			 * document.getElementById('signUpUserPostNo').value =
			 * data.zonecode; //5자리 새우편번호 사용
			 * document.getElementById('signUpUserCompanyAddress').value =
			 * fullRoadAddr;
			 * document.getElementById('signUpUserCompanyAddressDetail').value =
			 * data.jibunAddress;
			 */
		}
	}).open();
}

var check = false;
var array = new Array(6).fill(false);
/*
 * $("#user_id").blur(function(){ if ($('#user_id').val() == "") {
 * $('#id_check').text('아이디를 입력해주세요'); $('#id_check').css('color', 'red');
 * array[0] = false; } }) $("#user_id").keyup(function() { // id = "id_reg" /
 * name = "userId" var user_id = $('#user_id').val(); $.ajax({ url :
 * 'idcheck.do?id='+user_id, type : 'get', success : function(data) { var idJ =
 * /^[A-Za-z0-9]{6,12}$/; var idJ2 = /[A-Za-z0-9]/ var hangle = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
 * var hangle2 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{6,12}$/;
 * 
 * if (data == 1) { // 1 : 아이디가 중복되는 문구 $("#id_check").text("사용중인 아이디입니다");
 * $("#id_check").css("color", "red"); array[0] = false; } else {
 * 
 * if(idJ.test(user_id) && !hangle.test(user_id)){ // 0 : 아이디 길이 / 문자열 검사
 * $("#id_check").text("사용가능한 아이디입니다"); $('#id_check').css('color', 'blue'); //
 * $("#reg_submit").prop("disabled", false); array[0] = true;
 * 
 *  } else if(user_id == ""){
 * 
 * $('#id_check').text('아이디를 입력해주세요'); $('#id_check').css('color', 'red');
 * array[0] = false; } else if((hangle.test(user_id) && hangle2.test(user_id)) ||
 * (idJ.test(user_id)) || ((user_id.search(idJ2) >=0 && user_id.search(hangle)
 * >=0)) && user_id.length >= 6) { $('#id_check').text("아이디는 영문 숫자만 가능합니다.");
 * $('#id_check').css('color', 'red'); array[0] = false; } else {
 * $('#id_check').text("아이디는 6~12자 이내로 입력해주세요."); $('#id_check').css('color',
 * 'red'); array[0] = false; } } var odd = function(element) { return (element ==
 * false); }; if (array.some(odd) == true) { check = false; } else { check =
 * true; }
 * 
 * 
 * 
 * 
 * if (check) { $("#reg_submit").prop("disabled", false); } else {
 * $("#reg_submit").prop("disabled", true); } }, error : function() {
 * console.log("실패"); } });
 * 
 * 
 * });
 */

var reg1 = /^[a-z0-9]{8,20}$/;
var reg2 = /[a-z]/g;
var reg3 = /[0-9]/g;

var num = /[0-9]/g;
var eng = /[a-z]/ig;
var spe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
var blank = /₩s/;



/*
 * $("#mypw1").blur(function(){ var user_pw1 = $("#mypw1").val().trim(); var
 * user_pw2 = $("#mypw2").val().trim(); if (user_pw1 == "") {
 * $("#pw_check1").text("비밀번호를 입력해주세요."); $('#pw_check1').css('color', 'red');
 * array[1] = false; } else if (reg1.test(user_pw1) == false) {
 * $("#pw_check1").text("비밀번호 8~20자 이내로 입력해주세요."); $('#pw_check1').css('color',
 * 'red'); array[1] = false; } else if (user_pw1.search(reg2) < 0 ||
 * user_pw1.search(reg3) < 0) { $("#pw_check1").text("숫자와 영문을 조합해주세요.");
 * $('#pw_check1').css('color', 'red'); array[1] = false; } else {
 * $("#pw_check1").text(""); array[1] = true; }
 * 
 * if((user_pw1 != user_pw2) && user_pw2 != "") { $("#pw_check2").text("비밀번호가
 * 일치하지 않습니다."); $('#pw_check2').css('color', 'red'); array[2] = false; } else
 * if ((user_pw1 == user_pw2) && user_pw2 != "") { $("#pw_check2").text("");
 * array[1] = true; }
 *  })
 * 
 * $("#mypw2").blur(function(){ var user_pw1 = $("#mypw1").val().trim(); var
 * user_pw2 = $("#mypw2").val().trim(); if (array[1] == true) { if (user_pw2 ==
 * "") { $("#pw_check2").text("비밀번호 재확인을 입력해주세요."); $('#pw_check2').css('color',
 * 'red'); array[2] = false; } else if(user_pw1 != user_pw2) {
 * $("#pw_check2").text("비밀번호가 일치하지 않습니다."); $('#pw_check2').css('color',
 * 'red'); array[2] = false; } else { $("#pw_check2").text(""); array[2] = true; } } })
 * 
 */
var phoneJ = /(^01([0|1|6|7|8|9]))([0-9]{3,4})([0-9]{4})$/;
/*
 * $("#myph").blur(function(){ var myph = $("#myph").val().trim();
 * console.log(myph); if (myph == "") { $("#myph_check").text("핸드폰 번호를
 * 입력해주세요."); $("#myph_check").css("color","red"); array[3] = false; } else if
 * (phoneJ.test(myph) == false) { $("#myph_check").text("핸드폰 번호를 정확히 입력해주세요");
 * $("#myph_check").css("color","red"); array[3] = false; } else {
 * $("#myph_check").text(""); array[3] = true; } })
 */

var mailJ = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
/*
 * $("#email").blur(function(){ var email = $("#email").val().trim();
 * console.log(email); if (email == "") { $("#email_check").text("이메일을
 * 입력해주세요."); $("#email_check").css("color", "red"); array[5] = false; } else if
 * (mailJ.test(email) == false) { $("#email_check").text("이메일을 정확히 입력해주세요.");
 * $("#email_check").css("color", "red"); array[5] = false; } else {
 * $("#email_check").text(""); array[5] = true; } })
 */

/*
 * $("#email").blur(function(){ if ($('#email').val() == "") {
 * $('#email_check').text('이메일을 입력해주세요'); $('#email_check').css('color', 'red');
 * array[5] = false; } }) $("#email").blur(function() { // id = "id_reg" / name =
 * "userId" var user_email = $('#email').val().trim(); $.ajax({ url :
 * 'emailcheck.do?email='+user_email, type : 'get', success : function(data) {
 * var mailJ =
 * /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
 * 
 * if (data == 1) { // 1 : 아이디가 중복되는 문구 $("#email_check").text("사용중인 이메일입니다.");
 * $("#email_check").css("color", "red"); array[5] = false; } else {
 * 
 * if(mailJ.test(user_email)){ // 0 : 아이디 길이 / 문자열 검사
 * $("#email_check").text("사용가능한 이메일입니다."); $('#email_check').css('color',
 * 'blue'); // $("#reg_submit").prop("disabled", false); array[5] = true;
 * 
 *  } else if(user_email == ""){
 * 
 * $('#email_check').text('이메일을 입력해주세요.'); $('#email_check').css('color',
 * 'red'); array[5] = false; } else { $('#email_check').text("정확한 이메일을
 * 입력해주세요."); $('#email_check').css('color', 'red'); array[5] = false; }
 *  } var odd = function(element) { return (element == false); }; if
 * (array.some(odd) == true) { check = false; } else { check = true; }
 * 
 * 
 * 
 * 
 * if (check) { $("#reg_submit").prop("disabled", false); } else {
 * $("#reg_submit").prop("disabled", true); } }, error : function() {
 * console.log("실패"); } });
 * 
 * 
 * });
 */

$("input").blur(function() {
	var odd = function(element) {
		return (element == false);
	};
	if (array.some(odd) == true) {
		check = false;
	} else {
		check = true;
	}

	if (check) {
		//$("#reg_submit").prop("disabled", false);
	} else {
		//$("#reg_submit").prop("disabled", true);
	}
})

var user_email = $('#email').val().trim();
if ($("#email").val() != "") {
	$.ajax({
				url : 'emailcheck.do?email=' + user_email,
				type : 'get',
				success : function(data) {
					var user_email = $("#email").val();
					var mailJ = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

					if (data == 1) {
						// 1 : 아이디가 중복되는 문구
						$("#email_check").text("사용중인 이메일입니다.");
						$("#email_check").css("color", "red");
						$('#email').css("outline-color", "red");
						$('#email').css("border", "1px solid red");
						array[5] = false;
					} else {

						if (mailJ.test(user_email)) {
							// 0 : 아이디 길이 / 문자열 검사
							$("#email_check").text("사용가능한 이메일입니다.");
							$('#email_check').css('color', 'blue');
							$('#email').css("outline-color", "#ddd");
							$('#email').css("border", "1px solid #ddd");
							// $("#reg_submit").prop("disabled", false);
							array[5] = true;

						} else if (user_email == "") {

							$('#email_check').text('이메일을 입력해주세요.');
							$('#email_check').css('color', 'red');
							$('#email').css("outline-color", "red");
							$('#email').css("border", "1px solid red");
							array[5] = false;
						} else {
							$('#email_check').text("정확한 이메일을 입력해주세요.");
							$('#email_check').css('color', 'red');
							$('#email').css("outline-color", "red");
							$('#email').css("border", "1px solid red");
							array[5] = false;
						}

					}
					var odd = function(element) {
						return (element == false);
					};
					if (array.some(odd) == true) {
						check = false;
					} else {
						check = true;
					}

					if (check) {
						//$("#reg_submit").prop("disabled", false);
					} else {
						//$("#reg_submit").prop("disabled", true);
					}
				},
				error : function() {
				}
			});

}

// 아이디 체크
var id = function() {
	if ($('#user_id').val() == "") {
		$('#id_check').text('아이디를 입력해주세요');
		$('#id_check').css('color', 'red');
		$("#user_id").css("outline-color", "red");
		$("#user_id").css("border", "1px solid red");
		array[0] = false;
	}
	var user_id = $('#user_id').val();
	$.ajax({
		url : 'idcheck.do?id=' + user_id,
		type : 'get',
		success : function(data) {
			var idJ = /^[A-Za-z0-9]{6,12}$/;
			var idJ2 = /[A-Za-z0-9]/
			var hangle = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
			var hangle2 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{6,12}$/;

			if (data == 1) {
				// 1 : 아이디가 중복되는 문구
				$("#id_check").text("사용중인 아이디입니다");
				$("#id_check").css("color", "red");
				$("#user_id").css("outline-color", "red");
				$("#user_id").css("border", "1px solid red");
				array[0] = false;
			} else {

				if (idJ.test(user_id) && !hangle.test(user_id)) {
					// 0 : 아이디 길이 / 문자열 검사
					$("#id_check").text("사용가능한 아이디입니다");
					$('#id_check').css('color', 'blue');
					$("#user_id").css("outline-color", "#ddd");
					$("#user_id").css("border", "1px solid #ddd");
					// $("#reg_submit").prop("disabled", false);
					array[0] = true;
				} else if (user_id == "") {

					$('#id_check').text('아이디를 입력해주세요');
					$('#id_check').css('color', 'red');
					$("#user_id").css("outline-color", "red");
					$("#user_id").css("border", "1px solid red");
					array[0] = false;
				} else if ((hangle.test(user_id) && hangle2.test(user_id))
						|| (idJ.test(user_id))
						|| ((user_id.search(idJ2) >= 0 && user_id
								.search(hangle) >= 0)) && user_id.length >= 6) {
					$('#id_check').text("아이디는 영문 숫자만 가능합니다.");
					$('#id_check').css('color', 'red');
					$("#user_id").css("outline-color", "red");
					$("#user_id").css("border", "1px solid red");
					array[0] = false;
				} else {
					$('#id_check').text("아이디는 6~12자 이내로 입력해주세요.");
					$('#id_check').css('color', 'red');
					$("#user_id").css("outline-color", "red");
					$("#user_id").css("border", "1px solid red");
					array[0] = false;
				}
			}
			var odd = function(element) {
				return (element == false);
			};
			if (array.some(odd) == true) {
				check = false;
			} else {
				check = true;
			}

			if (check) {
				//$("#reg_submit").prop("disabled", false);
			} else {
				//$("#reg_submit").prop("disabled", true);
			}

		},
		error : function() {
		}
	});
	return array[0];
}
var user_pw1 = $("#mypw1").val();
var user_pw2 = $("#mypw2").val();
// 비밀번호 체크
var pw = function() {
	var real = false;
	var user_pw1 = $("#mypw1").val().trim();
	var user_pw2 = $("#mypw2").val().trim();
	if (user_pw1 == "") {
		$("#pw_check1").text("비밀번호를 입력해주세요.");
		$('#pw_check1').css('color', 'red');
		$("#mypw1").css("outline-color", "red");
		$("#mypw1").css("border", "1px solid red");
		array[1] = false;
	} else if (user_pw1.length < 8 || user_pw1.length > 20) {
		$("#pw_check1").text("비밀번호 8~20자 이내로 입력해주세요.");
		$("#pw_check2").text("");
		$('#pw_check1').css('color', 'red');
		$("#mypw1").css("outline-color", "red");
		$("#mypw1").css("border", "1px solid red");
		array[1] = false;
		return real;
	} else if ((user_pw1.search(num) < 0 && user_pw1.search(eng) < 0) || (user_pw1.search(eng) < 0 && user_pw1.search(spe) < 0) || (user_pw1.search(spe) < 0 && (user_pw1.search(num) < 0))) {
		$("#pw_check1").text("영문, 숫자, 특수문자 중 2가지 이상 혼합하여 입력해주세요.");
		$('#pw_check1').css('color', 'red');
		$("#pw_check2").text("");
		$("#mypw1").css("outline-color", "red");
		$("#mypw1").css("border", "1px solid red");
		array[1] = false;
		return real;
	} else {
		$("#pw_check1").text("");
		$("#mypw1").css("outline-color", "#ddd");
		$("#mypw1").css("border", "1px solid #ddd");
		array[1] = true;
		real = true;
	}

	if ((user_pw1 != user_pw2) && user_pw2 != "") {
		$("#pw_check2").text("비밀번호가 일치하지 않습니다.");
		$('#pw_check2').css('color', 'red');
		$("#mypw2").css("outline-color", "red");
		$("#mypw2").css("border", "1px solid red");
		array[2] = false;
	} else if ((user_pw1 == user_pw2) && user_pw1 != "") {
		$("#pw_check2").text("");
		$("#mypw2").css("outline-color", "#ddd");
		$("#mypw2").css("border", "1px solid #ddd");
		array[2] = true;
		//real = true;
	}
	return real;
}

// 비밀번호 확인 체크
var pwchk = function() {
	var real = false;
	var user_pw1 = $("#mypw1").val().trim();
	var user_pw2 = $("#mypw2").val().trim();
	if (array[1] == true) {
		if ((user_pw1.length < 8 || user_pw1.length > 20) && (user_pw2 == "")){
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = false;
		} else if (user_pw2 == "") {
			$("#pw_check2").text("비밀번호 재확인을 입력해주세요.");
			$('#pw_check2').css('color', 'red');
			$("#mypw2").css("outline-color", "red");
			$("#mypw2").css("border", "1px solid red");
			array[2] = false;
		} else if ((user_pw1 != user_pw2) && user_pw1 == "") {
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = false;
		} else if (user_pw1.length < 8) {
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = false
		} else if (user_pw1 != user_pw2) {
			$("#pw_check2").text("비밀번호가 일치하지 않습니다.");
			$('#pw_check2').css('color', 'red');
			$("#mypw2").css("outline-color", "red");
			$("#mypw2").css("border", "1px solid red");
			array[2] = false;
		} else if (user_pw1 == ""){
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = false;
		} else {
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = true;
			real = true;
		}
	} else {
		if ((user_pw1.length < 8 || user_pw1.length > 20) && (user_pw2 == "")){
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = false;
		} else if (user_pw2 == "") {
			$("#pw_check2").text("비밀번호 재확인을 입력해주세요.");
			$('#pw_check2').css('color', 'red');
			$("#mypw2").css("outline-color", "red");
			$("#mypw2").css("border", "1px solid red");
			array[2] = false;
		} else if ((user_pw1 != user_pw2) && user_pw1 == "") {
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = false;
		} else if (user_pw1.length < 8) {
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = false
		} else if (user_pw1 != user_pw2) {
			$("#pw_check2").text("비밀번호가 일치하지 않습니다.");
			$('#pw_check2').css('color', 'red');
			$("#mypw2").css("outline-color", "red");
			$("#mypw2").css("border", "1px solid red");
			array[2] = false;
		} else if (user_pw1 == ""){
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = false;
		} else {
			$("#pw_check2").text("");
			$("#mypw2").css("outline-color", "#ddd");
			$("#mypw2").css("border", "1px solid #ddd");
			array[2] = true;
			real = true;
		}
		
	}
	return real;
}

// 핸드폰번호 체크
var phone = function() {
	var real = false;
	var myph = $("#myph").val().trim();
	if (myph == "") {
		$("#myph_check").text("핸드폰 번호를 입력해주세요.");
		$("#myph_check").css("color", "red");
		$("#myph").css("outline-color", "red");
		$("#myph").css("border", "1px solid red");
		array[3] = false;
	} else if (phoneJ.test(myph) == false) {
		$("#myph_check").text("핸드폰 번호를 정확히 입력해주세요");
		$("#myph_check").css("color", "red");
		$("#myph").css("outline-color", "red");
		$("#myph").css("border", "1px solid red");
		array[3] = false;
	} else {
		$("#myph_check").text("");
		$("#myph").css("outline-color", "#ddd");
		$("#myph").css("border", "1px solid #ddd");
		array[3] = true;
		real = true;
	}
	return real;
}

// 이메일 체크
var email = function() {
	var user_email1 = $("#email").val().trim();
	if ($('#email').val() == "") {
		$('#email_check').text('이메일을 입력해주세요');
		$('#email_check').css('color', 'red');
		$('#email').css("outline-color", "red");
		$('#email').css("border", "1px solid red");
		array[5] = false;
	}
	$.ajax({
				url : 'emailcheck.do?email=' + user_email1,
				type : 'get',
				success : function(data) {
					var mailJ = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

					if (data == 1) {
						$("#email_check").text("사용중인 이메일입니다.");
						$("#email_check").css("color", "red");
						$('#email').css("outline-color", "red");
						$('#email').css("border", "1px solid red");
						array[5] = false;
					} else {

						if (mailJ.test(user_email1)) {
							$("#email_check").text("사용가능한 이메일입니다.");
							$('#email_check').css('color', 'blue');
							$('#email').css("outline-color", "#ddd");
							$('#email').css("border", "1px solid #ddd");
							// $("#reg_submit").prop("disabled", false);
							array[5] = true;
						} else if (user_email1 == "") {

							$('#email_check').text('이메일을 입력해주세요.');
							$('#email_check').css('color', 'red');
							$('#email').css("outline-color", "red");
							$('#email').css("border", "1px solid red");
							array[5] = false;
						} else {
							$('#email_check').text("정확한 이메일을 입력해주세요.");
							$('#email_check').css('color', 'red');
							$('#email').css("outline-color", "red");
							$('#email').css("border", "1px solid red");
							array[5] = false;
						}

					}
					var odd = function(element) {
						return (element == false);
					};
					if (array.some(odd) == true) {
						check = false;
					} else {
						check = true;
					}

					if (check) {
						//$("#reg_submit").prop("disabled", false);
					} else {
						//$("#reg_submit").prop("disabled", true);
					}
				},
				error : function() {
				}
			});
	return array[5];
}

var addr = function() {
	if ($("#roadFullAddr1").val() == "" ||
			$("#roadFullAddr2").val() == "" ) {
		$("#roadFullAddr1").css("outline-color", "red");
		$("#roadFullAddr1").css("border", "1px solid red");
		$("#roadFullAddr2").css("outline-color", "red");
		$("#roadFullAddr2").css("border", "1px solid red");
		array[4] = false;
	} else {
		$("#roadFullAddr1").css("outline-color", "#ddd");
		$("#roadFullAddr1").css("border", "1px solid #ddd");
		$("#roadFullAddr2").css("outline-color", "#ddd");
		$("#roadFullAddr2").css("border", "1px solid #ddd");
		array[4] = true;
	}
}




var blank_del = function() {
	var user_pw1 = $("#mypw1");
	user_pw1.val(user_pw1.val().replace(/(\s*)/g,""));
}

var blank_del2 = function() {
	var user_pw2 = $("#mypw2");
	user_pw2.val(user_pw2.val().replace(/(\s*)/g,""));
}
$("#user_id").blur(function(){
	var user_id = $("#user_id");
	user_id.val(user_id.val().replace(/(\s*)/g,""));
	id();
})
$("#user_id").keyup(function() {
	var user_id = $("#user_id");
	user_id.val(user_id.val().replace(/(\s*)/g,""));
	id();
})
$("#mypw1").blur(function() {
	blank_del();
	pw();
})
$("#mypw2").blur(function() {
	blank_del2();
	pwchk();
})
$("#myph").blur(function() {
	var user_ph = $("#myph");
	user_ph.val(user_ph.val().replace(/(\s*)/g,""));
	phone();
})
$("#email").keyup(function() {
	var user_email = $("#email");
	user_email.val(user_email.val().replace(/(\s*)/g,""));
	email();
})

$("#email").blur(function() {
	var user_email = $("#email");
	user_email.val(user_email.val().replace(/(\s*)/g,""));
	email();
})

// 휴대폰 인증
var code = "";
var code_check_keyup = false;
var code_check = false;
$("#phone_code_send").click(function(){
	var phone = $("#myph").val();
	if (array[3]) {
	$.ajax({
		url : 'phonesend.do?phone=' + phone,
		type : 'get',
		success: function(data) {
			code = data;
			console.log(code);
			alert("인증번호가 발송되었습니다.");
			$("#phone_code_check").text("인증번호를 입력해주세요.");
			$("#phone_code_check").css("color","red");
			$("#phonecode").css("outline-color", "red");
			$("#phonecode").css("border", "1px solid red");
			$("#myph_check").text("");
			code_check = true;
			$("#phonecode").keyup(function(){
				if ($.trim(data) == $("#phonecode").val()) {
					$("#phone_code_check").text("인증번호가 일치합니다");
					$("#phone_code_check").css("color", "blue");
					$("#phonecode").css("outline-color", "#ddd");
					$("#phonecode").css("border", "1px solid #ddd");
					$("#phone_code_check_button").prop("disabled",false);
				} else {
					$("#phone_code_check").text("인증번호가 일치하지 않습니다.");
					$("#phone_code_check").css("color", "red");
					$("#phonecode").css("outline-color", "red");
					$("#phonecode").css("border", "1px solid red");
					$("#phone_code_check_button").prop("disabled",true);
				}
			})
		}, error: function(data) {
			alert("실패!");
		}
	})
	} else {
		var myph = $("#myph").val().trim();
		if (myph == "") {
			$("#myph_check").text("인증번호를 받기 위해서는 핸드폰 번호를 입력해주세요.");
			$("#myph_check").css("color", "red");
		} else if (phoneJ.test(myph) == false) {
			$("#myph_check").text("인증번호를 받기 위해서는 핸드폰 번호를 정확히 입력해주세요");
			$("#myph_check").css("color", "red");
		}
	}
})





$("#phone_code_check_button").click(function(){
	$("#phonecode").prop("disabled",true);
	$("#phone_code_check_button").prop("disabled",true);
	$("#myph").prop("disabled",true);
	$("#phone_code_send").prop("disabled",true);
	$("#phone_code_check").text("인증이 완료되었습니다.");
	$("#phone_code_check").css("color", "blue");
	code_check_keyup = true;
})


$("#reg_submit").click(function() {
	id();
	pw();
	pwchk();
	phone();
	email();
	addr();
	if (!id()) {
		$("#user_id").focus();
		return false;
	} else if (!pw()) {
		$("#mypw1").focus();
		return false;
	} else if (!pwchk()) {
		$("#mypw2").focus();
		return false;
	} else if (!phone()) {
		$("#myph").focus();
		return false;
	} else if (!email()){
		$("#email").focus();
		return false;
	} else if ($("#roadFullAddr1").val() == "" || $("#roadFullAddr2").val() ==""){
		$("#addr_check").text("주소 검색을 해주세요.");
		$("#addr_check").css("color","red");
		$("#addrsearch").focus();
		return false;
	} else if (code_check == false) {
		$("#myph_check").text("핸드폰 인증을 해주세요.");
		$("#myph_check").css("color", "red");
		$("#phone_code_send").focus();
		return false;
	} else if ((code_check_keyup == false) && ($.trim(code) != $("#phonecode").val())) {
		$("#phone_code_check").text("인증번호를 정확히 입력하고 CONFIRM을 눌러주세요.");
		$("#phone_code_check").css("color", "red");
		$("#phonecode").focus();
		$("#phone_code_check_button").prop("disabled",true);
		return false;
	} else if ((code_check_keyup == false) && ($.trim(code) == $("#phonecode").val())) {
		alert("인증버튼을 눌러주세요.");
		$("#phone_code_check").text("인증번호가 일치합니다");
		$("#phone_code_check").css("color", "blue");
		$("#phonecode").css("outline-color", "#ddd");
		$("#phonecode").css("border", "1px solid #ddd");
		$("#phone_code_check_button").prop("disabled",false);
		return false;
	} else {
		$("#roadFullAddr1").prop("disabled",false);
		$("#roadFullAddr2").prop("disabled",false);
		$("#myph").prop("disabled",false);
		return true;
	}
})






$("#phonecode").blur(function(){
	if (($.trim(code) !="") && ($.trim(code) == $("#phonecode").val())) {
		$("#phone_code_check").text("인증번호가 일치합니다");
		$("#phone_code_check").css("color", "blue");
		$("#phonecode").css("outline-color", "#ddd");
		$("#phonecode").css("border", "1px solid #ddd");
		$("#phone_code_check_button").prop("disabled",false);
	} else if ($("#phonecode").val() == "") { 
		$("#phone_code_check").text("인증번호를 입력해주세요.");
		$("#phone_code_check").css("color", "red");
		$("#phonecode").css("outline-color", "red");
		$("#phonecode").css("border", "1px solid red");
		$("#phone_code_check_button").prop("disabled",true);
	} else {
		$("#phone_code_check").text("인증번호가 일치하지 않습니다.");
		$("#phone_code_check").css("color", "red");
		$("#phonecode").css("outline-color", "red");
		$("#phonecode").css("border", "1px solid red");
		$("#phone_code_check_button").prop("disabled",true);
	}
})


