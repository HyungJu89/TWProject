-- 2024-08-21 [조영민]
-- 수정내용 : bannedLog 추가
-- banned에서 update문으로 데이터를 수정하기 떄문에 로그를 남기는 방식으로 수정함
CREATE TABLE `bannedLog` (
   `bannedLogKey`   INT PRIMARY KEY AUTO_INCREMENT   NOT NULL COMMENT '정지 키',
   `bannedKey`   INT   NOT NULL COMMENT '밴 테이블 키',
   `userKey`   INT   NOT NULL COMMENT '유저 키',
   `adminKey` INT NOT NULL COMMENT '어드민 키',
   `reason` VARCHAR(50) NOT NULL COMMENT '정지 사유',
   `reasonDate` DATETIME NOT NULL DEFAULT NOW() COMMENT '정지 시작 날짜',
   `date`   INT   NOT NULL COMMENT '정지일수',
   `state`  VARCHAR(50) NOT NULL COMMENT '정지 사유',
   `createdAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updatedAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
select *from bannedLog;
-- 2024-08-19 [안재원] V 0.1.12
-- 수정내용 : alarm 테이블에서 title 컬럼 제거
ALTER TABLE `alarm` DROP `title`;
ALTER TABLE `alarm` DROP `content`;

-- 2024-08-15 [임재열] V 0.1.11
-- 수정내용 : admin 테이블 adminName 칼럼에 유니크가 추가되어있지않아 동일한 adminName 의 행이 만들어짐
ALTER TABLE `admin` ADD CONSTRAINT `uniqueAdminName` UNIQUE (`adminName`);

-- 2024-08-15 [조영민] V 0.1.10 
-- 수정내용 : ADMIN TABLE 컬럼명 수정 id => adminName / pw => adminPassWord 헤싱된 insert문 추가
-- 패스워드 인코더로 insert하는것이 불가능하기 때문에 직접 insert하는걸로 변경했음
-- id : asdf /  pw : asdf123
insert into admin(adminName,adminPassWord,state,createdAt,updatedAt) values("asdf","$2a$12$qWMhwV31meoA0C6fvoVLX.OBe4NXvyz09HIewoxQ8EPProosm54z6","activate",now(),now());

-- 2024-08-15 [안재원] V 0.1.9 
-- 수정내용 : inquiry 테이블 Title 소문자로 변경 및 이미지 Null 가능으로 변경 , inquiryResponse 이미지 Null 가능, faq 이미지 Null 가능
ALTER TABLE `inquiry` RENAME COLUMN `Title` to `title`;
ALTER TABLE `inquiry` MODIFY `image` TEXT COMMENT '이미지 URL';
ALTER TABLE `inquiryResponse` MODIFY `image` TEXT COMMENT '이미지 URL';
ALTER TABLE `faq` MODIFY `imagePath` TEXT COMMENT '이미지 URL';

-- 2024-08-12 15시 13분 [김형주] V 0.1.8 
-- 수정내용 : 유저테이블에 pwWrong(비밀번호 틀린횟수) 추가
-- 비밀번호 5회제한 로직을 수월하게 만들기 위해 수정했습니다!
alter table `user` add `pwWrong` int default 0;

-- 2024-08-10 00시 46분 [임재열] V 0.1.7
-- 수정내용 : like 테이블 오타수정

-- 2024-08-08 16시 53분 [임재열] V 0.1.6
-- 수정내용 : loginLog, userConnection 커밋내용이 누락되어 추가 및 외래키 추가

-- 2024-08-08 11시 39분 [임재열] V 0.1.5 
-- 수정내용 : 외래키 사용 및 참조된 외래키가 삭제되면 해당 키를 참조하는 모든 행을 삭제
-- 외래키란? : 다른테이블의 정보를 참조할때 사용하는 key

CREATE DATABASE jwi default CHARACTER SET UTF8MB4;
use jwi;
drop DATABASE jwi;
select*from`user`;
CREATE TABLE `user` (
	`userKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`email`	VARCHAR(30) UNIQUE	NOT NULL,
	`pw`	VARCHAR(255)	NOT NULL,
	`nickName`	VARCHAR(30) UNIQUE	NOT NULL,
	`gender`	VARCHAR(30)	NOT NULL	DEFAULT '비밀',
    `pwWrong` int default 0,
	`birthday`	DATETIME	NULL,
	`state`	VARCHAR(30)	NOT NULL	DEFAULT 'activate',
	`createdAt`	DATETIME	NOT NULL	DEFAULT NOW(),
	`updatedAt`	DATETIME	NOT NULL	DEFAULT NOW() ON UPDATE NOW()
);

