import * as THREE from 'three'
import * as AnimTools from './AnimationTools';
import { AssetsManager } from './AssetsManager';

export class AnimationController {
    
    frame: number = 0;
    deltaT = 0;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    assets: AssetsManager;

    animations: Animation[] = [
        { 
            name: 'glow',
            isActive: true,
            onUpdate: () => {
                let i = AnimTools.pulse( [0.1, 0.7], 60, this.frame );
                let glowBlue = <THREE.MeshStandardMaterial>this.assets.materials.glowBlue;
                glowBlue.emissiveIntensity = i;
            }
        },
        {
            name: 'spin',
            isActive: true,
            onUpdate: () => {
                this.assets.models.psxOrb.rotateY( this.getRPF(0.25) );
            }
        }, {
            name: 'rotateOrbits',
            isActive: true,
            onUpdate: () => {
                this.assets.models.system.rotateY( this.getRPF(0.01) )
            }
        }
    ]

    constructor( scene: THREE.Scene, renderer: THREE.WebGLRenderer, assets: AssetsManager ) {
        this.scene = scene;
        this.renderer = renderer;
        this.assets = assets;
    }
    update(dt: number) {
        this.frame += 1;
        this.deltaT = dt;
        let anims = this.animations;

        for ( let x in anims ) {
            let a = anims[x];
            if ( a.isActive ) {
                a.onUpdate();
            }
        }
    }
    /***
     * @params rps - desired rotations per second
     * @returns radians per frame
     */
    getRPF( rps: number ) {
        return rps * (2 * Math.PI) / 60
    }
}

interface Animation {
    name: string,
    isActive: boolean,
    onUpdate: Function
}