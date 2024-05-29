CREATE DATABASE jwi default CHARACTER SET UTF8MB4;
use jwi;
drop DATABASE jwi;
-- 유저 테이블
CREATE TABLE `user` (
	`userEmail`	VARCHAR(30) PRIMARY KEY	NOT NULL, -- 아이디
	`userPw`	VARCHAR(255)	NOT NULL, -- 비번
	`userName`	VARCHAR(30) UNIQUE	NOT NULL, -- 유저 닉네임
	`userGender`	enum('man','girl','undisclosed')	NOT NULL	DEFAULT 'undisclosed', -- 성별
	`userBirthday`	DATETIME, -- 생일
	`userState`	ENUM('activate','deactivate','secession')	NOT NULL	DEFAULT 'activate', -- 로그인할때 체크 필요, deactivate 는 정지, secession는 탈퇴
	`userCreatedAt`	DATETIME	NOT NULL	DEFAULT NOW(),
	`userUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

-- 즐겨찾기
CREATE TABLE `favorites` (
	`favoritesKey`	int PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`channelId`	VARCHAR(50)	NOT NULL, -- 채널 아이디
	`userEmail`	VARCHAR(30)	NOT NULL, -- 유저 아이디
	`favoritesCreatedAt`	datetime	NOT NULL	DEFAULT NOW(),
	`favoritesUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

-- 체널 정보
CREATE TABLE `channel` (
	`channelId`	VARCHAR(50) PRIMARY KEY	NOT NULL, #채널아이디
	`channelName`	VARCHAR(255)	NOT NULL, # 채널이름
	`channelImageUrl`	VARCHAR(255)	NOT NULL, # 채널 이미지 URL
	`followerCount`	int	NOT NULL, # 팔로워수
	`channelCreatedAt`	DATETIME	NOT NULL	DEFAULT NOW(), # 생성시간
	`channelUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW() # 업데이트 시간
);
-- 게시글
CREATE TABLE `post` (
    `postKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 게시글 키
    `channelId` VARCHAR(50) NOT NULL, -- 체널 아이디
    `userEmail` VARCHAR(30) NOT NULL, -- 유저 이메일
    `postTitle` VARCHAR(30) NOT NULL, -- 게시글 타이틀
    `postContent` VARCHAR(200) NOT NULL, -- 게시글 내용
    `postState`	ENUM('common','delete','disabled')	NOT NULL	DEFAULT 'common', -- 게시글 활성 유무 0: 활성 1: 비활성
    `postCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `postUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);
-- 댓글
CREATE TABLE `commentLog` (
	`commentLogKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL, -- 댓글키
	`postKey`	INT	NOT NULL, -- 게시글 키
	`userEmail`	VARCHAR(30)	NOT NULL, -- 작성자 이메일
	`comment`	VARCHAR(200)	NOT NULL, -- 댓글
	`commentState`	ENUM('common','delete','disabled')	NOT NULL	DEFAULT 'common', -- 댓글상태
	`commentCreatedAt`	DATETIME	NOT NULL	DEFAULT NOW(), -- 생성시간
	`commentUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);

-- 대댓글
CREATE TABLE `replyLog` (
	`replyLogKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL, -- 대댓글 키
	`commentKey`	INT	NOT NULL, -- 댓글 키
	`userEmail`	VARCHAR(30)	NOT NULL, -- 유저 이메일
	`reply`	VARCHAR(200)	NOT NULL, -- 댓글내용
	`replyState`	ENUM('common','delete','disabled')	NOT NULL	DEFAULT 'common', -- 
	`replyCreatedAt`	datetime	NOT NULL	DEFAULT NOW(),
	`replyUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

 -- 좋아요 로그
CREATE TABLE `likeLog` (
    `likeLogKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 좋아요 키
    `userEmail` VARCHAR(30) NOT NULL, -- 유저 이메일
    `postKey` INT NOT NULL, -- 게시글 키
    `likeLogCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `likeLogUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);

-- 게시판 관리자
CREATE TABLE `manager` (
    `managerKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 관리가 키
    `userEmail` VARCHAR(30) NOT NULL, -- 관리자 이메일
    `channelId` VARCHAR(50) NOT NULL, -- 채널 아이디 
    `managerCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `managerUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);
-- 유저 신고
CREATE TABLE `reportLog` (
	`reportLogKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL, -- 신고기록 키
	`reportReferenceType`	ENUM('post','comment','replyLog')	NOT NULL, -- 신고 참조 타입
	`reportReferenceKey`	INT	NOT NULL, -- 심고 참조 키
	`userEmail`	VARCHAR(30)	NOT NULL, -- 신고자 이메일
	`reportEmail`	VARCHAR(30)	NOT NULL, -- 신고 당한사람 이메일
	`reportCategory`	INT	NOT NULL, -- 신고 카테고리
	`reportContent`	TEXT	NOT NULL, -- 신고 내용
	`reportState`	ENUM('unprocessed','process')	NOT NULL	DEFAULT 'unprocessed', -- 신고 처리 여부
	`reportCreatedAt`	DATETIME	NOT NULL	DEFAULT NOW(),
	`reportUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);
-- 밴 로그
CREATE TABLE `bannedLog` (
	`bannedKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL, -- 밴키
	`userEmail`	VARCHAR(30)	NOT NULL, -- 유저 이메일
	`bannedReason`	VARCHAR(50)	NOT NULL, -- 밴 사유
	`reasonDate`	DATETIME	NOT NULL	DEFAULT NOW(), -- 정지 날짜
	`bannedContent`	INT	NOT NULL, -- 정지 일수 
	`bannedState`	ENUM('activate','deactivate')	NOT NULL	DEFAULT 'activate', -- 밴 활성화 여부(시간이 지나 정지가 풀리면 비활성화가 됨)
	`bannedCreatedAt`	DATETIME	NOT NULL	DEFAULT NOW(),
	`bannedUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);
-- 운영자
CREATE TABLE `admin` (
	`adminId`	VARCHAR(30) PRIMARY KEY	NOT NULL, -- 어드민 아이디
	`adminPw`	VARCHAR(255)	NOT NULL, -- 어드민 비밀번호
	`adminState`	ENUM('activate','deactivate','secession')	NOT NULL	DEFAULT 'activate', -- 어드민 아이디 상태
	`adminCreatedAt`	DATETIME	NOT NULL	DEFAULT NOW(),
	`adminUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

-- 운영자 접속 기록
CREATE TABLE `adminLoginLog` (
	`adminLoginLog`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL, -- 로그인 기록 키
	`adminId`	VARCHAR(30) PRIMARY KEY	NOT NULL, -- 어드민 아이디
	`adminLogTime`	DATETIME	NOT NULL	DEFAULT NOW(), -- 로그인 시간
	`adminLogUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW() -- 변경시간
);

 -- 알람
CREATE TABLE `alarm` (
	`alarmKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL, -- 알람 키
	`userEmail`	VARCHAR(30)	NOT NULL, -- 유저 이메일
	`alarmReferenceType`	ENUM('inquiry','post','comment','system','lick')	NOT NULL, -- 알람 참조 타입
	`alarmReferenceKey`	INT	NOT NULL	DEFAULT '0', -- 알람 참조 키
	`alarmTitle`	VARCHAR(50)	NOT NULL, -- 알람 제목
	`alarmContent`	VARCHAR(255)	NOT NULL, -- 알람 내용
	`alarmCreatedAt`	DATETIME	NOT NULL	DEFAULT NOW(),
	`alarmUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `inquiry` (
	`inquiryKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL, -- 문의하기 키
	`userEmail`	VARCHAR(30)	NOT NULL, -- 유저 이메일
	`inquiryCategory`	VARCHAR(30)	NOT NULL, -- 문의 카태고리
	`inquiryDetails`	text	NOT NULL, -- 문의 내용
	`reportCreatedAt`	DATETIME	NOT NULL	DEFAULT NOW(),
	`reportUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `inquiryResponse` (
	`inquiryResponseKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL, -- 문의 답변
	`adminId`	VARCHAR(30)	NOT NULL, -- 답변한 어드민 아이디
	`inquiryKey`	INT	NOT NULL, -- 문의 키값 (어떤 문의에 대답했는지)
	`inquiryResponseText`	text	NOT NULL, -- 답변 내용
	`inquiryCreatedAt`	DATETIME	NOT NULL	DEFAULT NOW(),
	`inquiryUpdatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);