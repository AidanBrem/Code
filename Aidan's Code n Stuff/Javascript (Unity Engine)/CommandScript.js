var target : Transform;
 var MoveSpeed = 4;
 var ChargeDistance = 10;
 var MinDist = 5;
 var CanCharge = true;
 var Charging = false;
 var firingPoint : Transform;
 public var bullet : Transform;
 var canShoot = true;
 var zombie : Transform;
 var shootSpeed = 0.1;
 var selected = false;
 var isOrdered = false;
 var stayAway;
 var weapon = "";
 var col = false;
 var health = 50;
 var range : int;
 var FlameThrowerbullet : Transform;
 var findTarget = false;
 var firingGroup : GameObject;
 function Start () {
 	var master = GameObject.Find("Master").GetComponent.<arrayHolder>();
 	master.allyNum += 1;
 	var pickWeapon = Random.Range(0,5);
	//Start gives soldier a random weapon
 	if (pickWeapon == 21) {
 		weapon = "Pistol";
 	}
 	if (pickWeapon == 0 || pickWeapon == 1){
		weapon = "Rifle";
		range = 30000f;
	}

 	if (pickWeapon == 2) {
 		weapon = "Shotgun";
 		range = 50000f;
 	}
 	if (pickWeapon == 3) {
 		weapon = "HMG";
 		range = 40000f;
 	}

 	if (pickWeapon == 4) {
 		weapon = "FlameThrower";
 		range = 150000f;
 	}
	
	//range is a DIVISOR, so bigger = less range

 }
 function Update () 
 {	
	 if (health <= 0) {
		Destroy(this.gameObject);
	}

 	if (stayAway != null) {
 		//transform.position = ((transform.position - stayAway.position).normalized * 5 + stayAway.position);
 	}
 	transform.position.y = 1;
 	if (findTarget == true && canShoot == true) { // if we find a target and we are good to shoot, FIRE
 		Shoot();
 	}
 	if (target != null && col == false) { //so this is silly. Target is an object that is placed so you can order your guys around. findTarget that tells you if there is something to shoot at
 		transform.LookAt(target);
		transform.position += transform.forward*MoveSpeed*Time.deltaTime;
 	}

 }
   
 
 function Reload( seconds ) {
 	yield WaitForSeconds(seconds);
 	canShoot = true;
 }



 function FindTarget () : GameObject { //easier way to do this, overlay it with sphere. Can't find original code thouugh
 	var closest : GameObject;
 	var distance = Mathf.Infinity;
 	var position = transform.position;
 	for (var i = 0; i < firingGroup.transform.childCount; i++) { //each soldier has a firing groun that basically holds all the possible targets. Problem is some soldiers can "steal" a target from another, breaking them. Fixed in newest version
 		var diff = (firingGroup.transform.GetChild(i).position - position);
 		var curDistance = diff.sqrMagnitude;
 		if (curDistance < distance) {
 			closest = firingGroup.transform.GetChild(i).gameObject;
 			distance = curDistance;
 		}
 	}
	
	//simple expression so you can shoot at closest target
 		return closest;
 		print(closest);
 }



//ORDERED is a called function - something else calls it. Basically, set target to the object specified

function ORDERED(movepoint) {
	 target = movepoint.transform;
}


function OnCollisionEnter (other : Collision) {
	print(other.gameObject.tag);
	if (other.gameObject.tag == "Enemy") {
		Instantiate(zombie, this.transform.position, this.transform.rotation);
		Destroy(this.gameObject);
	}

	if (other.gameObject.tag == "Friendly") {
		print("Touched");
	}
}


