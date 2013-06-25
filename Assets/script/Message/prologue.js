#pragma strict

var message1 : Texture;
var message2 : Texture;
var message3 : Texture;
var message4 : Texture;

var MessageBox : Transform;
var MessageBox_In : Transform;
var mawang : Transform;

var ma_message1 : Texture;
var ma_message2 : Texture;

private var ani_playing : boolean;
private var ani_num : int;


function Start () {
	ani_playing = false;
	ani_num = 1;
	Show1();
	
	BonusMessage.bonusOk = false;
}

function Update () {

	if(Input.GetButton("Touch") && ani_playing == false)
		Show1();
}

function Show1() {
	switch(ani_num)
	{
		case 1	:	ani_playing = true;
					animation.Play("MessageFade");
					yield WaitForSeconds(2);
					ani_num++;
					ani_playing = false;
					break;
		
		case 2	:	ani_playing = true;
					animation.Play("MessageFadeIn");
					yield WaitForSeconds(2);
					transform.renderer.material.mainTexture = message2;
					animation.Play("MessageFade");
					yield WaitForSeconds(2);
					ani_num++;
					ani_playing = false;
					break;
		
		case 3	:	ani_playing = true;
					animation.Play("MessageFadeIn");
					yield WaitForSeconds(2);
					MessageBox_In.transform.renderer.material.mainTexture = ma_message1;
					mawang.animation.Play("MawangOpen");
					MessageBox.animation.Play("MessageBoxOpen");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break;
		
		case 4 	:	ani_playing = true;
					MessageBox.animation.Play("MessageBoxClose");
					yield WaitForSeconds(0.5);
					MessageBox_In.transform.renderer.material.mainTexture = ma_message2;
					MessageBox.animation.Play("MessageBoxOpen");
					yield WaitForSeconds(0.5);
					ani_num++;
					ani_playing = false;
					break;
		
		case 5	:	ani_playing = true;
					MessageBox.animation.Play("MessageBoxClose");
					mawang.animation.Play("MawangClose");
					yield WaitForSeconds(0.5);
					transform.renderer.material.mainTexture = message3;
					animation.Play("MessageFade");
					yield WaitForSeconds(2);
					ani_num++;
					ani_playing = false;
					break;
		
		case 6	:	animation.Play("MessageFadeIn");
					yield WaitForSeconds(2);
					Application.LoadLevel("stage01");
					break;
	}


/*
	animation.Play("MessageFade");
	yield WaitForSeconds(2);
	animation.Stop();
	yield WaitForSeconds(2);
	animation.Play("MessageFadeIn");
	yield WaitForSeconds(2);
	transform.renderer.material.mainTexture = message2;
	animation.Play("MessageFade");
	yield WaitForSeconds(2);
	animation.Stop();
	yield WaitForSeconds(2);
	animation.Play("MessageFadeIn");
	yield WaitForSeconds(2);
	Show2(); */
}
function Show2() {
	MessageBox_In.transform.renderer.material.mainTexture = ma_message1;
	MessageBox.animation.Play("MessageBoxOpen");
	mawang.localScale.x = 7;
	yield WaitForSeconds(2);
	MessageBox.animation.Play("MessageBoxClose");
	yield WaitForSeconds(0.5);
	MessageBox_In.transform.renderer.material.mainTexture = ma_message2;
	MessageBox.animation.Play("MessageBoxOpen");
	yield WaitForSeconds(2);
	MessageBox.animation.Play("MessageBoxClose");
	mawang.localScale.x = 0;
	yield WaitForSeconds(0.5);
		
	transform.renderer.material.mainTexture = message3;
	animation.Play("MessageFade");
	yield WaitForSeconds(2);
	animation.Stop();
	animation.Play("MessageFadeIn");
	yield WaitForSeconds(2);
	
	Application.LoadLevel("stage01");
}