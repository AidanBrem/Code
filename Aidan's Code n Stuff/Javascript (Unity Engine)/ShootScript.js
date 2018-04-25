var bullet : Transform;
var shootSpeed = 500;
var barrelLocation : Transform;
var artilleryCaller : Transform;
var CanShoot = true;
var selectDone = false;
var selector : Transform;
var originalselectPos;
var isOrdered;
var Ready = false;
var helipad : Transform;
var canCallHeli = false;
function Start () {
	HeliCoolDown();
}

//there is much more effiecent way to write this code - I wrote this about 6 months ago as a way to break into javascript. Sue me.

function Update () {
	if (GameObject.Find("Canvas").GetComponent.<MenuScript>().beginGame == true) {
		if (Input.GetMouseButtonDown(0)) {
			var hitspawn : RaycastHit;
			var rayspawn = Camera.main.ScreenPointToRay(Input.mousePosition);

			if (Physics.Raycast(rayspawn,hitspawn,1000)) {
				print(hitspawn.transform);
				if (hitspawn.transform.name == "FriendlySpawner") {
					print("hit FS");
					hitspawn.transform.GetComponent.<FriendlySpawner>().Spawn();
				}
			}
		}
		if (Input.GetButtonDown("Fire2") && GameObject.Find("Group")) {
			print("doing it");
			if(GameObject.Find("MovePoint(Clone)") && !Input.GetKey("left shift") ) {
				for (var child : Transform in GameObject.Find("MovePoints").transform) {
					Destroy(child.gameObject);
				}
			}
			var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			var hit : RaycastHit;
			if (Physics.Raycast(ray,hit,10000)) {
				print("ray hit");
				var projectile : Transform;
				print(hit.point);
				projectile = Instantiate(bullet, barrelLocation.transform.position, Quaternion.identity);
				projectile.transform.LookAt(hit.point);
				projectile.transform.parent = GameObject.Find("Group").transform;
				var projectileR : Rigidbody;
				projectileR = projectile.GetComponent.<Rigidbody>();
				projectileR.velocity = projectile.TransformDirection(Vector3.forward * shootSpeed);
				GameObject.Find("Group").GetComponent.<groupScript>().ordered = true;
			}
		}

		if (Input.GetKeyDown(KeyCode.H) && canCallHeli == true) {
			var rayH = Camera.main.ScreenPointToRay(Input.mousePosition);
			var hitH : RaycastHit;
			if (Physics.Raycast(rayH, hitH)) {
				Instantiate(helipad, hitH.point, Quaternion.identity);
				canCallHeli = false;
			}
		}
		if (Input.GetKeyDown(KeyCode.F) && Ready == true) {
			Ready = false;
			GameObject.Find("Score").GetComponent.<score>().artilleryReady = false;
			GameObject.Find("Score").GetComponent.<score>().artilleryPoints = GameObject.Find("Score").GetComponent.<score>().artilleryPoints - 10;
			if (CanShoot == true) {
				var ray2 = Camera.main.ScreenPointToRay(Input.mousePosition);
				var hit2 : RaycastHit;
				if (Physics.Raycast(ray2,hit2,100)) {
					var caller : Transform;
					caller = Instantiate(artilleryCaller, barrelLocation.transform.position, Quaternion.identity);
					caller.transform.LookAt(hit2.point);
					var callerR : Rigidbody;
					callerR = caller.GetComponent.<Rigidbody>();
					callerR.velocity = caller.TransformDirection(Vector3.forward * 1000);
					CanShoot = false;
				}

			}
		}
	}
}

function OnMouseDown () {
	
}

function HeliCoolDown() {
	yield WaitForSeconds(60);
	canCallHeli = true;
}