select*from `favorites`;
CREATE TABLE `favorites` (
	`favoritesKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`userKey`	INT	NOT NULL	COMMENT '유저키',
	`channelKey`	INT	NOT NULL	COMMENT '채널키',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`userKey`) REFERENCES user(`userKey`) ON DELETE CASCADE
);
select*from `channel`;
CREATE TABLE `channel` (
	`channelKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`id`	VARCHAR(32)	NOT NULL	COMMENT '채널 아이디',
	`name`	VARCHAR(255)	NOT NULL	COMMENT '채널 이름',
	`imageUrl`	TEXT	NOT NULL	COMMENT '배너 URL 업데이트 시간에서 주기적으로 업데이트 하는걸로',
	`followerCount`	INT	NOT NULL	COMMENT '이것도 같이 업데이트 되는걸로',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE `post` (
	`postKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`userKey`	INT	NOT NULL,
	`channelKey`	INT	NOT NULL,
	`content`	VARCHAR(300)	NOT NULL	COMMENT '게시글 내용',
	`image`	TEXT COMMENT '이미지 배열, 최대 4개',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'common'	COMMENT '"common","delete","disabled"',	
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE,
    FOREIGN KEY (`channelKey`) REFERENCES `channel`(`channelKey`) ON DELETE CASCADE
);

CREATE TABLE `comment` (
	`commentKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,	
	`userKey`	INT	NOT NULL,
	`postKey`	INT	NOT NULL,
	`comment`	VARCHAR(200)	NOT NULL	COMMENT '댓글 내용',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'common'	COMMENT '"common","delete","disabled"',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE,
    FOREIGN KEY (`postKey`) REFERENCES `post`(`postKey`) ON DELETE CASCADE
);
CREATE TABLE `like` (
	`likeKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`userKey`	INT	NOT NULL,
	`postKey`	INT	NOT NULL,
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE,
    FOREIGN KEY (`postKey`) REFERENCES `post`(`postKey`) ON DELETE CASCADE
);

DROP TABLE `like`;

CREATE TABLE `manager` (
	`managerKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`userKey`	INT	NOT NULL	COMMENT '유저키',
	`channelKey`	INT	NOT NULL	COMMENT '채널키',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE,
    FOREIGN KEY (`channelKey`) REFERENCES `channel`(`channelKey`) ON DELETE CASCADE
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
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (`reportUserKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE
);

CREATE TABLE admin (
    adminKey    INT PRIMARY KEY AUTO_INCREMENT    NOT NULL    COMMENT '어드민 키',
    adminName    VARCHAR(30) COMMENT '어드민아이디',
    adminPassWord    VARCHAR(255)    NOT NULL    COMMENT '비밀번호',
    state    VARCHAR(50)    NOT NULL    DEFAULT 'activate'    COMMENT '어드민 상태 "activate","deactivate","secession"  작업자와 상의',
    createdAt    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `adminLog` (
	`adminLogKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`adminKey`	INT	NOT NULL,
	`activityLog`	VARCHAR(255)	NOT NULL	COMMENT '로그인 했을때, 어떤 활동을했을때 등등 모든 활동에 이게 들어가야 된다고 생각함',
	`referenceType`	VARCHAR(50)	NULL	COMMENT '게시글 삭제 , 댓글 삭제 등을 했을때 어떤 게시글을 삭제했는지 테이블 이름으로',
	`referenceKey`	INT	NULL	COMMENT '활동했을때 그 게시글, 댓글 등의 키가 무엇인지',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `alarm` (
	`alarmKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '알람키',
	`userKey`	INT	NOT NULL	COMMENT '유저키',
	`referenceType`	VARCHAR(50)	NOT NULL	COMMENT '알람종류 "inquiry","post","comment","system","like" 테이블 이름으로  시스템 메세지는 system 으로',
	`referenceKey`	INT	NULL	COMMENT '참조 키',
	`read`	TINYINT	NOT NULL	DEFAULT 0	COMMENT 'read유무',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE
);


CREATE TABLE `inquiry` (
	`inquiryKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '문의 키',
	`userKey`	INT	NOT NULL	COMMENT '유저 키',
	`title`	VARCHAR(30)	NOT NULL	COMMENT '문의 제목',
	`category`	VARCHAR(30)	NOT NULL	COMMENT '문의 주제',
	`details`	TEXT	NOT NULL	COMMENT '문의 내용',
	`image`	TEXT	COMMENT '이미지 URL',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE
);

CREATE TABLE `inquiryResponse` (
	`responseKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '문의 답변 키',
	`inquiryKey`	INT	NOT NULL	COMMENT '문의 키',
	`adminKey`	INT	NOT NULL	COMMENT '어드민 키',
	`Title`	VARCHAR(30)	NOT NULL	COMMENT '제목',
	`responseText`	TEXT	NOT NULL	COMMENT '답변 내용',
	`image`	TEXT	COMMENT '이미지 URL',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (`inquiryKey`) REFERENCES `inquiry`(`inquiryKey`) ON DELETE CASCADE
);
CREATE TABLE `reply` (
	`replyKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`commentKey`	INT	NOT NULL	COMMENT '댓글 키',
	`replyreplyKey`	INT	NULL	COMMENT '대대댓글 일때 참조 키, 댓글과 대댓글 2명에게 알람을 가게 해야함 ex) 유튜브',
	`userKey`	INT	NOT NULL	COMMENT '유저 키',
	`reply`	VARCHAR(200)	NOT NULL	COMMENT '내용',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'common'	COMMENT '"common","delete","disabled"',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (`commentKey`) REFERENCES `comment`(`commentKey`) ON DELETE CASCADE,
    FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE
);

CREATE TABLE `banned` (
	`bannedKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '정지 키',
	`userKey`	INT	NOT NULL	COMMENT '유저 키',
	`reason`	VARCHAR(50)	NOT NULL	COMMENT '정지 사유',
	`reasonDate`	DATETIME	NOT NULL	DEFAULT NOW()	COMMENT '정지 날짜',
	`date`	INT	NOT NULL	COMMENT '정지일수',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'activate'	COMMENT '밴 상태 "activate","deactivate"',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE
);
INSERT INTO `banned` (`userKey`, `reason`, `reasonDate`, `date`, `state`, `createdAt`, `updatedAt`) 
VALUES(1, '사유사유', '2024-04-04', 30, 'activate', now(), now());
SELECT * FROM `banned`;

CREATE TABLE `managerLog` (
	`managerLogKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL	COMMENT '매니저 활동로그키',
	`managerKey`	INT	NOT NULL	COMMENT '매니저 키',
	`activityLog`	VARCHAR(255)	NOT NULL	COMMENT '활동 기록',
	`referenceType`	VARCHAR(255)	NULL	COMMENT '참조 타입, 테이블 이름으로',
	`referenceKey`	INT	NULL	COMMENT '참조 키',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `channelRules` (
	`channelRulesKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`channelKey`	INT	NOT NULL,
	`title`	VARCHAR(30)	NOT NULL	COMMENT '채널 규칙 제목',
	`content`	Text	NOT NULL	COMMENT '채널 규칙은 배열로 처리',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`channelKey`) REFERENCES `channel`(`channelKey`) ON DELETE CASCADE
);

CREATE TABLE `faq` (
    `key` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(32) NOT NULL,
    `content` TEXT NOT NULL,
    `category` VARCHAR(32) NOT NULL,
    `imagePath` TEXT ,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Image` (
	`imageKey`	INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
	`imageUrl`	VARCHAR(300) UNIQUE	NOT NULL,
    `imageHash`  CHAR(64) NOT NULL UNIQUE,
    `referenceCount` INT DEFAULT 0,
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `loginLog`(
`loginKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`userKey` INT NOT NULL,
`loginSuccess` TINYINT NOT NULL DEFAULT 0,
`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE
);
CREATE TABLE `userConnection` (
`userKey`   INT  NOT NULL,
`sessionId` VARCHAR(30) UNIQUE NULL,
`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE
);

