package com.corona.green.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.corona.green.model.biz.MemberBiz;
import com.corona.green.model.biz.MypageBiz;
import com.corona.green.model.dto.MemberDto;

@Controller
public class MypageController {

	@Autowired
	private MypageBiz biz;
	
	Logger logger = LoggerFactory.getLogger(MemberLoginController.class);
	
	@RequestMapping("/mypage_update.do")
	public String mypage_update() {
		return "green_mypage_update";
	}
	
	@RequestMapping("/mypage_updateres.do")
	public String mypage_updateres(MemberDto dto , Model model,HttpSession session) {
		logger.info("mypage_updateres");
		logger.info(dto.getId());
		logger.info(dto.getPw());
		int res= biz.myupdate(dto);
		
		if(res>0) {
			model.addAttribute("msg","비밀번호가 변경되었습니다 다시 로그인 해주세요");
			model.addAttribute("url","/main.do");
			session.invalidate();
			return "redirect";
		}else {
			model.addAttribute("msg","비밀번호 변경에 실패하였습니다");
			model.addAttribute("url","/mypage_update.do");
			session.invalidate();
			return "redirect";
		}
	}
	
}
