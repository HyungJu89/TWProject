CREATE DATABASE jwi default CHARACTER SET UTF8MB4;
use jwi;

create table `ex`(
`no` int primary key auto_increment,
name VARCHAR(30)
);

insert into `ex` values (1,"fqewf");

select name from `ex` where no = 1;