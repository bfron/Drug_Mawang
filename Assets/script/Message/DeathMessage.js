#pragma strict
var message1 : Texture;
var MessageBox_In : Transform;

function Start () {
	Show();
}

function Update () {

}
function Show() {

	yield WaitForSeconds(1);
	MessageBox_In.transform.renderer.material.mainTexture = message1;
	animation.Play("MessageBoxOpen");
	MessageBox_In.animation.Play("Message_in_open");
	yield WaitForSeconds(3);
	MessageBox_In.animation.Play("Message_in_close");
	yield WaitForSeconds(0.5);
	animation.Play("MessageBoxClose");
	yield WaitForSeconds(1);
	Application.LoadLevel("stage00");

}