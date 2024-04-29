CREATE DATABASE jwi default CHARACTER SET UTF8MB4;
use jwi;

-- 유저 테이블
CREATE TABLE `user` (
    `userEmail` VARCHAR(30) PRIMARY KEY NOT NULL, -- 유저 이메일
    `userPw` VARCHAR(255) NOT NULL, -- 유저 비밀번호
    `userName` VARCHAR(30) NOT NULL, -- 유저 닉네임
    `userGender` CHAR(1) NULL, -- 유저 성별
    `userAge` TINYINT NULL, -- 유저 나이
    `userBlind` TINYINT NOT NULL DEFAULT 0, -- 유저 활성 유무
    `userCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `userUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);

-- 즐겨찾기
CREATE TABLE `favorites` (
    `favoritesKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 즐겨찾기 키
    `userEmail` VARCHAR(30) NOT NULL, -- 유저 이메일
    `channelId` VARCHAR(30) NOT NULL, -- 체널 아이디
    `favoritesCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성 시간
    `favoritesUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);

-- 체널 정보
CREATE TABLE `channel` (
    `channelId` VARCHAR(30) PRIMARY KEY NOT NULL, -- 체널 아이디
    `channelName` VARCHAR(255) NOT NULL, -- 체널 이름
    `channelCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `channelUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);
-- 게시글
CREATE TABLE `post` (
    `postKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 게시글 키
    `channelId` VARCHAR(30) NOT NULL, -- 체널 아이디
    `userEmail` VARCHAR(30) NOT NULL, -- 유저 이메일
    `postTitle` VARCHAR(30) NOT NULL, -- 게시글 타이틀
    `postContent` TEXT NOT NULL, -- 게시글 내용
    `postBlind` TINYINT NOT NULL DEFAULT 0, -- 게시글 활성 유무 0: 활성 1: 비활성
    `postCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `postUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);

CREATE TABLE `comment` (
    `commentKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 댓글 키
    `postKey` INT NOT NULL, -- 게시글 키
    `userEmail` VARCHAR(30) NOT NULL, -- 유저 이메일
    `commentContent` TEXT NOT NULL, -- 댓글 내용
    `commentBlind` TINYINT NOT NULL DEFAULT 0, -- 갯글 활성 유무 0: 활성 1: 비활성
    `commentCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `commentUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);
 -- 좋아요 로그
CREATE TABLE `likeLog` (
    `likeLogKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 좋아요 키
    `postKey` INT NOT NULL, -- 게시글 키
    `userEmail` VARCHAR(30) NOT NULL, -- 유저 이메일
    `likeLogCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `likeLogUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);

-- 게시판 관리자
CREATE TABLE `manager` (
    `managerKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 관리가 키
    `userEmail` VARCHAR(30) NOT NULL, -- 관리자 이메일
    `channelId` VARCHAR(30) NOT NULL, -- 채널 아이디 
    `managerAuthority` TINYINT NOT NULL DEFAULT 1, -- 권한 단계 0:권한 제거, 1: 일반관리자 -> 높아질수록 권한높아짐(나중에)
    `managerCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `managerUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);
-- 유저 신고
CREATE TABLE `reportLog` (
    `reportLogKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 유저신고 기록 키
    `userEmail` VARCHAR(30) NOT NULL, -- 신고한 유저
    `reportEmail` VARCHAR(30) NOT NULL, -- 신고당한 유저
    `reportCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `reportUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);
-- 게시글 신고 로그
CREATE TABLE `postReportLog` (
    `postReportKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 게시글 신고 로그 키
    `userEmail` VARCHAR(30) NOT NULL, -- 신고한 유저
    `postKey` INT NOT NULL, -- 게시글 키 
    `postEmail` VARCHAR(30) NOT NULL, -- 게시글 작성자
    `postSend` TINYINT NOT NULL DEFAULT 0, -- 처리 유무 0: 처리 x, 1: 완
    `postReportCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `postReportUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);

-- 댓글 신고 로그
CREATE TABLE `commentReportLog` (
    `commentReportLogKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 댓글 신고 로그 키 
    `userEmail` VARCHAR(30) NOT NULL, -- 신고한 유저
    `commentKey` INT NOT NULL, -- 댓글 키 
    `commentEmail` VARCHAR(30) NOT NULL, -- 댓글 작성자
    `commentSend` TINYINT NOT NULL DEFAULT 0, -- 처리 유무 0: 처리 x, 1: 완
    `commentReportCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `commentReportUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);

