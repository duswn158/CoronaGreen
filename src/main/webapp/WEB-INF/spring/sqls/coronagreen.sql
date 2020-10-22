-- 회원 테이블
DROP TABLE MEMBER;

SELECT * FROM MEMBER;

CREATE TABLE MEMBER(
	ID VARCHAR2(20) NOT NULL,
	PW VARCHAR2(1000) NOT NULL,
	PHONE VARCHAR2(100) NOT NULL,
	ADDRESS VARCHAR2(100) NOT NULL,
	EMAIL VARCHAR2(100) NOT NULL,
	ROLE VARCHAR2(100) NOT NULL,
	ENABLED CHAR(1) NOT NULL,
	REGDATE DATE NOT NULL,
	
	CONSTRAINT MEMBER_ID_PK PRIMARY KEY(ID),
	CONSTRAINT MEMBER_ROLE_CHK CHECK(ROLE IN('ADMIN', 'USER')),
	CONSTRAINT MEMBER_ENABLED_CHK CHECK(ENABLED IN('Y','N'))
);

-- 후원 테이블
DROP TABLE DONATION;

CREATE TABLE DONATION(
	ID VARCHAR2(20) NOT NULL,
	PAYMENT NUMBER NOT NULL,
	REGDATE DATE NOT NULL,
	
	CONSTRAINT DONATION_ID_PK PRIMARY KEY(ID),
	FOREIGN KEY(ID) REFERENCES MEMBER(ID)
);

-- 로그 테이블
DROP TABLE LOG;

CREATE TABLE LOG(
	ID VARCHAR2(20) NOT NULL,
	ENTER DATE NOT NULL,
	OUT DATE NOT NULL,
	
	CONSTRAINT LOG_ID_PK PRIMARY KEY(ID),
	FOREIGN KEY(ID) REFERENCES MEMBER(ID)
);

-- 문의 게시판 테이블
DROP TABLE QNA_BOARD
DROP SEQUENCE BOARDNO_SEQ;

SELECT * from QNA_BOARD;

INSERT INTO QNA_BOARD
VALUES('admin',BOARDNO_SEQ.NEXTVAL, 'test_title','testcontent', sysdate,'Y');

CREATE SEQUENCE BOARDNO_SEQ;

CREATE TABLE QNA_BOARD(
	ID VARCHAR2(20) NOT NULL,
	BOARDNO NUMBER NOT NULL,
	TITLE VARCHAR2(100) NOT NULL,
	CONTENT VARCHAR2(4000) NOT NULL,
	REGDATE DATE NOT NULL,
	SECRET CHAR(1) NOT NULL,
	
	CONSTRAINT QNA_BOARDNO_PK PRIMARY KEY(BOARDNO),
	FOREIGN KEY ID REFERENCES MEMBER(ID),
	CONSTRAINT QNA_BOARD_SECRET_CHK CHECK(SECRET IN('Y','N'))
);

-- 문의 답변 테이블
DROP TABLE QNA_BOARD_RE

SELECT * FROM QNA_BOARD_RE;

INSERT INTO QNA_BOARD_RE
VALUES(23, '어드민 콘텐츠', sysdate);

CREATE TABLE QNA_BOARD_RE(
	BOARDNO NUMBER NOT NULL,
	CONTENT VARCHAR2(4000) NOT NULL,
	REGDATE DATE NOT NULL,
	
	CONSTRAINT QNA_BOARD_RE_PK PRIMARY KEY(BOARDNO),
	FOREIGN KEY BOARDNO REFERENCES QNA_BOARD(BOARDNO)
);

-- 북마크 테이블
DROP TABLE BOOKMARK;

CREATE TABLE BOOKMARK(
	ID VARCHAR2(20) NOT NULL,
	ORIGIN_LINK VARCHAR2(1000) NOT NULL,
	IMG_LINK VARCHAR2(1000),
	TITLE VARCHAR2(1000) NOT NULL,
	CONTENT VARCHAR2(4000) NOT NULL,
	
	CONSTRAINT BOOKMARK_ID_PK PRIMARY KEY(ID),
	FOREIGN KEY ID REFERENCES MEMBER(ID)
);