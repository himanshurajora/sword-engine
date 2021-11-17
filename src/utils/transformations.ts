import { Vector } from "./vector"

export function rotateVector(vector: Vector, angle: number): Vector {
    let x = vector.x * Math.cos(angle) - vector.y * Math.sin(angle)
    let y = vector.x * Math.sin(angle) + vector.y * Math.cos(angle)
    return new Vector(x, y)
}

export function scaleVector(vector: Vector, scale: number): Vector {
    return new Vector(vector.x * scale, vector.y * scale)
}

export function translateVector(vector: Vector, translation: Vector): Vector {
    return new Vector(vector.x + translation.x, vector.y + translation.y)
}

