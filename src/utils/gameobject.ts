// game object class 

import { Rectangle } from "./shapes"
import { Vector } from "./vector"
declare var globalThis: { context: CanvasRenderingContext2D }

/**
 * @absract GameObject class
 * @class GameObject
 * @param {Vector} position - position of the object
 * @param {number} width - width of the object
 * @param {string} color - color of the object
 * @param {Vector} velocity - velocity of the object
 * @param {string} name - name of the object
 */
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


/**
 * @class Particle
 * @extends GameObject
 * @param {Vector} position - position of the object
 * @param {number} width - width of the object
 * @param {number} mass - mass of the object
 * @param {string} color - color of the object
 * @param {Vector} velocity - velocity of the object
 * @param {string} name - name of the object
 * 
 */
export class Particle extends GameObject {
    public mass: number
    public gvalue: number = 0.1
    constructor(position: Vector, width: number, mass: number, color: string = "black", velocity: Vector = new Vector(0, 0), name: string = "Particle") {
        super(position, width, color, velocity, name)
        this.mass = mass
    }

    /**
     * @function draw
     * draw the particle on the canvas in every frame
     * @memberof Particle
     */
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

    /**
     * @function drawLine
     * @param {number} angle angle of the line
     * draw the partcle as a line with angle on the canvas in every frame
     * @memberof Particle
     */

    public drawLine(){
        globalThis.context.lineWidth = this.width;
        globalThis.context.strokeStyle = this.color;
        globalThis.context.beginPath()
        globalThis.context.moveTo(this.position.x, this.position.y)
        if(this.velocity.y > 6){
            // var newPOs = new Vector(this.position.x + this.velocity.x, this.position.y + this.velocity.y)
            // newPOs.rotateAround(angle, this.position)
            // newPOs.setAngle(angle)
            // newPOs.setLength(this.velocity.y)
            // globalThis.context.lineTo(newPOs.x, newPOs.y)
            // globalThis.context.lineTo(this.position.x + (this.velocity.x * Math.cos(angle)), this.position.y + (this.velocity.y * Math.sin(angle)))
            globalThis.context.lineTo(this.position.x + this.velocity.x, this.position.y + this.velocity.y * 3)
        }else{
            // var newPos = new Vector(this.position.x + this.velocity.x, this.position.y + this.velocity.y)
            // newPos.rotateAround(angle, this.position)
            // globalThis.context.lineTo(newPos.x, newPos.y)
            // globalThis.context.lineTo(this.position.x + (this.velocity.x * Math.cos(angle)), this.position.y + (this.velocity.y * Math.sin(angle)))
            globalThis.context.lineTo(this.position.x + this.velocity.x, this.position.y + this.velocity.y )
        }
        globalThis.context.stroke()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    /**
     * @function gravitateTo
     * @param {Particle} particle
     * @memberof Particle
     */

    public gravitateTo(particle: Particle) {
        var grav = new Vector(0, 0)
        var distance = this.position.distanceTo(particle.position)

        grav.setLength(particle.mass / (distance * distance))
        grav.setAngle(this.position.angleTo(particle.position))


        this.velocity.add(grav)

    }

    /**
     * @function setMass
     * @param {number} mass
     * @memberof Particle
     * set the mass of the particle 
     */
    public setMass(mass: number) {
        this.mass = mass
    }

    /**
     * @function colidedWithRect
     * @param {Rectangle} rect 
     * @returns {boolean}
     * @memberof Particle
     */
    public colidedWithRect(rect: Rectangle) {

        if (this.position.x + this.width > rect.position.x &&
            this.position.x < rect.position.x + rect.width &&
            this.position.y + this.width > rect.position.y &&
            this.position.y < rect.position.y + rect.height) {
            return true
        }

        return false
    }

    /**
     * @function colidedWithRectArray
     * @beta
     * @param {Rectangle[]} rectArray 
     * @returns {[boolean, Rectangle]}
     * @memberof Particle
     */
    public colidedWithRectArray(rectArray: Rectangle[]) {
        for (var i = 0; i < rectArray.length; i++) {
            if (this.colidedWithRect(rectArray[i])) {
                return [true, rectArray[i]]
            }
        }
        return false
    }

    // colided with particle of width
    /**
     * @function colidedWithParticle
     * @param {Particle} particle 
     * @returns {boolean}
     * @memberof Particle
     */
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
    /**
     * @function colidedWithParticleArray
     * @param {Particle[]}particleArray 
     * @returns {boolean | Particle} the result of the collision or the particle that colided or false
     * @memberof Particle
     */
    public colidedWithParticleArray(particleArray: Particle[]) {
        for (var i = 0; i < particleArray.length; i++) {
            if (this.colidedWithParticle(particleArray[i])) {
                return particleArray[i]
            }
        }
        return false
    }

}
