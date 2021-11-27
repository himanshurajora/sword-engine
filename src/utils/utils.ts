import { Particle } from "./gameobject";

var utils = {
    blastParticle : (particle : Particle)=>{
        particle.velocity.setLength(Math.random() * 10)
        particle.velocity.setAngle(Math.random() * 2 * Math.PI)
    },
    getRandomColor : () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

export default utils;