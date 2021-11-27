// game object class 

import { Vector } from "./vector"
declare var globalThis : {context : CanvasRenderingContext2D}
export class GameObject {

    public position : Vector
    public width : number
    public color : string
    public velocity : Vector
    public name : string
    public hasDefaultGravity : boolean = false
    public terminalVelocity : number = 10

    constructor(position : Vector, width: number, color: string = "black",velocity : Vector = new Vector(0,0) , name: string = "GameObject"){
        this.position = position
        this.width = width
        this.color = color
        this.velocity = velocity
        this.name = name
    }

}



export class Particle extends GameObject {
    public mass : number
    constructor(position : Vector, width: number, mass : number, color: string = "black",velocity : Vector = new Vector(0,0) , name: string = "Particle"){
        super(position,width,color,velocity,name)
        this.mass = mass
    }

    public draw(){

        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        globalThis.context.fillStyle = this.color
        globalThis.context.beginPath()
        globalThis.context.arc(this.position.x,this.position.y,this.width,0,2*Math.PI)
        globalThis.context.fill()
        
        if(this.hasDefaultGravity){
            if(this.velocity.y < this.terminalVelocity){
                this.velocity.y += 0.1
            }
            
        }
    }

    public gravitateTo(particle: Particle){
        

        var grav = new Vector(0,0)
        var distance = this.position.distanceTo(particle.position)

        grav.setLength(particle.mass / (distance * distance))
        grav.setAngle(this.position.angleTo(particle.position))

        this.velocity.add(grav)
        
    }

    public setMass(mass : number){
        this.mass = mass
    }
    
}
