package com.corona.green.model.biz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corona.green.model.dao.MypageDao;
import com.corona.green.model.dto.MemberDto;
@Service
public class MypageBizImpl implements MypageBiz {
		@Autowired
		private MypageDao dao;
	
	@Override
	public int myupdate(MemberDto dto) {
		return dao.myupdate(dto);
	}

}
