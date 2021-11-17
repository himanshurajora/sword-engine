export class Vector implements Vector{
    public x: number
    public y : number
    constructor(x: number, y: number) { 
        this.x = x
        this.y = y
    }
}

export function addVectors(...vectors: Vector[]): Vector {
    let x = 0
    let y = 0
    for (let vector of vectors) {
        x += vector.x
        y += vector.y
    }
    return new Vector(x, y)
}


export function subtractVectors(...vectors: Vector[]): Vector {
    let x = 0
    let y = 0
    for (let vector of vectors) {
        x -= vector.x
        y -= vector.y
    }
    return new Vector(x, y)
}

export function angleBetweenVectors(vector1: Vector, vector2: Vector): number {
    return Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x)
}
