#pragma strict

var message1 : Texture;
var mossi : Transform;
var MessageBox_In : Transform;
static var bonusOk : boolean;

function Start () {
	Show();
}

function Update () {

}

function Show()
{
	yield WaitForSeconds(1);
	MessageBox_In.transform.renderer.material.mainTexture = message1;
	animation.Play("MessageBoxOpen");
	MessageBox_In.animation.Play("Message_in_open");
	HP.hero_hp = 100;
	yield WaitForSeconds(3);
	MessageBox_In.animation.Play("Message_in_close");
	yield WaitForSeconds(0.5);
	animation.Play("MessageBoxClose");
	mossi.animation.Play("MossiClose");
	VolumeDown();
	yield WaitForSeconds(3);
	
	bonusOk = true;
	Application.LoadLevel("stage02");
	
}

function VolumeDown ()
{
	for(var i = audio.volume; i>=0; i-=0.05)
	{
		audio.volume = i;
		yield WaitForSeconds(0.1);
	}
}

