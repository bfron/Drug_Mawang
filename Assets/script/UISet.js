#pragma strict

var hero_hp : Transform;
var hero_hp_text : Transform;
var enemy_hp : Transform;
var enemy_hp_text : Transform;

function Start () {
	var screenType : float;
		screenType = (Screen.height * 1.0) / (Screen.width * 1.0);
		
	if(screenType > 0.7)
	{
		hero_hp.transform.position.x += 1;
		hero_hp_text.transform.position.x += 1;
		enemy_hp.transform.position.x -= 1;
		enemy_hp_text.transform.position.x -= 1;
	}

}

function Update () {

}