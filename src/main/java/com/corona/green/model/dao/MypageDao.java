package com.corona.green.model.dao;

import com.corona.green.model.dto.MemberDto;

public interface MypageDao {

	String NAMESPACE="mypage.";
	
	public int myupdate(MemberDto dto);	
	
}
