#pragma strict

function Start () {

}

function OnTriggerEnter(target : Collider){
	var position = target.transform.position;
	position.y = position.y +1;
	if(target.transform.position.x <737 & target.transform.position.x > 702){
		var step = Instantiate(Resources.Load("WaterStep"), position, target.transform.rotation);
	}
}