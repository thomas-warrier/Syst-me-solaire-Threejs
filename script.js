
        import * as THREE from 'three';
        import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
	 // Initialisation of the scene / camera / renderer
	 
	 var scene = new THREE.Scene();
	 var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	 
	 var renderer = new THREE.WebGLRenderer({ antialias: true});
	 const controls = new OrbitControls(camera, renderer.domElement);

	 renderer.setSize( window.innerWidth, window.innerHeight );

	 renderer.shadowMap.enabled = true;
	//light for the sun
	 const light = new THREE.PointLight( 0xffffff, 50, 100 );
	 light.position.set( 0, 0, 0 );
	 scene.add( light );
	 //second light for the environment
	 const light2 = new THREE.AmbientLight( 0xffffff,0.20 ); // soft white light
	scene.add( light2 );

	 document.body.appendChild( renderer.domElement );
	 camera.position.z = 10;
	 
	 camera.up = new THREE.Vector3(0, 1, 0);
	 camera.lookAt(new THREE.Vector3(0, 0, 0));
	 
	 // Initialisation of your objects / materials / light
	 var solarSystem = new THREE.Object3D();
	 scene.add(solarSystem);
	 solarSystem.rotateX(-0.8);
	 var ball = new THREE.SphereGeometry(2, 64, 64);
	 
	 
	 
	//ajout des etoiles en background
	let spheres = [];
	for (let i = 1; i < 300; i++) {
	let geometry = new THREE.SphereGeometry(0.3 * randomArbitrary(0.5, 1), 6, 6);
	let color = ['skyblue', 'white', 'yellow','pink'] 
	let material = new THREE.MeshBasicMaterial({
		color: new THREE.Color(color[Math.floor(Math.random() * 4)])
	});

	let sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
	spheres.push(sphere);
	sphere.position.setFromSpherical(new THREE.Spherical(100 + 20 * Math.random(), 2 * Math.PI * Math.random(), 2 * Math.PI * Math.random()))
	}	
	function randomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	//fonction pour ajouter le soleil
	function addSoleil(ref,texturePath,scale,radius,speed){
		var planetMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(texturePath ) } );
		var planet = new THREE.Mesh(
			ball,
			planetMaterial);
		planet.scale.set(scale, scale, scale);
		ref.add(planet)
		planet.angle = 0;
		planet.radius = radius;
		planet.speed = speed;
		return planet;
	 }

	//fonction pour ajouter les planetes
	 function addPlanet(ref,texturePath,scale,radius,speed){
		var planetMaterial = new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load(texturePath ) } );
		var planet = new THREE.Mesh(
			ball,
			planetMaterial);
		planet.scale.set(scale, scale, scale);
		ref.add(planet)
		planet.angle = 0;
		planet.radius = radius;
		planet.speed = speed;
		return planet;
	 }
	

	 const soleil = addSoleil(solarSystem,"textures/soleil.jpg",0.7,2,0.010)
	 const mercure = addPlanet(solarSystem,"textures/mercure.jpg",0.1,3,0.009)
	 const venus = addPlanet(solarSystem,"textures/venus.jpg",0.3,4,0.008)
	 const terre = addPlanet(solarSystem,"textures/terre.jpg",0.2,5,0.007)
	 const lune = addPlanet(terre,"textures/lune.jpg",0.4,3,0.006)
	 const mars = addPlanet(solarSystem,"textures/mars.jpg",0.2,6,0.005)
	 const jupiter = addPlanet(solarSystem,"textures/jupiter.jpg",0.4,7,0.004)
	 const saturne = addPlanet(solarSystem,"textures/saturne.jpg",0.38,8,0.003)
	 //ajout de l'anneau de saturne
	 const geometry = new THREE.RingGeometry(3.5, 2.5, 32);
	 const ringMaterial = new THREE.MeshPhongMaterial({ color: 0x63545B, side: THREE.DoubleSide });
	 const ring = new THREE.Mesh(geometry, ringMaterial);
	 saturne.add(ring);

	 const uranus = addPlanet(solarSystem,"textures/uranus.jpg",0.35,9,0.002)
	 const neptune = addPlanet(solarSystem,"textures/neptune.jpg",0.32,10,0.001)
	 
	 

	
	 
	
	//fonction pour calculer la rotation d'une planete autour d'un point (le soleil ou la terre pour la lune)
	//elipse est un boolean qui vaut par defaut true (mis a false pour la trajectoire de la lune)
	function rotatePlanetAroundPoint(planet,elipse=true){
		planet.position.x = calcX(planet.radius, planet.angle);
		planet.position.y = calcY(planet.radius,planet.angle,elipse);
		planet.angle += planet.speed;
	}
	

	 
	//fonction pour calculer la position x selon un rayon et un angle
	function calcX(radius, angle){
		return radius * Math.cos(angle);
	}
	//fonction pour calculer la position y selon un rayon et un angle
	function calcY(radius, angle,elipse){
		if (elipse == true){
			return radius * Math.sin(angle)/1.5;
		}
		else
		return radius * Math.sin(angle);
	}

	//fonction pour faire tourner une planete sur elle même
	function rotatePlanet(obj, rotation) {
		obj.rotation.x += rotation;
		obj.rotation.y += rotation;
	}

	
	
	 // This is executed for each frames
	function render() {
	     requestAnimationFrame( render );
	     // Animation code goes here
	 

        rotatePlanetAroundPoint(mercure)
		rotatePlanetAroundPoint(venus)
		rotatePlanetAroundPoint(terre)
		rotatePlanetAroundPoint(lune,false)
		rotatePlanetAroundPoint(mars)
		rotatePlanetAroundPoint(jupiter)
		rotatePlanetAroundPoint(saturne)
		rotatePlanetAroundPoint(uranus)
		rotatePlanetAroundPoint(neptune)
		
		rotatePlanet(soleil,0.003)
		rotatePlanet(mercure,0.003)
		rotatePlanet(venus,0.003)
		rotatePlanet(terre,0.003)
		rotatePlanet(lune,0.003)
		rotatePlanet(mars,0.003)
		rotatePlanet(jupiter,0.003)
		rotatePlanet(saturne,0.003)
		rotatePlanet(uranus,0.003)
		rotatePlanet(neptune,0.003)

		//for orbital controls
		controls.update();

		//rotatePlanet(sun)
	    renderer.render( scene, camera );

	}


	

	render();