#pragma strict

/* 화면에 몬스터를 배치. - 위치 정보는 설정 참고. */

private var temp : GameObject;

function Start () {

	if(Application.loadedLevelName == "stage01")
	{
		temp = Instantiate(Resources.Load("해골 병사"), Vector3(250, 7.6, 0), Quaternion.identity);
		 temp.transform.localRotation.y = -1;
		 
		 temp = Instantiate(Resources.Load("해골 병사"), Vector3(380, 7.6, 0), Quaternion.identity);
		 temp.transform.localRotation.y = -1;
		
		 temp = Instantiate(Resources.Load("해골 전사"), Vector3(570, 7.6, 0), Quaternion.identity);
		 temp.transform.localRotation.y = -1;
		
		 temp = Instantiate(Resources.Load("해골 병사"), Vector3(735, 7.6, 0), Quaternion.identity);
		 temp.transform.localRotation.y = -1;
		 
		 temp = Instantiate(Resources.Load("해골 창사"), Vector3(950, 7.6, 0), Quaternion.identity);
		 temp.transform.localRotation.y = -1;
		
		 temp = Instantiate(Resources.Load("해골 전사"), Vector3(1060, 7.6, 0), Quaternion.identity);
		 temp.transform.localRotation.y = -1;
		 
		 temp = Instantiate(Resources.Load("해골 법사"), Vector3(1080, 7.6, 0), Quaternion.identity);
		 temp.transform.localRotation.y = -1;
	}
	else if(Application.loadedLevelName == "stage02")
	{
		temp = Instantiate(Resources.Load("해골 병사"), Vector3(70, 0, 0), Quaternion.identity);
		temp.transform.localRotation.y = -1;
		
		temp = Instantiate(Resources.Load("해골 전사"), Vector3(120, 0, 0), Quaternion.identity);
		temp.transform.localRotation.y = -1;
	
		temp = Instantiate(Resources.Load("해골 전사"), Vector3(210, 0, 0), Quaternion.identity);
		temp.transform.localRotation.y = -1;
	
		temp = Instantiate(Resources.Load("해골 법사"), Vector3(235, 0, 0), Quaternion.identity);
		temp.transform.localRotation.y = -1;
		
		temp = Instantiate(Resources.Load("해골 창사"), Vector3(310, 0, 0), Quaternion.identity);
		temp.transform.localRotation.y = -1;
	
		temp = Instantiate(Resources.Load("해골 창사"), Vector3(360, 0, 0), Quaternion.identity);
		temp.transform.localRotation.y = -1;
	}
}
