#pragma strict

/* 몬스터의 초기 체력 설정. 체력 표시. */

static var hero_hp : float = 100;
static var enemy_hp : float = 0;
static var max_enemy_hp : float = 0;
private var hero_color : Color;
private var enemy_color : Color;

private var game_manager : GameObject;
private var hero_hp_bar : GameObject;
private var hero_hp_text : GameObject;
private var enemy_hp_bar : GameObject;
private var enemy_hp_text : GameObject;

private var hp_set_ok : boolean;

function Start () {
	game_manager = GameObject.Find("GameManager");
	hero_hp_bar = GameObject.Find("HeroHpBar");
	hero_hp_text = GameObject.Find("HeroHpText");
	enemy_hp_bar = GameObject.Find("EnemyHpBar");
	enemy_hp_text = GameObject.Find("EnemyHpText");
	hero_color = Color.white;
	enemy_color = Color.white;
	
	hp_set_ok = false;
}

function Update() {
	var temp : int;
	
	if(Input.GetButton("Touch"))
	{
		game_manager.SendMessage("Click_object", null);
		if(ClickObject.target == null) return;
		if(ClickObject.target.tag == "monster" && !enemy_hp && !ClickObject.target.animation.IsPlaying("die"))
		{
			game_manager.SendMessage("Set_monster", ClickObject.target.transform);
			enemy_hp = SetMonster.hp;
			max_enemy_hp = SetMonster.hp;
		}
		else if(ClickObject.target.tag == "boss" && !enemy_hp && !ClickObject.target.animation.IsPlaying("die") && !hp_set_ok) 
		{
			hp_set_ok = true;
		   enemy_hp = 100;
		   max_enemy_hp = 100;
		}
	}
	
	hero_color.g = hero_color.b = (hero_hp)/100;
	hero_hp_bar.transform.renderer.material.SetColor("_Color", hero_color);
	
	if(hero_hp < 0)
		hero_hp = 0;
		
	hero_hp_text.transform.GetComponent(TextMesh).text = hero_hp + "%";
	
	if(enemy_hp > 0){
		enemy_hp_bar.transform.localScale.x = 0.6;
		enemy_hp_text.transform.localScale.x = 0.03;
		
		enemy_color.g = enemy_color.b = enemy_hp/max_enemy_hp;
		enemy_hp_bar.transform.renderer.material.SetColor("_Color", enemy_color);
		temp =  (enemy_hp/max_enemy_hp)* 100;
		enemy_hp_text.transform.GetComponent(TextMesh).text = temp + "%";
	}
	else
	{
		enemy_hp_bar.transform.localScale.x = 0;
		enemy_hp_text.transform.localScale.x = 0;
	}
}