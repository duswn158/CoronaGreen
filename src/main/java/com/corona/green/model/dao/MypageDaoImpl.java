package com.corona.green.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.corona.green.model.dto.MemberDto;

	
@Repository
public class MypageDaoImpl implements MypageDao {
	@Autowired
	private SqlSessionTemplate sqlSession;
	Logger logger=LoggerFactory.getLogger(MypageDaoImpl.class);
	
	@Override
	public int myupdate(MemberDto dto) {
		int res=0;
		logger.info(dto.getId());
		try {
			res=sqlSession.update(NAMESPACE+"myupdate",dto);
		} catch (Exception e) {
			logger.info("ERROR MYUPDATE");
			e.printStackTrace();
		}
		return res;
	}

}
