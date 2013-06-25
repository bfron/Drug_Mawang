#pragma strict

/* 지형에 대한 정보를 저장. - 자세한 사항은 설정에. */

private var user : GameObject;
private var game_manager : GameObject;
private var fadeout : GameObject;

private var dark : boolean = false;
private var hot : boolean = false;
private var play_fadeout : boolean;

function Start () {
	play_fadeout = false;
	user = GameObject.Find("주인공");
	game_manager = GameObject.Find("GameManager");
	fadeout = GameObject.Find("Fade");
}

function Update () {
	/*
	if(user.transform.position.x >= 1133 && user.transform.position.x <= 1200) {
		PlayerMove.speed = 15.0;
	}else {
		PlayerMove.speed = 30.0;
	}
	if(user.transform.position.x >= 1430 && user.transform.position.x <= 1442) {
		if(user.transform.position.y <= 0.55) {
			if(!hot) Hot_place();
		}
	}
	if(user.transform.position.x >= 1480 && user.transform.position.x <= 1492) {
		if(user.transform.position.y <= 0.55) {
			if(!hot) Hot_place();
		}
	}
	*/
	if(user.transform.position.x >= 1121) {
		if(!dark) {
			Fadeout("stage02");
		}
	}
	if(user.transform.position.x > 388 && Application.loadedLevelName == "stage02") {
		if(play_fadeout == false)
			Fadeout("stage03");
		//Application.LoadLevel("stage03");
	}
	if(user.transform.position.x < -39 && Application.loadedLevelName == "stage02") {
		if(BonusMessage.bonusOk == false && play_fadeout == false)
		{
			Fadeout("bonusStage");
		}
		else
		{
			user.transform.position.x = -39;
		}
	}
	if(user.transform.position.x > 389 && Application.loadedLevelName == "stage04") {
		BossAI.visible = true;
	}
}

function Hot_place () {
	hot = true;
	HP.hero_hp -= 1;
	yield WaitForSeconds(2.5);
	hot = false;
}

function Fadeout (stage : String) {
	play_fadeout = true;
	dark = true;
	PlayerController.touch_on = false;
	//user.transform.animation.Play("Ggiruk");
	user.transform.animation.Stop();
	fadeout.transform.animation.Play("fadeout");
	VolumeDown();
	yield WaitForSeconds(4);
	Application.LoadLevel(stage);
	
}
function VolumeDown ()
{
	for(var i = audio.volume; i>=0; i-=0.02)
	{
		audio.volume = i;
		yield WaitForSeconds(0.1);
	}
}

