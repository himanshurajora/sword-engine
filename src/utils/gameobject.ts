// game object class 

import { Vector } from "./vector"

export class GameObject {

    public position : Vector
    public width : number
    public color : string
    public velocity : Vector
    public name : string

    constructor(position : Vector, width: number, color: string = "black",velocity : Vector = new Vector(0,0) , name: string = "GameObject"){
        this.position = position
        this.width = width
        this.color = color
        this.velocity = velocity
        this.name = name
    }

}



export class Particle extends GameObject {
    constructor(position : Vector, width: number, color: string = "black",velocity : Vector = new Vector(0,0) , name: string = "Particle"){
        super(position,0,color,velocity,name)
    }

    public draw(){
        globalThis.context.fillStyle = this.color
        globalThis.context.arc(this.position.x,this.position.y,this.width,0,2*Math.PI)
        
    }
}
