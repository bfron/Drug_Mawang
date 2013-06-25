#pragma strict

/* 몬스터 행동 패턴.자세한 내용은 설정 참고. */

private var amtMove : float;
private var moveDirection : Vector3 = Vector3.zero;
private var gravity : float = 40.0;

private var type_1 : int = 0;
private var type_2 : int = 0;
private var cast_time =	0;

private var dummy_fireball : GameObject;
private var casting_fireball : GameObject;
private var fireball_point : Transform;
private var game_manager : GameObject;
private var user : GameObject;

private var controller : CharacterController;



/* 몬스터 능력치 */
private var visible : int;
private var range : int;
private var speed : int;
private var damage : int;
private var hp : int;
private var app_type : int;
private var att_type : int;

private var die : boolean;

function Start () {
	fireball_point = transform.Find("fireball_point");
	user = GameObject.Find("주인공");
	game_manager = GameObject.Find("GameManager");
	controller = GetComponent(CharacterController);
	
	amtMove = speed * Time.deltaTime;
	die = false;
	Set_monster();//game_manager.SendMessage("Set_monster",transform);
}

function Update () {
		
	game_manager.SendMessage("Check_motion", transform.gameObject);
	if(CheckMotion.motion == MOTION.gethit || CheckMotion.motion == MOTION.die) return;
	
	var di = transform.position.x - user.transform.position.x;
	if(die == false)
	{
		if(di < visible && di > range){
			Move();
		}else if(di <= range && (PlayerController.player_die == false)){
			if(cast_time != 0) Uncasting();
			Attack();
		}else{
			if(cast_time != 0) Uncasting();
			animation.Play("idle");
		}
	}
	
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime);
}
function SetDie()
{
	die = true;
}

function Move()
{
	
	if(app_type == 1)	// 뛰어서 접근
	{
		if (controller.isGrounded)
		{
			animation.Play("run");
		 	moveDirection = Vector3(0, 0, 1);
		 
			moveDirection = transform.TransformDirection(moveDirection);
			moveDirection *= speed;
		}
	}
	if(app_type == 2)	//제자리에서 대기
	{
		if (controller.isGrounded)
		{
		 	animation.Play("waitingforbattle");
		 	
			moveDirection = transform.TransformDirection(moveDirection);
			moveDirection *= speed;
		}
	}
	if(app_type == 3)	//마법 사용
	{
		if(cast_time == 0)
		{
			dummy_fireball = Instantiate(Resources.Load("fireball"), fireball_point.transform.position, fireball_point.transform.rotation);
		}
		cast_time++;
		if(cast_time == 200)
		{
			Destroy(dummy_fireball.gameObject);
			casting_fireball = Instantiate(Resources.Load("fireball"), fireball_point.transform.position, fireball_point.transform.rotation);
			casting_fireball.rigidbody.AddForce(transform.forward * 800);
			cast_time = -200;
		}
		
	}
}
function Attack()
{

	moveDirection.x = 0;
	if(att_type == 1)	// 닥공!!
	{
		animation.Play("attack");
	}
	if(att_type == 2) //1막 1공!!
	{
	  if(type_1 == 0 && !animation.IsPlaying("attack"))
	  {
	   animation.Play("gethit"); //방어 모션 넣기
	   type_1 = 1;
	  }
	  if(type_1 == 1 && !animation.IsPlaying("gethit"))
	  {
	   animation.Play("attack"); //방어 모션 넣기
	   type_1 = 2;
	  }
	  if(type_1 == 2 && !animation.IsPlaying("attack"))
	  {
	   animation.Play("attack");
	   type_1 = 0;
	  }
	}
	if(att_type == 3)	//랜덤 공방!!
	{
		type_2 = Random.Range(0, 3);
		if(type_2 == 0 && !animation.IsPlaying("attack")) // type_1이라고 되어 있었
		{
			animation.Play("gethit"); //방어 모션 넣기
		}
		if(type_2 <= 2 && !animation.IsPlaying("gethit"))
		{
			animation.Play("attack");
		}
	}
}

function Uncasting () {
	cast_time = 0;
	if(dummy_fireball != null){
		Destroy(dummy_fireball.gameObject);
	}
}

function Set_monster() {
	if(transform.name == "해골 병사(Clone)"){
		visible = 60;
		range = 10;
		speed = 30;
		damage = 3;
		hp = 20;
		app_type = 1;
		att_type = 1;
	}else if(transform.name == "해골 전사(Clone)"){
		visible = 80;
		range = 10;
		speed = 20;
		damage = 6;
		hp = 35;
		app_type = 1;
		att_type = 2;
	}else if(transform.name == "해골 창사(Clone)"){
		visible = 60;
		range = 14;
		speed = 20;
		damage = 4;
		hp = 30;
		app_type = 2;
		att_type = 3;
	}else if(transform.name == "해골 법사(Clone)"){
		visible = 150;
		range = 12;
		speed = 15;
		damage = 1;
		hp = 10;
		app_type = 3;
		att_type = 1;
	}
	transform.animation["attack"].speed = 0.7;
}

function ReturnDamage() : int
{
	SetMonster.damage = damage;
}























