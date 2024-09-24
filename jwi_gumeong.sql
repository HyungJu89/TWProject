-- 2024-09-23 [안재원] V 0.1.17?
-- 수정 내용 : 좋아요 알람 로그 테이블 추가 (중복방지)
CREATE TABLE likeAlarmLog (
    logKey INT PRIMARY KEY AUTO_INCREMENT,
    postKey INT NOT NULL COMMENT '게시글 키',
    threshold INT NOT NULL COMMENT '좋아요 임계값 (10, 50, 100)',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_log (postKey, threshold)
);

-- 2024-09-10 [안재원] V 0.1.16?
-- 수정 내용 alarm 테이블 컬럼 하나 추가
ALTER TABLE `alarm` ADD COLUMN `referenceUserKey` INT COMMENT '알림을 발생시킨 사용자 키';

-- 2024-08-24 [조영민] V 0.1.15
-- 수정내용 : report 테이블 category int -> varchar로 수정 report 인서트문 추가
-- DB자체에서도 바꿔뒀으니 알터만 하면됨
ALTER TABLE `report`
MODIFY COLUMN `category` VARCHAR(32) NOT NULL COMMENT '신고 사유';
select * from `alarm`;
insert into `report`(reportUserKey,userKey,referenceType,referenceKey,category,content,state,createdAt,updatedAt)
values ('1','2','post','4','보안','꼴보기싫음 ㅡㅡ','unprocessed',now(),now());

insert into `report`(reportUserKey,userKey,referenceType,referenceKey,category,content,state,createdAt,updatedAt)
values ('2','8','post','4','욕설/혐오','왜 처리 안함 ㅡㅡ','unprocessed',now(),now());

insert into `report`(reportUserKey,userKey,referenceType,referenceKey,category,content,state,createdAt,updatedAt)
values ('4','2','post','4','오류/버그','에이펙스에서 핵쓰고다녔음 ㅡㅡ','unprocessed',now(),now());

insert into `report`(reportUserKey,userKey,referenceType,referenceKey,category,content,state,createdAt,updatedAt)
values ('4','2','post','4','오류/버그','엉덩이에서 총나옴 이거 어케 처리할껀데 진짜','unprocessed',now(),now());

insert into `report`(reportUserKey,userKey,referenceType,referenceKey,category,content,state,createdAt,updatedAt)
values ('8','2','post','4','욕설/혐오','아니 이새끼좀 처리하라고 진짜 핵쓰고 별의별 지랄 다함 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@','unprocessed',now(),now());

select *from user;

-- 2024-08-23 [조영민] V 0.1.14
-- 수정내용 : `state` 정지 상태  추가
ALTER TABLE `bannedLog`
ADD COLUMN `state` VARCHAR(50) NOT NULL COMMENT '정지 상태';

-- 2024-08-21 [조영민] V 0.1.13
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
   `state` VARCHAR(50) NOT NULL COMMENT '정지 상태',
   `createdAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updatedAt`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
	
