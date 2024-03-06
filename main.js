import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera();
const clock = new THREE.Clock();

const lady = new THREE.TextureLoader().load("./static/textures/menu_lady_mockup.png");
const hand = new THREE.TextureLoader().load("./static/textures/hand.png");

const sphere = new THREE.SphereGeometry(2,6,4);
const back_plane = new THREE.PlaneGeometry(30,60);
const front_plane = new THREE.PlaneGeometry(30,30);
const material = new THREE.MeshStandardMaterial( { 
    color: 0x55ffff,
    emissive: 'lightblue',
    emissiveIntensity: 0.3
} );
const mat = new THREE.MeshBasicMaterial( {
    map: lady,
    transparent: true
} );
const hand_mat = new THREE.MeshBasicMaterial( {
    map: hand,
    transparent: true
} ); 

//setup renderer canvas element
const canvas = document.getElementById("3DCanvas")
const renderer = new THREE.WebGLRenderer({ canvas });
const scaleRatio = 1;
renderer.setSize( window.innerWidth/scaleRatio, window.innerHeight/scaleRatio );

const orb = new THREE.Mesh( sphere, material );
const backPlane = new THREE.Mesh( back_plane, mat );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
const frontPlane = new THREE.Mesh( front_plane, hand_mat );

function getRandOrbit({
    radius: [r1, r2],
    tubeRadius: tr,
    radialSegments: rs,
    tubularSegments: ts

} = {
    radius: [15, 40],
    tubeRadius: 0.1,
    radialSegments: 8,
    tubularSegments: 40
} ) {
    let r = THREE.MathUtils.randInt(r1,r2);
    let x = new THREE.TorusGeometry(r, tr, rs, ts);
    let o = new THREE.Mesh( x, material );
    return o
}

let frame = 0;

function animate() {
    requestAnimationFrame( animate );
    incrementRotation(orb, 0.01);
    rotateOrbits();
    orb.material.emissiveIntensity = pulse([0.1, 0.7], 120);
    frame += 1;
    renderer.render( scene, camera );
}

function incrementRotation( mesh, interval ) {
    // mesh.rotation.x += interval;
    mesh.rotation.y += interval;

}

function pulse([a, b], speed) {
    let stretch = (b - a);
    let verticalOffset = stretch + a;
    let frequency = ( speed / Math.PI );

   let i = stretch * Math.sin( frame / frequency ) + verticalOffset;
   return i
}

let orbits = []
for (let i=0; i < 6; i++) {
    orbits.push( getRandOrbit() );
}
for (let i=0; i < orbits.length; i++) {
    scene.add( orbits[i] );
    orbits[i].rotation.set( 5, 0, 0 )
}
function rotateOrbits() {
    for (let i=0; i < orbits.length; i++) {
        let oldZ = orbits[i].rotation.z;
        orbits[i].rotation.set( 5, 0, oldZ + 0.006 ); //rotation is on z because axis is relative
    }
}

scene.add( backPlane );
scene.add( frontPlane );
scene.add( orb );
scene.add( directionalLight );

backPlane.position.set( 0, 0, -5 );
frontPlane.position.set( 0, 7, 5 );
camera.position.set( 0, 0, 60 );
orb.position.set( 0, 8, 0 );
directionalLight.position.set( 1, 1, 4 );

clock.start();
animate()



let zoomTracker = 2;
let changeIn = new THREE.Vector3( 0, 0, -10 );
let changeOut = new THREE.Vector3( 0, 0, 10 );

let invertScroll = document.getElementById("invertScroll");
let zoomin = document.getElementById("zoomin");
let zoomout = document.getElementById("zoomout");
zoomin.addEventListener("mousedown", ()=>{ zoomIn() });
zoomout.addEventListener("mousedown", ()=>{ zoomOut() });

window.addEventListener("wheel", (e)=>{ handleScrollInput(e) });

function handleScrollInput(event) {
    console.log(event.deltaY)
    if (event.deltaY > 0 == invertScroll.checked) {
        zoomIn();
    } else {
        zoomOut();
    }
};

function zoomIn() {
    if (zoomTracker > 0) {
        zoomTracker -= 1;
        camera.position.add(changeIn);
    }
}
function zoomOut() {
    if (zoomTracker < 20) {
        zoomTracker += 1;
        camera.position.add(changeOut);
    }
}