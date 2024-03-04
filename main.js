import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const clock = new THREE.Clock();

//setup renderer canvas element
const canvas = document.getElementById("3DCanvas")
const renderer = new THREE.WebGLRenderer({ canvas });
const scaleRatio = 2;
renderer.setSize( window.innerWidth/scaleRatio, window.innerHeight/scaleRatio );
document.body.innerHTML = ""
document.body.appendChild( renderer.domElement ).id = `rendererCanvas`;

//add cube to scene
const geometry = new THREE.SphereGeometry(3,8,4);
const material = new THREE.MeshBasicMaterial( { color: 0x00aaff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//add light to scene
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
scene.add( directionalLight );

camera.position.z = 5;

let frame = 0;

function animate() {
    requestAnimationFrame( animate );
    incrementRotation(cube, 0.01);
    frame += 1;
    renderer.render( scene, camera );
}

function incrementRotation( mesh, interval ) {
    // mesh.rotation.x += interval;
    mesh.rotation.y += interval;

}

function pulseColor() {
    material.color += 0x010000;
}

clock.start();
animate()