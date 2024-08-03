CREATE DATABASE jwi default CHARACTER SET UTF8MB4;

use jwi;
drop DATABASE jwi;

CREATE TABLE `user` (
	`userKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '유저키',
	`email`	VARCHAR(50) UNIQUE	NOT NULL	COMMENT '이메일',
	`pw`	VARCHAR(255)	NOT NULL	COMMENT '비밀번호',
	`nickName`	VARCHAR(30) UNIQUE	NOT NULL	COMMENT '닉네임',
	`gender`	VARCHAR(30)	NOT NULL	DEFAULT 'undisclosed'	COMMENT '성별 "man","girl","undisclosed"',
	`birthday`	DATETIME	NULL	COMMENT '생년월일',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'activate'	COMMENT '유저 상태 "activate","deactivate","secession"',
	`ceatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `favorites` (
	`favoritesKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`userKey`	INT	NOT NULL	COMMENT '유저키',
	`channelKey`	INT	NOT NULL	COMMENT '채널키',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

select * from `channel`;
CREATE TABLE `channel` (
	`channelKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`id`	VARCHAR(32)	NOT NULL	COMMENT '채널 아이디',
	`name`	VARCHAR(255)	NOT NULL	COMMENT '채널 이름',
	`imageUrl`	TEXT	NOT NULL	COMMENT '배너 URL 업데이트 시간에서 주기적으로 업데이트 하는걸로',
	`followerCount`	INT	NOT NULL	COMMENT '이것도 같이 업데이트 되는걸로',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `post` (
	`postKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`userKey`	INT	NOT NULL,
	`channelKey`	INT	NOT NULL,
	`content`	VARCHAR(300)	NOT NULL	COMMENT '게시글 내용',
	`image`	TEXT	NOT NULL	COMMENT '이미지 배열, 최대 4개',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'common'	COMMENT '"common","delete","disabled"',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `comment` (
	`commentLogKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`userKey`	INT	NOT NULL,
	`postKey`	INT	NOT NULL,
	`comment`	VARCHAR(200)	NOT NULL	COMMENT '댓글 내용',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'common'	COMMENT '"common","delete","disabled"',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `like` (
	`likeLogKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`userKey`	INT	NOT NULL,
	`postKey`	INT	NOT NULL,
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW()
);

CREATE TABLE `manager` (
	`managerKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`userKey`	INT	NOT NULL	COMMENT '유저키',
	`channelKey`	INT	NOT NULL	COMMENT '채널키',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `report` (
	`reportKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '신고키',
	`reportUserKey`	INT	NOT NULL	COMMENT '신고당한 유저',
	`userKey`	INT	NOT NULL	COMMENT '신고한 유저',
	`referenceType`	VARCHAR(50)	NOT NULL	COMMENT '신고 종류 "post","comment","reply" 테이블 이름 넣기',
	`referenceKey`	INT	NOT NULL	COMMENT '참조키',
	`category`	INT	NOT NULL	COMMENT '신고 사유',
	`content`	TEXT	NOT NULL	COMMENT '신고 내용',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'unprocessed'	COMMENT '처리현황 "unprocessed","process" 작업자와 상의',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `admin` (
	`adminKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '어드민 키',
	`id`	VARCHAR(30) PRIMARY KEY	NOT NULL	COMMENT '어드민아이디',
	`pw`	VARCHAR(255)	NOT NULL	COMMENT '비밀번호',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'activate'	COMMENT '어드민 상태 "activate","deactivate","secession"  작업자와 상의',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `adminLog` (
	`adminLogKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`adminKey`	INT	NOT NULL,
	`activityLog`	VARCHAR(255)	NOT NULL	COMMENT '로그인 했을때, 어떤 활동을했을때 등등 모든 활동에 이게 들어가야 된다고 생각함',
	`referenceType`	VARCHAR(50)	NULL	COMMENT '게시글 삭제 , 댓글 삭제 등을 했을때 어떤 게시글을 삭제했는지 테이블 이름으로',
	`referenceKey`	INT	NULL	COMMENT '활동했을때 그 게시글, 댓글 등의 키가 무엇인지',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `alarm` (
	`alarmKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '알람키',
	`userKey`	INT	NOT NULL	COMMENT '유저키',
	`referenceType`	VARCHAR(50)	NOT NULL	COMMENT '알람종류 "inquiry","post","comment","system","like" 테이블 이름으로  시스템 메세지는 system 으로',
	`referenceKey`	INT	NULL	COMMENT '참조 키',
	`read`	TINYINT	NOT NULL	DEFAULT 0	COMMENT 'read유무',
	`title`	VARCHAR(50)	NOT NULL	COMMENT '알람제목',
	`content`	VARCHAR(255)	NOT NULL	COMMENT '알람내용',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `inquiry` (
	`inquiryKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '문의 키',
	`userKey`	INT	NOT NULL	COMMENT '유저 키',
	`Title`	VARCHAR(30)	NOT NULL	COMMENT '문의 제목',
	`category`	VARCHAR(30)	NOT NULL	COMMENT '문의 주제',
	`details`	TEXT	NOT NULL	COMMENT '문의 내용',
	`image`	TEXT	NOT NULL	COMMENT '이미지 URL',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `inquiryResponse` (
	`responseKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '문의 답변 키',
	`inquiryKey`	INT	NOT NULL	COMMENT '문의 키',
	`adminKey`	INT	NOT NULL	COMMENT '어드민 키',
	`Title`	VARCHAR(30)	NOT NULL	COMMENT '제목',
	`responseText`	TEXT	NOT NULL	COMMENT '답변 내용',
	`image`	TEXT	NOT NULL	COMMENT '이미지 URL',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `reply` (
	`replyKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`commentKey`	INT	NOT NULL	COMMENT '댓글 키',
	`replyreplyKey`	INT	NULL	COMMENT '대대댓글 일때 참조 키, 댓글과 대댓글 2명에게 알람을 가게 해야함 ex) 유튜브',
	`userKey`	INT	NOT NULL	COMMENT '유저 키',
	`reply`	VARCHAR(200)	NOT NULL	COMMENT '내용',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'common'	COMMENT '"common","delete","disabled"',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `banned` (
	`bannedKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '정지 키',
	`userKey`	INT	NOT NULL	COMMENT '유저 키',
	`reason`	VARCHAR(50)	NOT NULL	COMMENT '정지 사유',
	`reasonDate`	DATETIME	NOT NULL	DEFAULT NOW()	COMMENT '정지 날짜',
	`date`	INT	NOT NULL	COMMENT '정지일수',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'activate'	COMMENT '밴 상태 "activate","deactivate"',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `managerLog` (
	`managerLogKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '매니저 활동로그키',
	`managerKey`	INT	NOT NULL	COMMENT '매니저 키',
	`activityLog`	VARCHAR(255)	NOT NULL	COMMENT '활동 기록',
	`referenceType`	VARCHAR(255)	NULL	COMMENT '참조 타입, 테이블 이름으로',
	`referenceKey`	INT	NULL	COMMENT '참조 키',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `channelRules` (
	`channelRulesKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`channelKey`	INT	NOT NULL,
	`title`	VARCHAR(30)	NOT NULL	COMMENT '채널 규칙 제목',
	`content`	Text	NOT NULL	COMMENT '채널 규칙은 배열로 처리',
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `Image` (
   `imageKey`   INT PRIMARY KEY AUTO_INCREMENT   NOT NULL,
   `imageUrl`   VARCHAR(300) UNIQUE   NOT NULL,
    `imageHash`  CHAR(64) NOT NULL UNIQUE
);




