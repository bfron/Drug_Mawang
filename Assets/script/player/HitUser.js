#pragma strict

/* 유저 피격시 데미지 연산. 사망시 사망 화면 호출. */

private var game_manager : GameObject;

private var fight : boolean = false;

private var skil_damage : float;

//소리
var attack_Sound : AudioClip;

private var userDie : boolean;

function Start () {
	userDie = false;
	game_manager = GameObject.Find("GameManager");
	transform.animation["run"].speed = 2.5;
	transform.animation["attack"].speed = 1.5;
	transform.animation["gethit"].speed = 0.5;
}

function Update() {
	if(HP.hero_hp <= 0 && userDie == false){
		userDie = true;
		PlayerController.player_die = true;
		PlayerDie();
	}
}
function PlayerDie()
{
	animation.Play("death");
	yield WaitForSeconds(1);
	game_manager.SendMessage("Fadeout", "deathStage", SendMessageOptions.DontRequireReceiver);
}

function OnTriggerEnter(target : Collider)
{
	game_manager.SendMessage("Check_motion", transform.gameObject);
	if(CheckMotion.motion == MOTION.ducking || CheckMotion.motion == MOTION.die) return;
	
	if(target.gameObject.tag == "magic"){
		HP.hero_hp -= 10;
		transform.animation.Play("gethit");
		return;
	}
	
	if(target.transform.root.name != "주인공")
	{
		if(target.transform.root.tag == "boss")
		{
			if(target.transform.root.animation["attack 3"].normalizedTime >= 0.3 || target.transform.root.animation["attack2"].normalizedTime >= 0.4){
				//if(target.transform.root.tag == "monster"){
				print("누구? " + target.name);
					HP.hero_hp = HP.hero_hp - Attack_check(target);
					transform.animation.Play("gethit");
					PlayAttackSound();
					Effect(target);
				//}
			}
		}
		else
		{
			if(target.transform.root.animation["attack"].normalizedTime >= 0.3){
				if(target.transform.root.tag == "monster"){
					HP.hero_hp = HP.hero_hp - Attack_check(target);
					transform.animation.Play("gethit");
					PlayAttackSound();
					Effect(target);
				}
			}
		}
	}
	
}

function Attack_check(target : Collider) : int{
	var monster_damage : int;
	
	if(target.transform.root.tag == "boss"){
		monster_damage = BossAI.damage;
	}else{
		target.transform.root.SendMessage("ReturnDamage");
	}
	game_manager.SendMessage("Check_motion", target.gameObject);
	//game_manager.SendMessage("Set_monster",target.transform.root);
	if(target.transform.root.tag != "boss"){
		if(CheckMotion.motion == MOTION.idle){
			return 0;
		}
	}
	if(CheckMotion.motion == MOTION.attack){
		fight = true;
		skil_damage = 1;
		return SetMonster.damage * skil_damage;
	}
	
	if(target.transform.root.animation.IsPlaying("idle") == true){
		return 0;
	}
	if(target.transform.root.animation.IsPlaying("attack2") == true){
		fight = true;
		skil_damage = 1;
		return monster_damage * skil_damage;
	}
	if(target.transform.root.animation.IsPlaying("attack 3") == true){
		fight = true;
		skil_damage = 1.5;
		return monster_damage * skil_damage;
	}
}

function Effect (target : Collider) {
	var position = target.transform.position;
	position.z -= 1.5;
	var spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
	spark = Instantiate(Resources.Load("Sparks"), position, Random.rotation);
}
function PlayAttackSound()
{
	if(audio.isPlaying == false)
	{
		audio.clip = attack_Sound;
		audio.Play();
	}
}