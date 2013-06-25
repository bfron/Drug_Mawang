#pragma strict

//var MessageBox : Transform;
var MessageBox_In : Transform;

var mawang : Transform;
var unni : Transform;
var dongsang : Transform;

private var ma_size : int = 7;
private var unni_size : int = 6;
private var dong_size : int = 7;

var ma_msg1 : Texture;
var ma_msg2 : Texture;
var ma_msg3 : Texture;
var ma_msg4 : Texture;

var un_msg1 : Texture;
var un_msg2 : Texture;
var un_msg3 : Texture;
var un_msg4 : Texture;

var dong_msg1 : Texture;
var dong_msg2 : Texture;
var dong_msg3 : Texture;
var dong_msg4 : Texture;
var dong_msg5 : Texture;
var dong_msg6 : Texture;

private var ani_playing : boolean;
private var ani_num : int;

function Start () {
	ani_playing = false;
	ani_num = 1;
	Show1();
}

function Update () {

	if(Input.GetButton("Touch") && ani_playing == false)
		Show1();

}
function Show1() {
	switch(ani_num)
	{
		case 1	:	ani_playing = true;
					yield WaitForSeconds(1);
					MessageBox_In.transform.renderer.material.mainTexture = ma_msg1;
					mawang.animation.Play("MawangOpen");
					animation.Play("MessageBoxOpen");
					MessageBox_In.animation.Play("Message_in_open");
					ani_num++;
					ani_playing = false;
					break; // 마왕 : 용케 이 성 까지 찾아오셨군요
					
		case 2	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					dongsang.animation.Play("DongsangOpen");
					MessageBox_In.transform.renderer.material.mainTexture = dong_msg1;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 마왕!
					
		case 3	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = ma_msg2;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 마왕 : 언니를 되찾기 위해서 오셨다면 안됐지만 돌아가셔야 겠네요.
					
		case 4	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = ma_msg3;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 마왕 : 그녀는 저와 혼인을 하였습니다.
					
		case 5 	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = dong_msg2;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 아니 나의 목적은 그게 아니야. 난 너를 보러 왔어. 내 목적은 너야.
					
		case 6 	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = ma_msg4;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 마왕 : ?!
					
		case 7 	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = dong_msg3;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 나를 가져 마왕
					
		case 8	:	ani_playing = true;
					mawang.animation.Play("MawangClose");
					yield WaitForSeconds(0.5);
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					unni.animation.Play("UnniOpen");
					yield WaitForSeconds(0.5);
					MessageBox_In.transform.renderer.material.mainTexture = un_msg1;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 언니 : 오랫만이구나 동생아. 방금 들은 말은 잘못이 아니겠지?
					
		case 9 	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = dong_msg4;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 언니. 오랫만에 봐서 이런말 하기는 미안하지만
					
		case 10	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = dong_msg5;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 동생 : 난 사실 처음 마왕을 봤을 때 부터 그가 마음에 들었어.
					
		case 11	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = un_msg2;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 언니 : 안보는 사이에 많이 컸구나.
					
		case 12	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = un_msg3;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 언니 : 어릴 때 종종 너와 나 둘 중에 누가 더 강할까 생각했었지.
					
		case 13	:	ani_playing = true;
					MessageBox_In.animation.Play("Message_in_close");
					yield WaitForSeconds(0.2);
					MessageBox_In.transform.renderer.material.mainTexture = un_msg4;
					MessageBox_In.animation.Play("Message_in_open");
					yield WaitForSeconds(0.2);
					ani_num++;
					ani_playing = false;
					break; // 언니의 마지막 메시지
					
		case 14	:	ani_playing = true;
					animation.Play("MessageBoxClose");
					mawang.localScale.x = 0;
					unni.localScale.x = 0;
					dongsang.localScale.x =0;
					
					yield WaitForSeconds(1);
					Application.LoadLevel("stage04");
					break;
	}
}
function Show() {
	yield WaitForSeconds(1);
	MessageBox_In.transform.renderer.material.mainTexture = ma_msg1;
	animation.Play("MessageBoxOpen");
	mawang.localScale.x = ma_size;
	yield WaitForSeconds(2);
	
//	animation.Play("MessageBoxClose");
//	yield WaitForSeconds(0.5);
	MessageBox_In.transform.renderer.material.mainTexture = dong_msg1;
//	animation.Play("MessageBoxOpen");
	dongsang.localScale.x = dong_size;
	yield WaitForSeconds(2);
	
//	animation.Play("MessageBoxClose");
//	yield WaitForSeconds(0.5);
	MessageBox_In.transform.renderer.material.mainTexture = ma_msg2;
//	animation.Play("MessageBoxOpen");
	yield WaitForSeconds(2);
	
//	animation.Play("MessageBoxClose");
//	yield WaitForSeconds(0.5);
	MessageBox_In.transform.renderer.material.mainTexture = ma_msg3;
//	animation.Play("MessageBoxOpen");
	yield WaitForSeconds(2);
	
	MessageBox_In.transform.renderer.material.mainTexture = dong_msg2;
	yield WaitForSeconds(2);
	MessageBox_In.transform.renderer.material.mainTexture = ma_msg4;
	yield WaitForSeconds(2);
	MessageBox_In.transform.renderer.material.mainTexture = dong_msg3;
	yield WaitForSeconds(2);
	
	unni.localScale.x = unni_size;
	MessageBox_In.transform.renderer.material.mainTexture = un_msg1;
	yield WaitForSeconds(2);
	MessageBox_In.transform.renderer.material.mainTexture = dong_msg4;
	yield WaitForSeconds(2);
	MessageBox_In.transform.renderer.material.mainTexture = dong_msg5;
	yield WaitForSeconds(2);
	MessageBox_In.transform.renderer.material.mainTexture = un_msg2;
	yield WaitForSeconds(2);
	MessageBox_In.transform.renderer.material.mainTexture = un_msg3;
	yield WaitForSeconds(2);
	MessageBox_In.transform.renderer.material.mainTexture = un_msg4;
	yield WaitForSeconds(2);
	
	animation.Play("MessageBoxClose");
	mawang.localScale.x = 0;
	unni.localScale.x = 0;
	dongsang.localScale.x =0;
	
	yield WaitForSeconds(2);
	Application.LoadLevel("stage04");
	
}