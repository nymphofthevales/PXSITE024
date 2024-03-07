import * as THREE from 'three';
import { ZoomControl } from './ZoomControl';
import { AssetsManager } from './AssetsManager';
import { AnimationController } from './AnimationController'


export class PXSiteHome {
    scene = new THREE.Scene();
    mainCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    orthoCamera = new THREE.OrthographicCamera();

    assets = new AssetsManager();
    renderer: THREE.WebGLRenderer;
    animations: AnimationController;

    updateData = {
        FPSCap: 30,
        frameDelay: 0,
        lastFrameTime: 0
    }

    userInteractionControllers = {
        mainZoom: new ZoomControl(this.scene, this.mainCamera)
    };

    constructor(canvas: HTMLCanvasElement, opts = { scaleRatio: 1, frameRate: 30 } ) {
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.animations = new AnimationController( this.scene, this.renderer, this.assets );
        this.renderer.setSize( 
            window.innerWidth / opts.scaleRatio, 
            window.innerHeight / opts.scaleRatio );
        this.updateData.FPSCap = opts.frameRate;
        this.updateData.frameDelay = 1000 / this.updateData.FPSCap;
    }
    start(): void {
        let now = performance.now();
        this.updateData.lastFrameTime = now;
        this.populateScene();
        this.positionElementsInScene();
        this.update( now );
    }
    update( currentTime: DOMHighResTimeStamp ): void {
        let deltaT = currentTime - this.updateData.lastFrameTime;
        if (deltaT > this.updateData.frameDelay) {
            this.updateData.lastFrameTime = currentTime - (deltaT % this.updateData.frameDelay);
        
            this.animations.update( deltaT ); 
            this.renderer.render( this.scene, this.mainCamera );
        }
        requestAnimationFrame( this.update.bind(this) );
    }
    populateScene() {
        this.prepareGeneratedModels()
        let models = this.assets.models;
        for (let x in models) {
            this.scene.add( models[x] );
        }
    }
    prepareGeneratedModels() {
        this.assets.generateOrbits()
    }
    positionElementsInScene() {
        this.assets.setDefaultPosition();
        this.mainCamera.position.set( 0, 0, 60 );
    }
}