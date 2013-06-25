#pragma strict

/* 호출시 클릭한 위치에 있는 gameObject를 target에 저장*/ 

static var target : GameObject;
private var ray : Ray;
private var hit : RaycastHit;
private var main_camera : GameObject;

function Click_object()
{
	main_camera = GameObject.Find("MainCamera");
	target = null;
	ray = main_camera.camera.ScreenPointToRay(Input.mousePosition);
	if (Physics.Raycast(ray, hit))
	{
		target = hit.collider.gameObject;
	}
}