//various shooting functions
function Shoot() {
	if (weapon == "Pistol") {
		if (firingGroup.transform.childCount > 0) {
			yield WaitForSeconds(0.1);
			canShoot = false;
			Reload(1f);

	 		transform.LookAt(FindTarget().transform);
	 		var bulletPistol = Instantiate(bullet, firingPoint.transform.position, this.transform.rotation);
	 		var bulletPistolR = bulletPistol.GetComponent.<Rigidbody>();
	 		bulletPistol.transform.eulerAngles.x = bulletPistol.transform.eulerAngles.x + Random.Range(-1f , 1f);
	 		bulletPistol.transform.eulerAngles.y = bulletPistol.transform.eulerAngles.y + Random.Range(-1f , 1f);
	 		bulletPistol.transform.eulerAngles.z = bulletPistol.transform.eulerAngles.z + Random.Range(-1f , 1f);
	 		bulletPistolR.AddForce( bulletPistol.transform.forward * 100  );
 		}
	}

	if (weapon == "Rifle") {
		Reload(0.75f);
		if (firingGroup.transform.childCount > 0) {
			yield WaitForSeconds(0.1);
			canShoot = false;
			if (firingGroup.transform.childCount > 0) {
			transform.LookAt(FindTarget().transform);
			var transformrot = transform.rotation;

	 		for (var i = 0; i < 3; i++) {
	 			transform.rotation = transformrot;
	 			var bulletRifle = Instantiate(bullet, firingPoint.transform.position, this.transform.rotation);
	 			var bulletRifleR = bulletRifle.GetComponent.<Rigidbody>();
	 			bulletRifle.transform.eulerAngles.x = bulletRifle.transform.eulerAngles.x + Random.Range(-1f , 1f);
	 			bulletRifle.transform.eulerAngles.y = bulletRifle.transform.eulerAngles.y + Random.Range(-1f , 1f);
	 			bulletRifle.transform.eulerAngles.z = bulletRifle.transform.eulerAngles.z + Random.Range(-1f , 1f);
	 			bulletRifleR.AddForce( bulletRifle.transform.forward * 100  );
	 			yield WaitForSeconds(0.1);
	 		}
	 		}
 		}
	}

	if (weapon == "Shotgun") {
		Reload(2f);
		if (firingGroup.transform.childCount > 0) {
			yield WaitForSeconds(0.1);
			canShoot = false;

			if (firingGroup.transform.childCount > 0) {
			transform.LookAt(FindTarget().transform);
			for (var s = 0; s < 10; s++) {
				var bulletPos = new Vector3 (firingPoint.transform.position.x + Random.Range(-0.1f, 0.1f), firingPoint.transform.position.y + Random.Range(-0.1f, 0.1f), firingPoint.transform.position.z + Random.Range(-0.1f, 0.1f));
				var bulletShotgun = Instantiate(bullet, bulletPos, this.transform.rotation);
				var bulletShotgunR = bulletShotgun.GetComponent.<Rigidbody>();
				bulletShotgun.transform.eulerAngles.x = bulletShotgun.transform.eulerAngles.x + Random.Range(-5f, 5f);
				bulletShotgun.transform.eulerAngles.y = bulletShotgun.transform.eulerAngles.y + Random.Range(-10f, 5f);
				bulletShotgun.transform.eulerAngles.z = bulletShotgun.transform.eulerAngles.z + Random.Range(-10f, 10f);
				bulletShotgunR.AddForce(bulletShotgun.transform.forward * 100);
			}
			}
		}
	}

	if (weapon == "HMG" && target == null) {
		Reload(0.1);
		if (firingGroup.transform.childCount > 0) {
			yield WaitForSeconds(0.1);
			canShoot = false;

			if (firingGroup.transform.childCount > 0) {
			transform.LookAt(FindTarget().transform);
			var bulletHMG = Instantiate(bullet, firingPoint.transform.position, this.transform.rotation);
			var bulletHMGR = bulletHMG.GetComponent.<Rigidbody>();
			bulletHMG.transform.eulerAngles.x = bulletHMG.transform.eulerAngles.x + Random.Range(-5f, 5f);
			bulletHMG.transform.eulerAngles.y = bulletHMG.transform.eulerAngles.y + Random.Range(-5f, 5f);
			bulletHMG.transform.eulerAngles.z = bulletHMG.transform.eulerAngles.z + Random.Range(-10f, 10f);
			bulletHMGR.AddForce(bulletHMG.transform.forward * 100);
			}
		}
	}

	if (weapon == "FlameThrower" && target == null) {
		Reload(0.05);
		if (firingGroup.transform.childCount > 0) {
			yield WaitForSeconds(0.1);
			canShoot = false;

			if (firingGroup.transform.childCount > 0) {
			transform.LookAt(FindTarget().transform);
			var bulletFlame = Instantiate(FlameThrowerbullet, firingPoint.transform.position, transform.rotation);
			var bulletFlameR = bulletFlame.GetComponent.<Rigidbody>();
			bulletFlameR.AddForce(bulletFlame.transform.forward * 10);
			}
		}
	}


}