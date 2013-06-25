#pragma strict

/* 화면을 9분할 터치형식으로 만듬. 터치 시 위치를 click_number변수에 저장.*/

private var player_position_center : Vector3;
private var player_position_left : Vector3;
private var player_position_right : Vector3;
private var player_position_top : Vector3;
private var player_position_bottom : Vector3;
private var player_size_x : float;
private var player_size_y : float;

private var user : GameObject;
private var maincamera : GameObject;

static var click_number : int;

function Start () {
	user = GameObject.Find("주인공");
	maincamera = GameObject.Find("MainCamera");
	
	player_position_center = maincamera.camera.WorldToScreenPoint(user.transform.position);
	
	player_size_x = user.transform.localScale.x * 2;
	player_size_y = user.transform.localScale.y * 5;
}

function OnGUI () {
	player_position_right = maincamera.camera.WorldToScreenPoint(user.transform.position + Vector3(player_size_x-0.5,0,0));
	player_position_left = maincamera.camera.WorldToScreenPoint(user.transform.position + Vector3(-player_size_x-0.5,0,0));
	player_position_top = maincamera.camera.WorldToScreenPoint(user.transform.position + Vector3(0,player_size_y+4,0));
	player_position_bottom = maincamera.camera.WorldToScreenPoint(user.transform.position + Vector3(0,-player_size_y+4,0));
	
	var t = player_position_top.y;
	var b = player_position_bottom.y;
	var l = player_position_left.x;
	var r = player_position_right.x;
	var w = Screen.width;
	var h = Screen.height;
/*	GUI.Box(Rect(0,0  ,l  ,h-t),"");
	GUI.Box(Rect(l,0  ,r-l,h-t),"");
	GUI.Box(Rect(r,0  ,w-r,h-t),"");
	GUI.Box(Rect(0,h-t,l  ,t-b),"");
	GUI.Box(Rect(l,h-t,r-l,t-b),"");
	GUI.Box(Rect(r,h-t,w-r,t-b),"");
	GUI.Box(Rect(0,h-b,l  ,b  ),"");
	GUI.Box(Rect(l,h-b,r-l,b  ),"");
	GUI.Box(Rect(r,h-b,w-r,b  ),""); */
}

function Touch_button(){
	if(Input.mousePosition.x > player_position_right.x)
	{
		if(player_position_top.y < Input.mousePosition.y)			
			click_number = 3;
		else if(player_position_bottom.y < Input.mousePosition.y)	
			click_number = 6;
		else														
			click_number = 9;
	}
	else if(Input.mousePosition.x > player_position_left.x)
	{
		if(player_position_top.y < Input.mousePosition.y)			
			click_number = 2;
		else if(player_position_bottom.y < Input.mousePosition.y)	
			click_number = 5;
		else														
			click_number = 8;
	}
	else
	{
		if(player_position_top.y < Input.mousePosition.y)			
			click_number = 1;
		else if(player_position_bottom.y < Input.mousePosition.y)	
			click_number = 4;
		else														
			click_number = 7;
	}
}



































