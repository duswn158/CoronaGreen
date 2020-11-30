package com.corona.green.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.corona.green.api.NaverLoginBo;
import com.corona.green.api.UserSha256;
import com.corona.green.model.biz.LogBiz;
import com.corona.green.model.biz.MemberBiz;
import com.corona.green.model.dto.LogDto;
import com.corona.green.model.dto.MemberDto;
import com.github.scribejava.core.model.OAuth2AccessToken;

@Controller
public class MemberLoginController {

	/* NaverLoginBO */
	private NaverLoginBo naverLoginBO;
	private String apiResult = null;

	@Autowired
	private void setNaverLoginBO(NaverLoginBo naverLoginBO) {
		this.naverLoginBO = naverLoginBO;
	}

	@Autowired
	private MemberBiz biz;
	
	//@Autowired
	@Resource(name="logbiz")
	private LogBiz logbiz;

	Logger logger = LoggerFactory.getLogger(MemberLoginController.class);

	@RequestMapping(value = "/loginform.do")
	public String loginForm(Model model, HttpSession session) {

		logger.info("Login Page");
		String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);
		model.addAttribute("url", naverAuthUrl);
		return "green_login";
	}

	// 네이버 콜백
	@RequestMapping(value = "/callback.do", method = { RequestMethod.GET, RequestMethod.POST })
	public String callback(Model model, @RequestParam String code, @RequestParam String state, HttpSession session)
			throws IOException, ParseException {
		/*
		  System.out.println("하이루!!!!!!!!!!!!!!!!!!!!!!!" + session);
		 * System.out.println("하이루코드" + code); System.out.println("하이루 스테이트" + state);
		 */
		OAuth2AccessToken oauthToken;
		oauthToken = naverLoginBO.getAccessToken(session, code, state);
		// 1. 로그인 사용자 정보를 읽어온다.
		//System.out.println("콜백에서 oauth토큰!!!!!!!!!!!222" + oauthToken);
		apiResult = naverLoginBO.getUserProfile(oauthToken); // String형식의 json데이터
		/**
		 * apiResult json 구조 {"resultcode":"00", "message":"success",
		 * "response":{"id":"33666449","nickname":"shinn****","age":"20-29","gender":"M","email":"sh@naver.com","name":"\uc2e0\ubc94\ud638"}}
		 **/
		// 2. String형식인 apiResult를 json형태로 바꿈
		JSONParser parser = new JSONParser();
		Object obj = parser.parse(apiResult);
		JSONObject jsonObj = (JSONObject) obj;
		// 3. 데이터 파싱
		// Top레벨 단계 _response 파싱
		JSONObject response_obj = (JSONObject) jsonObj.get("response");
		// response의 nickname값 파싱
		String email = (String) response_obj.get("email");
		// 4.파싱 닉네임 세션으로 저장
		model.addAttribute("naveremail", email); // 세션 생성
		model.addAttribute("result", apiResult);

		MemberDto dto = biz.EmailCheckId(email);
		// 아이디 비번 가지고와서 로그인으로 보내자
		
		
		
		if (dto != null) {
			return "redirect:login.do?id=" + dto.getId() + "&pw=" + dto.getPw() + "&code=naver";
		} else {
			return "green_sign";
		}
	}

	// 카카오 로그인
	@RequestMapping("/kakaologin.do")
	public String KakaoLogin() {
		return "kakao_login";
	}

	@RequestMapping("/login.do")
	public String login(MemberDto dto, Model model, HttpSession session, @RequestParam("code") String code) {
		logger.info("login");
		if (code != null) {
			// 네이버 로그인 ( 이메일 존재시 )
			if (code.equals("naver")) {
				MemberDto res = biz.login(dto);
				if (res != null) {
					if (res.getEnabled().equals("Y")) {
						session.invalidate();
						model.addAttribute("msg", "탈퇴된 회원입니다. 카카오 채널 OOO 문의 부탁드립니다.");
						model.addAttribute("url", "/");
						return "redirect";
					} else {
						session.setAttribute("dto", res);
						return "redirect:main.do";
					}
				} else {
					model.addAttribute("msg", "아이디와 비밀번호를 확인해주세요.");
					model.addAttribute("url", "/loginform.do");
					return "redirect";
				}
				// 카카오 로그인 ( 이메일 존재시 )
			} else if (code.equals("kakao")) {
				MemberDto res = biz.login(dto);
				if (res != null) {
					if (res.getEnabled().equals("Y")) {
						session.invalidate();
						model.addAttribute("msg", "탈퇴된 회원입니다. 카카오 채널 OOO 문의 부탁드립니다.");
						model.addAttribute("url", "/");
						return "redirect";
					} else {
						session.setAttribute("dto", res);
						return "redirect:main.do";
					}
				} else {
					model.addAttribute("msg", "아이디와 비밀번호를 확인해주세요.");
					model.addAttribute("url", "/loginform.do");
					return "redirect";
				}

			} else {
				// 일반 로그인
				String encryPassword = UserSha256.encrypt(dto.getPw());
				dto.setPw(encryPassword);
				MemberDto res = biz.login(dto);
				if (res != null) {
					if (res.getEnabled().equals("Y")) {
						session.invalidate();
						model.addAttribute("msg", "탈퇴된 회원입니다. 카카오 채널 OOO 문의 부탁드립니다.");
						model.addAttribute("url", "/");
						return "redirect";
					} else {
						session.setAttribute("dto", res);
						MemberDto member_login_dto = (MemberDto)session.getAttribute("dto");
						LogDto logdto = new LogDto(0,session.getId(), member_login_dto.getId(), null, null);
						logbiz.LogEnter(logdto);
						return "redirect:main.do";
					}
				} else {
					model.addAttribute("msg", "아이디와 비밀번호를 확인해주세요.");
					model.addAttribute("url", "/loginform.do");
					return "redirect";
				}
			}
		} else {
			model.addAttribute("msg", "잘못된 접근입니다.");
			model.addAttribute("url", "/main.do");
			return "redirect";
		}
	}

	@RequestMapping("kakaoregist.do")
	public String naverLogin(String email, Model model, HttpSession session) {
		model.addAttribute("kakaoemail", email);
		MemberDto dto = biz.EmailCheckId(email);
		// 아이디 비번 가지고와서 로그인으로 보내자
		if (dto != null) {
			return "redirect:login.do?id=" + dto.getId() + "&pw=" + dto.getPw() + "&code=kakao";
		} else {
			return "green_sign";
		}
	}

	@RequestMapping("/logout1.do")
	public String logout(HttpSession session) {
		MemberDto res = (MemberDto)session.getAttribute("dto");
		if (res != null) {
		logger.info("로그아웃 성공");
		LogDto dto = new LogDto(0, session.getId(),null,null,null);
		logbiz.LogOut(dto);
		//System.out.println(session.getId());
		//System.out.println("로그아웃해서 세션 없어져서 시간저장!");
		session.invalidate();
		return "redirect:main.do";
		}
		return "main.do";
	}

	@RequestMapping("regist.do")
	public String regist() {
		return "green_sign";
	}
	
	@RequestMapping("gogo.do")
	public String gogo() {
		return "index";
	}

}
