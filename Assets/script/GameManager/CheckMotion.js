#pragma strict

/* GameObject를 받아 해당 오브젝트의 행동을 확인, MOTION변수값으로 return함. */

enum MOTION{idle, run, walk, attack, defence, gethit, die, dance, evade, jump, guard, ducking};

static var motion : MOTION;

function Check_motion (character : GameObject){
	if(character.transform.root.animation.IsPlaying("idle")) motion = MOTION.idle;
	else if(character.transform.root.animation.IsPlaying("run")) motion = MOTION.run;
	else if(character.transform.root.animation.IsPlaying("walk")) motion = MOTION.walk;
	else if(character.transform.root.animation.IsPlaying("attack")) motion = MOTION.attack;
	else if(character.transform.root.animation.IsPlaying("defence")) motion = MOTION.defence;
	else if(character.transform.root.animation.IsPlaying("gethit")) motion = MOTION.gethit;
	else if(character.transform.root.animation.IsPlaying("die")) motion = MOTION.die;
	else if(character.transform.root.animation.IsPlaying("Ggiruk")) motion = MOTION.dance;
	else if(character.transform.root.animation.IsPlaying("evade")) motion = MOTION.evade;
	else if(character.transform.root.animation.IsPlaying("guard")) motion = MOTION.guard;
	else if(character.transform.root.animation.IsPlaying("jump")) motion = MOTION.jump;
	else if(character.transform.root.animation.IsPlaying("ducking")) motion = MOTION.ducking;
	else motion = MOTION.idle;
	
}