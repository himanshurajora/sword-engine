import { Vector } from "./vector"

/**
 * @function rotateVector
 * @param {Vector} vector 
 * @param {number} angle 
 * @returns {Vector}
 * @description Rotates a vector by an angle
 */
export function rotateVector(vector: Vector, angle: number): Vector {
    let x = vector.x * Math.cos(angle) - vector.y * Math.sin(angle)
    let y = vector.x * Math.sin(angle) + vector.y * Math.cos(angle)
    return new Vector(x, y)
}

/**
 * @function scaleVector
 * @param {Vector} vector 
 * @param {number} scale 
 * @returns {Vector}
 * @description Scales a vector by a factor
 */
export function scaleVector(vector: Vector, scale: number): Vector {
    return new Vector(vector.x * scale, vector.y * scale)
}

/**
 * @function translateVector
 * @param {Vector} vector 
 * @param {Vector} translation 
 * @returns {Vector}
 * @description Translates a vector by a vector
 */
export function translateVector(vector: Vector, translation: Vector): Vector {
    return new Vector(vector.x + translation.x, vector.y + translation.y)
}

