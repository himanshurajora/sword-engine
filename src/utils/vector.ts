// vector for 0,0 as origin
/**
 * @class Vector
 * @description Vector class for 0,0 as origin
 * @param {number} x
 * @param {number} y
 */
export class Vector implements Vector {
    public x: number
    public y: number
    public angle: number
    public length: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.angle = Math.atan2(this.y, this.x)
        this.length = Math.sqrt(this.x * this.x + this.y * this.y)
    }

    /**
     * @function add
     * @param {Vector} v 
     * @returns {Vector}
     * @description add vector
     * @memberof Vector
     */
    public add(v: Vector): Vector {
        this.x += v.x
        this.y += v.y
        return this
    }

    /**
     * @function substract
     * @param {Vector} v 
     * @returns {Vector}
     * @description substract vector
     * @memberof Vector
     */

    public subtract(v: Vector): Vector {
        this.x -= v.x
        this.y -= v.y
        return this
    }

    /**
     * @function scale
     * @param {number} v 
     * @returns {Vector}
     * @description scale vector
     * @memberof Vector
     */
    public scale(s: number): Vector {
        return new Vector(this.x * s, this.y * s)
    }

    /**
     * @function distanceTo
     * @param {Vector} v 
     * @returns {number}
     * @description distance to vector
     * @memberof Vector   
     */
    public distanceTo(v: Vector) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2))
    }

    /**
     * @function angleTo
     * @param {number} v 
     * @returns {Vector}
     * @description angle to vector
     * @memberof Vector
     */
    public angleTo(v: Vector) {
        return Math.atan2(v.y - this.y, v.x - this.x)
    }

    /**
     * @function getlength
     * @returns {number}
     * @description get length
     */
    public getlength(): number {
        return this.length
    }

    /**
     * @function getAngle
     * @returns {number}
     * @description get angle
     * @memberof Vector
     */
    public getAngle(): number {
        return this.angle
    }

    /**
     * @function normalize
     * @returns {number} 
     * @description normalize vector
     * @memberof Vector
     */
    public normalize(): Vector {
        return this.scale(1 / this.length)
    }

    /**
     * @funciton dot
     * @param {Vector} v 
     * @returns {number}
     * @description dot product
     * @memberof Vector
     */
    public dot(v: Vector): number {
        return this.x * v.x + this.y * v.y
    }

    /**
     * @function setLength
     * @param {number} 
     * @description set length 
     * @memberof Vector
     */
    public setLength(l: number) {
        this.length = l
        this.x = Math.cos(this.angle) * l
        this.y = Math.sin(this.angle) * l
    }

    /**
     * @function setAngle
     * @param {number} a 
     * @description set angle
     * @memberof Vector
     */
    public setAngle(a: number) {
        this.angle = a
        this.x = Math.cos(a) * this.length
        this.y = Math.sin(a) * this.length
    }

    /**
     * @function rotate
     * @param {number} angle 
     * @description rotate vector
     * @memberof Vector
     */
    public rotate(angle: number) {
        this.angle += angle
        this.x = Math.cos(this.angle) * this.length
        this.y = Math.sin(this.angle) * this.length
    }

    /**
     * @function rotateAround
     * @param {number} angle 
     * @param  {Vector} center
     * @description rotate around vector
     * @memberof Vector 
     */
    public rotateAround(angle: number, center: Vector) {
        this.x = center.x + (this.x - center.x) * Math.cos(angle) - (this.y - center.y) * Math.sin(angle),
            this.y = center.y + (this.x - center.x) * Math.sin(angle) + (this.y - center.y) * Math.cos(angle)
    }

    /**
     * @function createInstance
     * @param {number} x
     * @param {number} y
     * @returns {Vector}
     * @description A function to create a new vector instance from given co-ordinates
     * @memberof Vector
     */

    public static createInstance(x: number, y: number): Vector {
        return new Vector(x, y)
    }

}

/**
 * @deprecated
 * @class VectorAround
 * @description Vector class for any point as origin
 * Not Yet Implemented
 */
// vector for another vector as origin
export class VectorAround extends Vector {
    public origin: Vector
    constructor(x: number, y: number, origin: Vector) {
        super(x + origin.x, y + origin.y)
        this.origin = origin
    }

    public override getAngle(): number {
        return this.angle - this.origin.angle
    }

    public override setAngle(a: number): void {
        this.angle = a
        this.x = Math.cos(a) * this.length + this.origin.x
        this.y = Math.sin(a) * this.length + this.origin.y
    }

}


/**
 * @function addVectors
 * @param {Vector[]} vectors 
 * @returns {Vector}
 */
export function addVectors(...vectors: Vector[]): Vector {
    let x = 0
    let y = 0
    for (let vector of vectors) {
        x += vector.x
        y += vector.y
    }
    return new Vector(x, y)
}

/**
 * @function subtractVectors
 * @param {Vector[]} vectors 
 * @returns {Vector}
 */
export function subtractVectors(...vectors: Vector[]): Vector {
    let x = 0
    let y = 0
    for (let vector of vectors) {
        x -= vector.x
        y -= vector.y
    }
    return new Vector(x, y)
}


/**
 * @function angleBetweenVectors
 * @param {Vector} vector1 
 * @param {Vector} vector2 
 * @param {"degree" | "radian"} type 
 * @returns {number}
 */
export function angleBetweenVectors(vector1: Vector, vector2: Vector, type: "radian" | "degree" = "radian"): number {
    // angle in degrees
    if (type === "degree") {
        return Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x) * 180 / Math.PI
    }
    // angle in radians
    return Math.atan2(vector2.y - vector1.y, vector2.x - vector1.x)
}


/**
 * @function distanceBetweenVectors
 * @param {Vector} vector1 
 * @param {Vector} vector2 
 * @returns {number}
 */
export function distanceBetweenVectors(vector1: Vector, vector2: Vector): number {
    return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2))
}

/**
 * @function moveTowardVector
 * @param {Vector} vector1
 * @param  {Vector} vector2 
 * @param  {number} distance 
 * @returns {Vector}
 * @description returns a vector if a vector1 moves to vector2 by distance
 */
export function moveTowardVector(vector1: Vector, vector2: Vector, distance: number): Vector {
    let angle = angleBetweenVectors(vector1, vector2)
    let x = vector1.x + Math.cos(angle) * distance
    let y = vector1.y + Math.sin(angle) * distance
    return new Vector(x, y)
}

export function moveVectorByVelocity(vector: Vector, velocity: Vector): Vector {
    return vector.add(velocity)
}

/**
 * @function getNewVelocityByAccelaration
 * @param {Vector} velocity
 * @param {Vector} accelation 
 * @returns {Vector}
 * @description returns a new velocity vector if the acceleration is applied to the velocity
 */
export function getNewVelocityByAccelaration(velocity: Vector, accelation: Vector): Vector {
    return velocity.add(accelation)
}