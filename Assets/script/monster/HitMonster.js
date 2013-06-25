#pragma strict

/* 몬스터 피격시 데미지 연산 및 몬스터 체력 변경. 몬스터 사망시 제거. */

private var game_manager : GameObject;

private var fight : boolean = false;
private var die : int = 0;

private var sword_damage : int;
private var user_damage : int;
private var skil_damage : int;


// 소리
var attack_Sound : AudioClip;

function Start(){
	game_manager = GameObject.Find("GameManager");
	transform.animation["gethit"].speed = 2;
	if(transform.tag == "boss")
		transform.animation["death"].speed = 0.5;
	else
		transform.animation["die"].speed = 2;
		
	sword_damage = 1;
	user_damage = 8;
}

function Update(){

	if(HP.enemy_hp <=0 && fight == true && die == 0){
		HP.enemy_hp = 0;
		
		if(transform.tag == "boss")
		{
			transform.gameObject.animation.Play("death");
			BossAI.die = true;
			game_manager.SendMessage("Fadeout", "stage05", SendMessageOptions.DontRequireReceiver);
		}
		else
		{
			transform.gameObject.animation.Play("die");
			transform.SendMessage("SetDie", SendMessageOptions.DontRequireReceiver);
		}
		
		die = 1;
	}
	if(die) die++;
	if(die == 70 && transform.tag != "boss"){
		Destroy(transform.gameObject);
	}
}

function OnTriggerEnter(target : Collider)
{
	if(game_manager == null)
		return;
	
	game_manager.SendMessage("Check_motion", transform.gameObject);
	if(CheckMotion.motion == MOTION.gethit || CheckMotion.motion == MOTION.die || BossAI.die == true) return;
	if(target.gameObject.name == "weapon_mace"){
		if(target.transform.root.animation["attack"].normalizedTime >= 0.3 && target.transform.root.animation["attack"].normalizedTime <= 0.8){
			HP.enemy_hp = HP.enemy_hp - Attack_check(target);
			transform.animation.Play("gethit");
			PlayAttackSound();
			Effect(target);
		}
	}
}

function Attack_check(target : Collider) : int{
	game_manager.SendMessage("Check_motion", target.gameObject);
	if(CheckMotion.motion == MOTION.idle){
		return 0;
	}
	if(CheckMotion.motion == MOTION.attack){
		fight = true;
		skil_damage = 1;
		return user_damage * sword_damage * skil_damage;
	}
}

function Effect (target : Collider) {
	var position = transform.position;
	position.y += 6.5;
	position.z -= 1;

	//position.z += 1.5;
	var spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	var step = Instantiate(Resources.Load("WaterStep"), position, target.transform.rotation);
	step = Instantiate(Resources.Load("WaterStep"), position, target.transform.rotation);
}
function PlayAttackSound()
{
	if(audio.isPlaying == false)
	{
		audio.clip = attack_Sound;
		audio.Play();
	}
}