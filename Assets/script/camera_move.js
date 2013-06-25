#pragma strict

static var Focus : GameObject;
static var startPos : Vector3;
static var right : boolean;
static var number : double;
// Use this for initialization
function Start () {
	right = true;
	startPos = transform.position;
}
 
 // Update is called once per frame
function Update () {
	number += 2;
	//Focus = GameObject.Find("focus 1");
	
	if(number <= 1000) {
		Focus = GameObject.Find("focus 1");
	}else if(number <= 2000) {
		Focus = GameObject.Find("focus 2");
	}else if(number <= 3000) {
		Focus = GameObject.Find("focus 3");
	}else if(number <= 4000) {
		Focus = GameObject.Find("focus 4");
	}else if(number <= 5000) {
		Focus = GameObject.Find("focus 5");
	}else {
		number = 0;
	}
//	camera_move();
}

function camera_move(){
	transform.LookAt(Focus.transform.position);

	if(transform.position.x < startPos.x){
		right = true; 
	}
	if(transform.position.x >= startPos.x + 20.0f){
		right = false;
	}
	if(right){
		transform.position += new Vector3(1.0f,0.0f,0.0f) * Time.deltaTime;
	}
	else{
		transform.position -= new Vector3(1.0f,0.0f,0.0f) * Time.deltaTime; 
	}
}
/*
function OnGUI () {
	GUI.Box(Rect(100, 100, 100, 40),"RPG");
	GUI.Box(Rect(100, 150, 100, 40),"start");
}*/