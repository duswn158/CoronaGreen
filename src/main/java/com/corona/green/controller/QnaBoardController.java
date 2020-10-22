package com.corona.green.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.corona.green.model.biz.QnaBoardBiz;
import com.corona.green.model.biz.QnaBoardReBiz;
import com.corona.green.model.dto.QnaBoardDto;

@Controller
public class QnaBoardController {
	
	Logger logger = LoggerFactory.getLogger(QnaBoardController.class);
	
	@Autowired
	private QnaBoardBiz qnaBiz;
	@Autowired
	private QnaBoardReBiz qnaReBiz;

	@RequestMapping("/qnalist.do")
	public String qnalist(Model model) {
		
		model.addAttribute("list", qnaBiz.selectList());
		
		return "green_qna_list";
	}
	
	@RequestMapping("/qnadetail.do")
	public String qnadetail(Model model, int boardno) {
		
		model.addAttribute("list", qnaBiz.selectOne(boardno));
		model.addAttribute("relist",qnaReBiz.selectOne(boardno));
		
		return "green_qna_select";
	}

	@RequestMapping("/qnainsertForm.do")
	public String qnainsertForm(Model model) {
		return "green_qna_insert";
	}
	
	@RequestMapping("/qnainsert.do")
	public String qnainsert(QnaBoardDto dto) {
		//System.out.println("비밀글 여부" +dto.getSecret());
		
		int res = qnaBiz.insert(dto);
		
		if(res > 0) {
			return "redirect:qnalist.do";
		} else {
			return "redirect:qnainsertForm.do";
		}
		
	}
	
	@RequestMapping("/qnaupdate.do")
	public String qnaupdate(Model model, int boardno) {
		
		model.addAttribute("list", qnaBiz.selectOne(boardno));
		
		return "green_qna_update";
	}
	
	
	@RequestMapping("/qnaupdateres.do")
	public String qnaupdateres(QnaBoardDto dto, int boardno) {
		
		int res = qnaBiz.update(dto);
		
		if(res > 0) {
			return "redirect:qnalist.do";
		} else {
			return "redirect:qnadetail.do?boardno="+boardno;
		}
		
	}
	
	@RequestMapping("/qnadelete.do")
	public String qnadelete(int boardno) {
		
		int res = qnaBiz.delete(boardno);
		
		if(res > 0) {
			return "redirect:qnalist.do";
		} else {
			return "redirect:qnadetail.do?boardno="+boardno;
		}
		
	}
	
	@RequestMapping("/serch.do")
	public String qnasherch(String serchselect, String serchtext) {
		
		System.out.println(serchselect+"옵션:::::::"+serchtext);
		//model.addAttribute("option", option);
		
		return "redirect:qnalist.do";
	}
	
}