select *from bannedLog;
select *from banned;

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
select *from admin;
insert into admin(adminName,adminPassWord,state,createdAt,updatedAt) values("asdf","$2a$12$qWMhwV31meoA0C6fvoVLX.OBe4NXvyz09HIewoxQ8EPProosm54z6","activate",now(),now());
insert into admin(adminName,adminPassWord,state,createdAt,updatedAt) values("dsfs3975","$2a$12$5UdVf8drVmy.R/dNuULOAej7jmz7aqoS7ON50aG.zzdSNZbJlYdBq","activate",now(),now());

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
select * from `likeAlarmLog`;
select * from `alarm`;
drop table user;
insert into user(email,pw,nickName,gender,pwWrong,birthday,state,createdAt,updatedAt) values ('zdasaszx@a.coaafaaassm','12s4','fdaadssdafsa','비밀',0,null,'activate',NOW(),NOW());
-- 자동 생성된 INSERT 문들
-- 자동 생성된 INSERT 문들
INSERT INTO `user` (email, pw, nickName, gender, pwWrong, birthday, state, createdAt, updatedAt) VALUES 
('user10@example.com', 'password10', 'nick10', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user11@example.com', 'password11', 'nick11', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user12@example.com', 'password12', 'nick12', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user13@example.com', 'password13', 'nick13', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user14@example.com', 'password14', 'nick14', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user15@example.com', 'password15', 'nick15', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user16@example.com', 'password16', 'nick16', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user17@example.com', 'password17', 'nick17', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user18@example.com', 'password18', 'nick18', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user19@example.com', 'password19', 'nick19', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user20@example.com', 'password20', 'nick20', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user21@example.com', 'password21', 'nick21', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user22@example.com', 'password22', 'nick22', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user23@example.com', 'password23', 'nick23', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user24@example.com', 'password24', 'nick24', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user25@example.com', 'password25', 'nick25', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user26@example.com', 'password26', 'nick26', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user27@example.com', 'password27', 'nick27', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user28@example.com', 'password28', 'nick28', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user29@example.com', 'password29', 'nick29', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user30@example.com', 'password30', 'nick30', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user31@example.com', 'password31', 'nick31', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user32@example.com', 'password32', 'nick32', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user33@example.com', 'password33', 'nick33', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user34@example.com', 'password34', 'nick34', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user35@example.com', 'password35', 'nick35', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user36@example.com', 'password36', 'nick36', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user37@example.com', 'password37', 'nick37', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user38@example.com', 'password38', 'nick38', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user39@example.com', 'password39', 'nick39', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user40@example.com', 'password40', 'nick40', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user41@example.com', 'password41', 'nick41', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user42@example.com', 'password42', 'nick42', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user43@example.com', 'password43', 'nick43', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user44@example.com', 'password44', 'nick44', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user45@example.com', 'password45', 'nick45', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user46@example.com', 'password46', 'nick46', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user47@example.com', 'password47', 'nick47', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user48@example.com', 'password48', 'nick48', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user49@example.com', 'password49', 'nick49', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user50@example.com', 'password50', 'nick50', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user51@example.com', 'password51', 'nick51', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user52@example.com', 'password52', 'nick52', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user53@example.com', 'password53', 'nick53', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user54@example.com', 'password54', 'nick54', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user55@example.com', 'password55', 'nick55', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user56@example.com', 'password56', 'nick56', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user57@example.com', 'password57', 'nick57', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user58@example.com', 'password58', 'nick58', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user59@example.com', 'password59', 'nick59', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user60@example.com', 'password60', 'nick60', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user61@example.com', 'password61', 'nick61', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user62@example.com', 'password62', 'nick62', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user63@example.com', 'password63', 'nick63', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user64@example.com', 'password64', 'nick64', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user65@example.com', 'password65', 'nick65', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user66@example.com', 'password66', 'nick66', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user67@example.com', 'password67', 'nick67', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user68@example.com', 'password68', 'nick68', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user69@example.com', 'password69', 'nick69', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user70@example.com', 'password70', 'nick70', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user71@example.com', 'password71', 'nick71', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user72@example.com', 'password72', 'nick72', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user73@example.com', 'password73', 'nick73', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user74@example.com', 'password74', 'nick74', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user75@example.com', 'password75', 'nick75', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user76@example.com', 'password76', 'nick76', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user77@example.com', 'password77', 'nick77', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user78@example.com', 'password78', 'nick78', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user79@example.com', 'password79', 'nick79', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user80@example.com', 'password80', 'nick80', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user81@example.com', 'password81', 'nick81', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user82@example.com', 'password82', 'nick82', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user83@example.com', 'password83', 'nick83', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user84@example.com', 'password84', 'nick84', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user85@example.com', 'password85', 'nick85', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user86@example.com', 'password86', 'nick86', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user87@example.com', 'password87', 'nick87', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user88@example.com', 'password88', 'nick88', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user89@example.com', 'password89', 'nick89', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user90@example.com', 'password90', 'nick90', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user91@example.com', 'password91', 'nick91', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user92@example.com', 'password92', 'nick92', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user93@example.com', 'password93', 'nick93', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user94@example.com', 'password94', 'nick94', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user95@example.com', 'password95', 'nick95', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user96@example.com', 'password96', 'nick96', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user97@example.com', 'password97', 'nick97', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user98@example.com', 'password98', 'nick98', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user99@example.com', 'password99', 'nick99', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user100@example.com', 'password100', 'nick100', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user101@example.com', 'password101', 'nick101', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user102@example.com', 'password102', 'nick102', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user103@example.com', 'password103', 'nick103', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user104@example.com', 'password104', 'nick104', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user105@example.com', 'password105', 'nick105', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user106@example.com', 'password106', 'nick106', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user107@example.com', 'password107', 'nick107', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user108@example.com', 'password108', 'nick108', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user109@example.com', 'password109', 'nick109', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user110@example.com', 'password110', 'nick110', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user111@example.com', 'password111', 'nick111', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user112@example.com', 'password112', 'nick112', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user113@example.com', 'password113', 'nick113', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user114@example.com', 'password114', 'nick114', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user115@example.com', 'password115', 'nick115', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user116@example.com', 'password116', 'nick116', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user117@example.com', 'password117', 'nick117', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user118@example.com', 'password118', 'nick118', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user119@example.com', 'password119', 'nick119', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user120@example.com', 'password120', 'nick120', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user121@example.com', 'password121', 'nick121', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user122@example.com', 'password122', 'nick122', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user123@example.com', 'password123', 'nick123', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user124@example.com', 'password124', 'nick124', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user125@example.com', 'password125', 'nick125', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user126@example.com', 'password126', 'nick126', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user127@example.com', 'password127', 'nick127', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user128@example.com', 'password128', 'nick128', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user129@example.com', 'password129', 'nick129', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user130@example.com', 'password130', 'nick130', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user131@example.com', 'password131', 'nick131', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user132@example.com', 'password132', 'nick132', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user133@example.com', 'password133', 'nick133', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user134@example.com', 'password134', 'nick134', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user135@example.com', 'password135', 'nick135', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user136@example.com', 'password136', 'nick136', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user137@example.com', 'password137', 'nick137', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user138@example.com', 'password138', 'nick138', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user139@example.com', 'password139', 'nick139', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user140@example.com', 'password140', 'nick140', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user141@example.com', 'password141', 'nick141', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user142@example.com', 'password142', 'nick142', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user143@example.com', 'password143', 'nick143', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user144@example.com', 'password144', 'nick144', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user145@example.com', 'password145', 'nick145', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user146@example.com', 'password146', 'nick146', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user147@example.com', 'password147', 'nick147', '여성', 2, NULL, 'activate', NOW(), NOW()),
('user148@example.com', 'password148', 'nick148', '비밀', 0, NULL, 'activate', NOW(), NOW()),
('user149@example.com', 'password149', 'nick149', '남성', 1, NULL, 'activate', NOW(), NOW()),
('user150@example.com', 'password150', 'nick150', '여성', 2, NULL, 'activate', NOW(), NOW());


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

select * from `alarm`;

insert into `like` (`userKey`, `postKey`, `createdAt`) values(2, 29, now());

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
	`category` VARCHAR(32) NOT NULL COMMENT '신고 사유',
	`content`	TEXT	NOT NULL	COMMENT '신고 내용',
	`state`	VARCHAR(50)	NOT NULL	DEFAULT 'unprocessed'	COMMENT '처리현황 "unprocessed","process" 작업자와 상의',
	`createdAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (`reportUserKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE
);

select *from alarm;
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
    `referenceUserKey` INT COMMENT '알림을 발생시킨 사용자 키',
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
select*from userConnection;
CREATE TABLE `userConnection` (
`userKey`   INT  NOT NULL,
`sessionId` VARCHAR(30) UNIQUE NULL,
`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`userKey`) REFERENCES `user`(`userKey`) ON DELETE CASCADE
);

