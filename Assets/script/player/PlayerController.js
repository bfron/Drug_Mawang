#pragma strict

/* 플레이어에 대한 9위치 입력을 받아 처리. 몬스터와의 위치 조절. 공격 및 스킬 사용. */

private var range = 8;
private var rotspeed = 120;
private var camera_position : float = 10.0;

private var game_manager : GameObject;
private var maincamera : GameObject;
private var hitInfo : RaycastHit; // 충돌체 정보

private var movebutton : boolean;
private var cameraback : boolean;

static var touch_on : boolean; // 터치 입력 여부
static var command_count : int = 0;
static var command_click : boolean = false;

private var front : int = 1;
private var amtRot : float; // 플레이어가 돌아서는 각도

static var moveforce : int;
static var jumpforce : boolean;

private var controller : CharacterController; // 캐릭터 컨트롤러[중력판별용]

// 점프
private var jump_Sound_Timing : int;
private var jump_test : int;

static var player_die : boolean;


/*------ 소리 ------*/
var walk_Sound : AudioClip;
var kal_Sound : AudioClip; // 칼 휘두르는 사운드

var screenType : float;

var heroin_Body : GameObject;

function Start () {
	player_die = false;
	maincamera = GameObject.Find("MainCamera"); // 메인 카메라를 받아온다.
	jump_Sound_Timing = 0;
	jump_test = 0;
	screenType = (Screen.height * 1.0) / (Screen.width * 1.0);

	touch_on = true;
	controller = GetComponent(CharacterController);
	game_manager = GameObject.Find("GameManager");
	heroin_Body = GameObject.Find("heroin");
	
	transform.animation["jump2"].speed = 1.5;
	transform.animation["guard"].speed = 2.5;
	transform.animation["ducking"].speed = 2;
	
	
	amtRot = rotspeed * Time.deltaTime;
}

function Update () {
	if(player_die == false) // 플레이어가 살아있을 때만 작동
	{
		check_position();
		
		if(!touch_on) return;
		
		if(!Input.GetButton("Touch") && command_click == true)	// 커맨드 입력 취소
		{
			command_click = false;
		}
		
		if(command_count >= 10 && command_click == true) { // 커맨드 입력 처리
			if(Input.GetButton("Touch")){
				game_manager.SendMessage("Touch_button", null);
				transform.SendMessage("Command", Button.click_number);
			}
			return;
		}else if(command_count>= 1 && command_click == false){
			animation.Play("ducking");
			command_count = 0;
		}
		
		if(controller.isGrounded && jump_Sound_Timing == 1) // 뛰었다가 땅에 떨어졌을 때
		{
			PlayWalkSound(); // 걷는 사운드 재생
			jump_Sound_Timing = 0;
		}
		
		command_click = false;
		movebutton = false;
		cameraback = false;
		
		game_manager.SendMessage("Check_motion", transform.gameObject); // 현재 애니메이션(모션) 체크
		if(CheckMotion.motion == MOTION.gethit) return;
		if(CheckMotion.motion == MOTION.dance) return;
	
		
		if(CheckMotion.motion == MOTION.idle) animation.Play("idle");
	
		if(Input.GetButton("Touch")) Get_touch();
		else Get_key();
	
		if(!movebutton){
			if(CheckMotion.motion == MOTION.run && controller.isGrounded) {
				animation.Play("idle");
			}
		}
		if(!cameraback){ // 카메라가 뒤를 봐야 할 때
			if(camera_position < 10) camera_position += 0.4;
			if(front == -1 && controller.isGrounded)turn();
		}
		
		if(transform.position.x > 1158 && Application.loadedLevelName == "stage01") // 유저의 좌표가 1158이 되면 2스테이지로 넘어간다.
			Application.LoadLevel("stage02");
	}
}
function Command_end() // 커맨드 종료 처리
{
	command_click = false;
	command_count = 0;
}
function Get_touch()
{
	if(target_click()) return 0;
	
	if(CheckMotion.motion == MOTION.attack) return 0;
	
	game_manager.SendMessage("Touch_button", null);
		
	switch(Button.click_number){ // 화면을 9개의 좌표로 나누어서 각각의 좌표에 해당하는 기능을 실행시킨다.
		case 1 : Screen_1(); break;
		case 2 : Screen_2(); break;
		case 3 : Screen_3(); break;
		case 4 : Screen_4(); break;
		case 5 : Screen_5(); break;
		case 6 : Screen_6(); break;
		case 7 : Screen_7(); break;
		case 8 : Screen_8(); break;
		case 9 : Screen_9(); break;
	}
}

