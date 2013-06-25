#pragma strict

/* 사용자의 움직임 설정. touchbutton에서 변수의 값을 받아와 플레이어의 위치 변경. 중력 적용 */

static var speed : float = 30.0;
static var jumpSpeed : float = 15.0;
private var gravity : float = 40.0;

private var moveDirection : Vector3 = Vector3.zero;

function Start () {

}

function Update () {
	var controller : CharacterController = GetComponent(CharacterController);
	
	if (controller.isGrounded) {
		 moveDirection = Vector3(0, 0, PlayerController.moveforce);
		 moveDirection *= speed;
		 moveDirection = transform.TransformDirection(moveDirection);
		 
		 
		 if (PlayerController.jumpforce) {
		 	moveDirection.y = jumpSpeed;
		 	
		}
	}
	
	moveDirection.y -= gravity * Time.deltaTime;
	
	controller.Move(moveDirection * Time.deltaTime);
}