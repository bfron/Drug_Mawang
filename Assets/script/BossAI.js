#pragma strict

/* 몬스터 행동 패턴.자세한 내용은 설정 참고. */

private var amtMove : float;
private var moveDirection : Vector3 = Vector3.zero;
private var gravity : float = 40.0;

private var game_manager : GameObject;
private var user : GameObject;

static var visible : boolean;
static var range : int;
static var speed : int;
static var damage : int;
static var hp : int;
static var type : int;

static var die : boolean;

function Start () {
	user = GameObject.Find("주인공");
	game_manager = GameObject.Find("GameManager");
	
	amtMove = SetMonster.speed * Time.deltaTime;
	visible = false;
	range = 8;
	speed = 15;
	damage = 7;
	hp = 100;
	
	transform.animation["jump2"].speed = 1.5;
	transform.animation["guard"].speed = 3;
	transform.animation["run"].speed = 2.5;
	transform.animation["attack2"].speed = 1.4;
	transform.animation["attack 3"].speed = 1.4;
	transform.animation["gethit"].speed = 2;
	
	die = false;
}

function Update () {
	game_manager.SendMessage("Check_motion", transform.gameObject);
	if(CheckMotion.motion == MOTION.gethit || CheckMotion.motion == MOTION.die || die == true) return;
	
	var di = transform.position.x - user.transform.position.x;
	
	if(die == false)
	{
		if(visible && di > range){
			Move();
		}else if((di <= range) && (PlayerController.player_die == false)){
			Attack();
		}else{
			animation.Play("idle");
		}
	}
}

function Move()
{
	var controller : CharacterController = GetComponent(CharacterController);

	if (controller.isGrounded)
	{
		animation.Play("run");
	 	moveDirection = Vector3(0, 0, 1);
	 
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
	}

		moveDirection.y -= gravity * Time.deltaTime;
		controller.Move(moveDirection * Time.deltaTime);

}
function Attack()
{
	type = Random.Range(0, 7);
	
	if(animation.isPlaying == false || animation.IsPlaying("run"))
		animation.Play("idle");
	if(type <= 2 && animation.IsPlaying("idle") == true )
	{
		animation.Play("attack2");
	}
	else if(type <= 4 && animation.IsPlaying("idle") == true )
	{
		//animation.Play("attack 3");
		animation.Play("guard");
	}
	else if(type <= 5 && animation.IsPlaying("idle") == true )
	{
		animation.Play("attack 3");
		//animation.Play("guard");
	}
	else if(type <= 6 && animation.IsPlaying("idle") == true )
	{
		animation.Play("evade");
	}
	else if(type <= 7 && animation.IsPlaying("idle") == true )
	{
		animation.Play("idle");
	}
	
}

























