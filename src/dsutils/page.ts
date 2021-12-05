import { Array1D, Array2D } from "./array"
import { Variable } from "./variable"

export class Page{

    public components 

    constructor(components : any[]){
        this.components = components
    }

    public draw(){
        this.components.forEach(component => {
            if(typeof component === typeof Array1D){
                component.draw()
            }if(typeof component === typeof Variable){
                component.draw()
            }if(typeof component === typeof Array2D){
                component.draw()
            }
        })
    }
    
}