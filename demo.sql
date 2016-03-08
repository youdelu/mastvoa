create database mastvoa ;

use mastvoa ;

drop table _user ;

create table _menu(
  mid integer not null AUTO_INCREMENT,
  parent_id integer default 0,
  _name varchar(60),
  link varchar(256),
  icon varchar(50),
  _type int, /**0 链接菜单 1 目录菜单**/
  _order int,
  _show int default 1, /**1 默认可见 0 对所有人隐藏 2 对部分人可见 **/
  del int default 0,
  _date timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  primary key (mid)
);

insert into _menu (_name,link) value("系统设置","linkyou");


create table _menu_show_people(
	mid integer,
	uid integer
);

create table _department(
	did integer not null AUTO_INCREMENT,
	parent_id integer,
	_order int,
	_name varchar(30),
	intro varchar(256),
	del int default 0,
	_date timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	primary key (did)
);
create table _role(
	rid integer not null AUTO_INCREMENT,
	_name varchar(30),
	intro varchar(256),
	del int default 0,
	_date timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	primary key (rid)
);
create table _user(
	uid integer not null AUTO_INCREMENT,
	department_id integer not null,
	role_id integer not null,
	userid varchar(30),
	username varchar(30),
	_password varchar(64),
	icon varchar(256),
	intro varchar(256),
	state int default 0,
	del int default 0,
	_date timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	primary key (uid)
);

insert into _user (department_id,role_id,userid,_password) value(1,1,'youdelu','f026aS7f9ejd874S80acp67d74a84ede971S78f4');

create table power_group(
	pgid integer not null AUTO_INCREMENT,
	_name varchar(30),
	primary key (pgid)
);
create table _power(
	pid integer not null AUTO_INCREMENT,
	pgid integer not null,
	_name varchar(30),
	url varchar(256),
	primary key (pid)
);
create table has_power(
	pid integer not null,
	uid integer not null
);

create table index_config(
	uid integer not null,
	has_lock int default 0 ,
	menu_draw int default 0
);
