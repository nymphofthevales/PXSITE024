import * as THREE from 'three';
import * as AnimTools from './AnimationTools';


export class AssetsManager {

    textures: { [key: string]: THREE.Texture } = {
        lady: new THREE.TextureLoader().load("./static/textures/menu_lady_mockup.png"),
        hand: new THREE.TextureLoader().load("./static/textures/hand.png")
    }
    materials: { [key: string]: THREE.Material } = {
        glowBlue: new THREE.MeshStandardMaterial({ 
            color: 0x55ffff,
            emissive: 'lightblue',
            emissiveIntensity: 0.3
        }),
        lady: new THREE.MeshBasicMaterial({
            map: this.textures.lady,
            transparent: true
        }),
        hand: new THREE.MeshBasicMaterial( {
            map: this.textures.hand,
            transparent: true
        } )
    }
    geometries: { [key: string]: THREE.BufferGeometry } = {
        psxOrb: new THREE.SphereGeometry(2,6,4),
        back_plane: new THREE.PlaneGeometry(30,60),
        front_plane: new THREE.PlaneGeometry(30,30)
    }
    models: { [key: string]: THREE.Object3D } = {
        psxOrb: new THREE.Mesh( this.geometries.psxOrb, this.materials.glowBlue ),
        backPlane: new THREE.Mesh( this.geometries.back_plane, this.materials.lady ),
        frontPlane: new THREE.Mesh( this.geometries.front_plane, this.materials.hand )
    }

    setDefaultPosition() {
        this.models.backPlane.position.set( 0, -3, -5 );
        this.models.frontPlane.position.set( 0, 4, 5 );
        this.models.psxOrb.position.set( 0, 8, 0 );
    }
    getRandOrbit({
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
        x.rotateX( 0.5 * Math.PI );
        let o = new THREE.Mesh( x, this.materials.glowBlue );
        return o
    }
    generateOrbits(n = 6) {
        let system = new THREE.Group();
        for (let i=0; i < n; i++) {
            system.add( this.getRandOrbit() );
        }
        this.models[`system`] = system ;
    }
}