-- 운영자
CREATE TABLE `admin` (
    `adminId` VARCHAR(30) PRIMARY KEY NOT NULL, -- 아이디
    `adminPw` VARCHAR(255) NOT NULL, -- 비밀번호
    `adminAuthority` TINYINT NOT NULL DEFAULT 1, -- 권한 레벨
    `adminCreatedAt` DATETIME NOT NULL DEFAULT NOW(), -- 생성시간
    `adminLoginTime` DATETIME NOT NULL DEFAULT NOW(), -- 가장최근 로그인 시간
    `adminUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);
-- 운영자 접속 기록
CREATE TABLE `adminLoginLog` (
    `adminLoginLogKey` INT PRIMARY KEY AUTO_INCREMENT NOT NULL, -- 운영자 접속 기록 키
    `adminId` VARCHAR(30) NOT NULL, -- 운영자 아이디
    `adminLogTime` DATETIME NOT NULL DEFAULT NOW(), -- 운영자 접속시간
    `adminLogUpdatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() -- 업데이트 시간
);
-- 즐겨찾기 테이블과 유저 테이블 사이의 연관성을 더해줌 ( userEmail ) 를 묶어줌
ALTER TABLE `favorites` ADD CONSTRAINT `fkUserToFavorites` FOREIGN KEY (`userEmail`)
REFERENCES `user` (`userEmail`);
-- 즐겨찾기 테이블과 채널 테이블 사이의 연관성을 더해줌 ( channelId ) 로 묶어줌
ALTER TABLE `favorites` ADD CONSTRAINT `fkChannelToFavorites` FOREIGN KEY (`channelId`)
REFERENCES `channel` (`channelId`);
-- 게시글 테이블과 채널 테이블 사이의 연관성을 더해줌 ( channelId ) 로 묶어줌
ALTER TABLE `post` ADD CONSTRAINT `fkChannelToPost` FOREIGN KEY (`channelId`)
REFERENCES `channel` (`channelId`);
-- 게시글 테이블과 유저 테이블 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌
ALTER TABLE `post` ADD CONSTRAINT `fkUserToPost` FOREIGN KEY (`userEmail`)
REFERENCES `user` (`userEmail`);
-- 댓글 테이블과 게시판 테이블 사이의 연관성을 더해줌 ( postKey ) 로 묶어줌
ALTER TABLE `comment` ADD CONSTRAINT `fkPostToComment` FOREIGN KEY (`postKey`)
REFERENCES `post` (`postKey`);
-- 댓글 테이블과 유저 이메일 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌
ALTER TABLE `comment` ADD CONSTRAINT `fkUserToComment` FOREIGN KEY (`userEmail`)
REFERENCES `user` (`userEmail`);
-- 좋아요 테이블 과 게시판 테이블 사이의 연관성을 더해줌 ( postKey) 로 묶어줌 
ALTER TABLE `likeLog` ADD CONSTRAINT `fkPostToLikeLog` FOREIGN KEY (`postKey`)
REFERENCES `post` (`postKey`);
-- 좋아요 테이블 과 유저 테이블 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌
ALTER TABLE `likeLog` ADD CONSTRAINT `fkUserToLikeLog` FOREIGN KEY (`userEmail`)
REFERENCES `user` (`userEmail`); 
-- 메니저 테이블 과 유저 테이블 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌
ALTER TABLE `manager` ADD CONSTRAINT `fkUserToManager` FOREIGN KEY (`userEmail`)
REFERENCES `user` (`userEmail`);
-- 메니저 테이블 과 채널 테이블 사이의 연관성을 더해줌 ( channelId ) 로 묶어줌
ALTER TABLE `manager` ADD CONSTRAINT `fkChannelToManager` FOREIGN KEY (`channelId`)
REFERENCES `channel` (`channelId`);
-- 신고 테이블 과 유저 이메일 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌
ALTER TABLE `reportLog` ADD CONSTRAINT `fkReportLogReporter` FOREIGN KEY (`userEmail`)
REFERENCES `user` (`userEmail`);
-- 신고 테이블 과 유저 이메일 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌
ALTER TABLE `reportLog` ADD CONSTRAINT `fkReportLogReported ` FOREIGN KEY (`reportEmail`)
REFERENCES `user` (`userEmail`);
-- 게시판 신고 로그 테이블과 유저 테이블 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌
ALTER TABLE `postReportLog` ADD CONSTRAINT `fkUserToPostReportLogReporter` FOREIGN KEY (`userEmail`)
REFERENCES `user` (`userEmail`);
-- 게시판 신고 로그 테이블과 게시판 테이블 사이의 연관성을 더해줌 ( postKey ) 로 묶어줌
ALTER TABLE `postReportLog` ADD CONSTRAINT `fkPostToPostReportLog` FOREIGN KEY (`postKey`)
REFERENCES `post` (`postKey`);

-- 게시글을 신고하였지만 유저가 아이디를 삭제하는경우가 있을수 있으니 제거
-- 게시판 신고 로그 테이블과 유저 테이블 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌
-- ALTER TABLE `postReportLog` ADD CONSTRAINT `fkUserToPostReportLog2` FOREIGN KEY (`postEmail`)
-- REFERENCES `user` (`userEmail`);
-- 댓글 신고 로그 테이블과 유저 테이블 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌

ALTER TABLE `commentReportLog` ADD CONSTRAINT `fkUserToCommentReportLogReporter` FOREIGN KEY (`userEmail`)
REFERENCES `user` (`userEmail`);

-- 댓글 신고 로그 테이블과 댓글 테이블 사이의 연관성을 더해줌 ( commentKey ) 로 묶어줌
ALTER TABLE `commentReportLog` ADD CONSTRAINT `fkCommentToCommentReportLog` FOREIGN KEY (`commentKey`)
REFERENCES `comment` (`commentKey`);

-- 댓글을 신고하였지만 유저가 아이디를 삭제하는경우가 있을수 있으니 제거
-- 댓글 신고 로그 테이블과 유저 테이블 사이의 연관성을 더해줌 ( userEmail ) 로 묶어줌
-- ALTER TABLE `commentReportLog` ADD CONSTRAINT `fkUserToCommentReportLog2` FOREIGN KEY (`commentEmail`)
-- REFERENCES `user` (`userEmail`);

-- 운영자 접속 기록 로그 테이블과 운영자 테이블 사이의 연관성을 더해줌 ( adminId ) 로 묶어줌
ALTER TABLE `adminLoginLog` ADD CONSTRAINT `fkAdminToAdminLoginLog` FOREIGN KEY (`adminId`)
REFERENCES `admin` (`adminId`);