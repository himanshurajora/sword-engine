import { Particle } from "./gameobject";

/**
 * The utils class contains a number of utility functions.
 */
var utils = {

    /**
     * @function blastParticle
     * @param {Particle} particle the input particle
     * @description Blasts the particle 
     * Not yet implemented 
     */
    blastParticle : (particle : Particle)=>{
        particle.velocity.setLength(Math.random() * 10)
        particle.velocity.setAngle(Math.random() * 2 * Math.PI)
    },

    /**
     * @function getRandomColor
     * @returns {string} a random hex color
     */
    getRandomColor : () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    getRadomDarkColor : () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 6) + 10];
        }
        return color;
    },

    getRandomLightColor : () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 4)];
        }
        return color;
    },

    get2dArray : (rows : number, columns : number) => {
        return Array.from({length : rows}, ()=>Array.from({length : columns}, ()=> "  "))
    }
}




export default utils;