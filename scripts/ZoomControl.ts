import * as THREE from "three";

class ZoomController {
    camera: THREE.Camera;
    scene: THREE.Scene;

    zoomTracker = 2;
    changeIn = new THREE.Vector3( 0, 0, -10 );
    changeOut = new THREE.Vector3( 0, 0, 10 );

    invertScroll: HTMLInputElement;
    zoomInBtn: HTMLButtonElement;
    zoomOutBtn: HTMLButtonElement;

    constructor(
        scene: THREE.Scene, 
        camera: THREE.Camera, 
        opts: ControllerOpts = getDefaults()) {
        this.scene = scene;
        this.camera = camera;
        this.invertScroll = opts.invertBtn;
        this.zoomInBtn = opts.zoomInBtn;
        this.zoomOutBtn = opts.zoomOutBtn;
    }
    setInputListeners() {
        this.zoomInBtn.addEventListener("mousedown", (e)=>{ this.zoomIn() });
        this.zoomOutBtn.addEventListener("mousedown", ()=>{ this.zoomOut() });
        window.addEventListener("wheel", (e)=>{ this.handleScrollInput(e) });
    }
    zoomIn() {
        if (this.zoomTracker > 0) {
            this.zoomTracker -= 1;
            this.camera.position.add(this.changeIn);
        }
    }
    zoomOut() {
        if (this.zoomTracker < 20) {
            this.zoomTracker += 1;
            this.camera.position.add(this.changeOut);
        }
    }
    handleScrollInput(event: WheelEvent) {
        console.log(event.deltaY)
        if (event.deltaY > 0 == this.invertScroll.checked) {
            this.zoomIn();
        } else {
            this.zoomOut();
        }
    }
}


interface ControllerOpts {
    invertBtn: HTMLInputElement;
    zoomInBtn: HTMLButtonElement;
    zoomOutBtn: HTMLButtonElement;
}
function getDefaults(): ControllerOpts {
    let s, i, o;
    s = <HTMLInputElement> document.getElementById("invertScroll");
    i = <HTMLButtonElement> document.getElementById("zoomin");
    o = <HTMLButtonElement> document.getElementById("zoomout");
    return {
        invertBtn: s,
        zoomInBtn: i,
        zoomOutBtn: o,
    }
}

