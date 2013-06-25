#pragma strict

/* 몬스터에 대한 설정 */

static var visible : int;
static var range : int;
static var speed : int;
static var damage : int;
static var hp : int;
static var app_type : int;
static var att_type : int;

function Set_monster(monster : Transform) {
	if(monster.name == "해골 병사(Clone)"){
		visible = 60;
		range = 10;
		speed = 30;
		damage = 3;
		hp = 20;
		app_type = 1;
		att_type = 1;
	}else if(monster.name == "해골 전사(Clone)"){
		visible = 80;
		range = 10;
		speed = 20;
		damage = 6;
		hp = 35;
		app_type = 1;
		att_type = 2;
	}else if(monster.name == "해골 창사(Clone)"){
		visible = 60;
		range = 14;
		speed = 20;
		damage = 4;
		hp = 30;
		app_type = 2;
		att_type = 3;
	}else if(monster.name == "해골 법사(Clone)"){
		visible = 150;
		range = 12;
		speed = 15;
		damage = 1;
		hp = 10;
		app_type = 3;
		att_type = 1;
	}
	monster.animation["attack"].speed = 0.7;
}