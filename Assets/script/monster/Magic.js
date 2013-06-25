#pragma strict

/* 몬스터의 마법 사용. */

function OnTriggerEnter(target : Collider)
{
	if(target.gameObject.name == "주인공")
	{
		Instantiate(Resources.Load("explosion"), transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}