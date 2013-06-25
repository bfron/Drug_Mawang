#pragma strict

/* 커멘드 처리 */

enum SKILL{dance, fire_attack};

private var stack : int[];
private var oldInput : int;
private var count = -1;

private var player_skill = [
						[4, 1, 2, 3], // dance
						[6, 3, 2, 1]  // fire_attack
					];
					
//private var dance : int[] = [4, 1, 2, 3];
//private var fire_attack : int[] = [3, 2, 1, 4];

function Start()
{
	oldInput = 0;
	stack = new int[4];
}

function Command (button : int){
	if(button == oldInput || button == 5)
		return;
	
	count++;
	print("command : " + button);
	oldInput = button;
	stack[count] = button;
	
	if(count >= 3)
	{
		Search_command();
		transform.SendMessage("Command_end", SendMessageOptions.DontRequireReceiver);
	}
}

function Skill (skil : SKILL) {
	switch(skil){
	case SKILL.dance:
		transform.animation["Ggiruk"].speed = 2;
		transform.animation.Play("Ggiruk");
		break;
	case SKILL.fire_attack:
		print("화...화이야!");
		break;
	}
}
function Search_command() {
	for(var i=0;i<player_skill.length;i++)
	{
		for(var j=0;j<player_skill[i].length;j++)
		{
			if(stack[j] != player_skill[i][j])
				break;
				
			if(j == player_skill.Length -1)
				Skill(i);
		}
	}
	
	count = -1;
}