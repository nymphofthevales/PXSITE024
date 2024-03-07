

export function pulse([a, b]: [number, number], speed: number, frame: number): number {
    let stretch = (b - a);
    let verticalOffset = stretch + a;
    let frequency = ( speed / Math.PI );

   let i = stretch * Math.sin( frame / frequency ) + verticalOffset;
   return i
}