import * as THREE from 'three';

export class MouseInput {

    raycaster = new THREE.Raycaster();
    cursorPos = new THREE.Vector2();
    history = new Array(); 
    historyMaxLength = 15; 
    interactables: { [name: string]: THREE.Object3D } = {

    }

    constructor() {
        window.addEventListener('pointermove', (e) => { this.onCursorMove(e) })
    }
    update() {
        //TODO consider 
    }
    onCursorMove(e: MouseEvent) {
        this.updatePosition(e.clientX, e.clientY)
    }
    updatePosition(x: number, y: number) {
        this.history.push( this.cursorPos );
        if (this.history.length > this.historyMaxLength) {
            this.history.shift();
        }
        this.cursorPos.set( x, y )
    }
    //note: not sure if this is necessary, but if we use a custom cursor 
    //it may help frame lag while interacting with animated objects.
    lockInputToFramerate() {}
    get normalizedDeviceCoordinates() {
        let normX = ( this.cursorPos.x / window.innerWidth ) * 2 - 1;
        let normY = ( this.cursorPos.y / window.innerHeight ) * 2 - 1;
        return new THREE.Vector2( normX, normY );
    }
    getIntersectingObjects( camera: THREE.PerspectiveCamera, scene: THREE.Scene ): THREE.Intersection[] {
        this.raycaster.setFromCamera( this.normalizedDeviceCoordinates, camera );
        return this.raycaster.intersectObjects(scene.children);
    }
    getClosestObject( intersections: THREE.Intersection[] ): THREE.Object3D | false {
        let objNotFound = true;
        while (objNotFound) {
            let o = intersections[0].object;
            if ( this.isValidObj(o) ) {
                return o;
            }
            let last = intersections.pop()
            if (last = undefined) {
                objNotFound = false;
            }
        }
        return false;
    }
    isValidObj( o: THREE.Object3D ): boolean {
        //TODO
        //if (o.name in this.interactables) {
            return true;
        //}
        //return false;
    }
}