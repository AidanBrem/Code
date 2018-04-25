//Bunch of variables declared. Note unity has custom variable types

var artilleryShell : Transform;
var initialSpeed : float;
var gravityConstant : float;
var firingAngle : float; 
var firingPoint : Transform;
var target : Transform;
var checkHit = false;
var canFire = false;
var shellReady = false;
//Update runs once per frame
function Update() {
	//If the object ArtilleryCaller exists (which gives location of strike, do it)
	if (shellReady == true && GameObject.Find("artilleryCaller(Clone)") ) {
		target = GameObject.Find("artilleryCaller(Clone)").transform;
		transform.LookAt(target);
		transform.eulerAngles.x = 0;
		transform.eulerAngles.z = 0;
  		var hit : RaycastHit;
		//A unity function, Physics.Raycast launches a ray from specified location and returns a transform which can be checked for criteria
  		if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), hit) && hit.transform.tag == "Caller" && hit.transform.GetComponent.<Stop>().firedAt !== true) {
  			PrepareToFire();
  			distance = hit.distance;
  			if ( canFire == true ) {
  				Barrage(1, distance);
  				print("ERE WE GO BOIS");
  			}
  		}
	}

   
}
//Actual function to fire shell
function FireShell (distance) {
	print("Distance : " + distance);
	//Bunch of math stuff - simple physics to find angle required to get shell a certain distance
	var part1 : float = distance * gravityConstant;
	var part2 : float = Mathf.Pow(initialSpeed, 2);
	var part3 : float = part1 / part2;
	var part4 : float = (Mathf.Asin(part3) * Mathf.Rad2Deg);
	print(part4);
	firingAngle = 90 - ((part4)/2);
	print("firing angle:" + " " + firingAngle);
	transform.eulerAngles.x = -firingAngle;
	var clone : Transform;
	//create the shell, set its angle
	clone = Instantiate(artilleryShell, firingPoint.transform.position, this.transform.rotation);
	clone.transform.eulerAngles.x = transform.eulerAngles.x;
	clone.transform.eulerAngles.y = transform.eulerAngles.y + Random.Range(-10f, 10f);
	var cloneR : Rigidbody;
	cloneR = clone.GetComponent.<Rigidbody>();
	cloneR.AddForce( clone.transform.forward * (initialSpeed + Random.Range(-3f, 1f)), ForceMode.VelocityChange  );
	clone.transform.eulerAngles.x = 90 + clone.transform.eulerAngles.x;
	clone.GetComponent.<ShellRotate>().flightSpeed = initialSpeed;
	clone.GetComponent.<ShellRotate>().angleOfShell = firingAngle;
	//OFF IT GOES! Note the randomness to simulate the randomness of firing a projectile literally kilometers
}

function Barrage(shells, distance) {
	//Just to get a barrage going
	shellReady = false;
	for ( var i = 0; i < shells; i++ ) {
		yield WaitForSeconds(0.2);
		FireShell(distance);
	}
	plswork = GameObject.Find("artilleryCaller(Clone)").transform;
	plswork.GetComponent.<Stop>().ShellFired = true;
}

function PrepareToFire () {
	yield WaitForSeconds (0.5);
	canFire = true;
}