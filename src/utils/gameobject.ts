// game object class 

import { Rectangle } from "./shapes"
import { Vector } from "./vector"
declare var globalThis: { context: CanvasRenderingContext2D }
export class GameObject {

    public position: Vector
    public width: number
    public color: string
    public velocity: Vector
    public name: string
    public hasDefaultGravity: boolean = false
    public terminalVelocity: number = 10

    constructor(position: Vector, width: number, color: string = "black", velocity: Vector = new Vector(0, 0), name: string = "GameObject") {
        this.position = position
        this.width = width
        this.color = color
        this.velocity = velocity
        this.name = name
    }

}



export class Particle extends GameObject {
    public mass: number
    public gvalue: number = 0.1
    constructor(position: Vector, width: number, mass: number, color: string = "black", velocity: Vector = new Vector(0, 0), name: string = "Particle") {
        super(position, width, color, velocity, name)
        this.mass = mass
    }

    public draw() {


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        globalThis.context.fillStyle = this.color
        globalThis.context.beginPath()
        globalThis.context.arc(this.position.x, this.position.y, this.width, 0, 2 * Math.PI)
        globalThis.context.fill()

        if (this.hasDefaultGravity) {
            if (this.velocity.y < this.terminalVelocity) {
                this.velocity.y += this.gvalue
            }

        }
    }

    public gravitateTo(particle: Particle) {


        var grav = new Vector(0, 0)
        var distance = this.position.distanceTo(particle.position)

        grav.setLength(particle.mass / (distance * distance))
        grav.setAngle(this.position.angleTo(particle.position))


        this.velocity.add(grav)

    }

    public setMass(mass: number) {
        this.mass = mass
    }

    public colidedWithRect(rect: Rectangle) {

        if (this.position.x + this.width > rect.position.x &&
            this.position.x < rect.position.x + rect.width &&
            this.position.y + this.width > rect.position.y &&
            this.position.y < rect.position.y + rect.height) {
            return true
        }

        return false
    }

    public colidedWithRectArray(rectArray: Rectangle[]) {
        for (var i = 0; i < rectArray.length; i++) {
            if (this.colidedWithRect(rectArray[i])) {
                return [true, rectArray[i]]
            }
        }
        return false
    }

    // colided with particle of width
    public colidedWithParticle(particle: Particle) {

        if (this.position.x + this.width > particle.position.x &&
            this.position.x < particle.position.x + particle.width &&
            this.position.y + this.width > particle.position.y &&
            this.position.y < particle.position.y + particle.width) {
            return true
        }

        return false
    }

    // colided with particle array of width
    public colidedWithParticleArray(particleArray: Particle[]) {
        for (var i = 0; i < particleArray.length; i++) {
            if (this.colidedWithParticle(particleArray[i])) {
                return particleArray[i]
            }
        }
        return false
    }

}
