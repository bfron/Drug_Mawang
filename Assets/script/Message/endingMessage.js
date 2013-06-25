#pragma strict

var dongsang : Transform;
var MessageBox_In : Transform;
var dong_msg1 : Texture;
var dong_msg2 : Texture;

private var ani_playing : boolean;
private var ani_num : int;


function Start () {
	ani_playing = false;
	ani_num = 1;
	Show();
}

function Update () {

	if(Input.GetButton("Touch") && ani_playing == false)
		Show();

}

function Show() 
{	

	switch(ani_num)
	{
		case 1	:	ani_playing = true;
					yield WaitForSeconds(1);
					MessageBox_In.transform.renderer.material.mainTexture = dong_msg1;
					dongsang.animation.Play("DongsangOpen");
					animation.Play("MessageBoxOpen");
					MessageBox_In.animation.Play("Message_in_open");
					ani_num++;
					ani_playing = false;
					break;
		
		case 2	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = dong_msg2;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break;
					
		case 3	:	ani_playing = true;
					dongsang.animation.Play("DongsangClose");
					animation.Play("MessageBoxClose");
					yield WaitForSeconds(2);
					Application.LoadLevel("stage00");
					break;
	}
}