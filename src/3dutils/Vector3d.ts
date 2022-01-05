
export class Vector3d{
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(v: Vector3d): Vector3d{
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    public sub(v: Vector3d): Vector3d{
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }


    public scale(s: number): Vector3d{
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    public dot(v: Vector3d): number{
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public cross(v: Vector3d): Vector3d{
        let x = this.y * v.z - this.z * v.y;
        let y = this.z * v.x - this.x * v.z;
        let z = this.x * v.y - this.y * v.x;
        return new Vector3d(x, y, z);
    }

    public getLength(): number{
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public getAngle(){
        return Math.atan2(this.y, this.x);
    }


    public normalize(): Vector3d{
        let l = this.getLength();
        this.x /= l;
        this.y /= l;
        this.z /= l;
        return this;
    }

    public clone(): Vector3d{
        return new Vector3d(this.x, this.y, this.z);
    }

    public toString(): string{
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    

}