function Get_key() // 키보드 입력 처리
{
	if(Input.GetAxisRaw("Horizontal") == -1) {
		if(Input.GetAxisRaw("Vertical") == 1)	
			Screen_1();
		else if(Input.GetAxisRaw("Vertical") == -1)		
			Screen_7();
		else
			Screen_4();
	}
	else if(Input.GetAxisRaw("Horizontal") == 1) {
		if(Input.GetAxisRaw("Vertical") == 1)	
			Screen_3();
		else if(Input.GetAxisRaw("Vertical") == -1)		
			Screen_9();
		else
			Screen_6();
	}	
	else if(Input.GetAxisRaw("Vertical") == 1)	
		Screen_2();
	else if(Input.GetAxisRaw("Vertical") == -1)		
		Screen_8();
	else if(Input.GetButtonDown("attack")){
		transform.animation.Play("attack");
	}
	else if(Input.GetButtonDown("defence"))
		Screen_5();
	else if(Input.GetButtonDown("option"))
		Application.LoadLevel("option");
}

function Screen_1() // 1번 좌표를 터치했을 때 처리할 일
{
	if(CheckMotion.motion != MOTION.die)
	{
		if(front == 1)turn();
		
		jumpforce = true;
		moveforce = 1;
		jump_Sound_Timing = 1;
		animation.Play("run");
		if(camera_position > -10) camera_position -= 0.4;
		cameraback = true;
	}
}

function Screen_2() // 2번 좌표를 터치했을 때 처리할 일 -> 플레이어의 머리 위 : 점프
{
	if(CheckMotion.motion != MOTION.die)
	{
		if(jump_test == 0 && controller.isGrounded)
		{
			animation.Stop();
			animation.Play("jump2");
			jump_test = 1;
		}
		else if(animation.IsPlaying("jump2") == false)
		{	
			animation.Play("jump");
			jumpforce = true;
			jump_Sound_Timing = 1; // 점프했다가 땅에 닿았을 때 소리가 나게 하기 위함	
			jump_test = 0;
		}
		
	}
}

function Screen_3() // 3번 좌표를 터치했을 때 처리할 일
{
	if(CheckMotion.motion != MOTION.die)
	{
		if(front == -1) turn();
		
		animation.Play("run");
		movebutton = true;
		jumpforce = true;
		moveforce = 1;
		
		jump_Sound_Timing = 1;
	}
}
function Screen_4() // 4번 좌표를 터치했을 때 처리할 일
{
	if(CheckMotion.motion != MOTION.die)
	{
		if(front == 1)turn();
		
		moveforce = 1;
		
		if(controller.isGrounded)
		{
			animation.Play("run");
			PlayWalkSound();
		}
		movebutton = true;
		if(camera_position > -10) camera_position -= 0.4;
		cameraback = true;
	}
}

function Screen_5() // 5번 좌표를 터치했을 때 처리할 일 -> 커맨드 입력 대기
{
	if(controller.isGrounded)
	{
		command_count += 1;
		command_click = true;
	}
}

function Screen_6() // 6번 좌표를 터치했을 때 처리할 일
{
	if(/*controller.isGrounded &&*/ CheckMotion.motion != MOTION.die)
	{
		if(front == -1)turn();
		
		if(true)//controller.isGrounded) 
		{
			animation.Play("run");
			PlayWalkSound();
			moveforce = 1;
		} // 뛰다가 앞으로 갈 때 공중에서 좀 허우적 대도록 놔두는게 나을 것 같음. 내리막 내려올 때 모션이 부자연스러워 짐
		movebutton = true;
	}
}

function Screen_7()
{
	//
}

function Screen_8()
{
	
}

function Screen_9()
{
	//
}

function turn() // 플레이어의 방향을 돌린다
{
	transform.Rotate(Vector3.up * front * amtRot * 75);
	front *= -1;
}

function target_click() : boolean // 타겟을 터치 했을 때 처리
{
	if(front == 1){
		game_manager.SendMessage("Click_object", null);
		if(ClickObject.target == null) return false;
		var sight : Vector3 = transform.position;
		sight.y = sight.y + 5;
		hitInfo = RaycastHit();
		Debug.DrawRay(sight, Vector3.right * 10000, Color.red); // 디버그를 위해 디버그창에 Raycast 표시
		Physics.Raycast(sight, Vector3.right, hitInfo, 10000);
		
		var dist = ClickObject.target.transform.position.x - transform.position.x;
		if(dist <= range && (ClickObject.target.tag == "monster" || ClickObject.target.tag == "boss")) { // 타겟이 몬스터, 보스일 경우 처리
			if(ClickObject.target == hitInfo.collider.gameObject) {
				if(CheckMotion.motion != MOTION.attack) {
					animation.Play("attack");
					PlayKalSound();
					return true;
				}
			}
		}
	}
	return false;
}

function check_position () { // 카메라 포지션, 플레이어 포지션 설정
	if(screenType > 0.7)
		maincamera.transform.position.x = transform.position.x + camera_position-3;
	else
		maincamera.transform.position.x = transform.position.x + camera_position;
		
	maincamera.transform.position.y = transform.position.y + 15;
	maincamera.transform.position.z = transform.position.z - 45;
	
	moveforce = 0;
	jumpforce = false;
	transform.position.z = 0;
}
function PlayKalSound()
{
	audio.PlayOneShot(kal_Sound);
}
function PlayWalkSound()
{
	if(audio.isPlaying == false)
	{	
		audio.clip = walk_Sound;
		audio.Play();
	}
}