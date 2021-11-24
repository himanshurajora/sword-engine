// vector class
export class Vector implements Vector {
    private x: number
    private y: number
    private length: number
    private angle: number
    
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.length = Math.sqrt(this.x * this.x + this.y * this.y)
        this.angle = Math.atan2(this.y, this.x)
    }
    public add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y)
    }
    public sub(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y)
    }
    public mul(v: Vector): Vector {
        return new Vector(this.x * v.x, this.y * v.y)
    }
    public div(v: Vector): Vector {
        return new Vector(this.x / v.x, this.y / v.y)
    }
    public scale(s: number): Vector {
        return new Vector(this.x * s, this.y * s)
    }
    public dot(v: Vector): number {
        return this.x * v.x + this.y * v.y
    }
    public normalize(): Vector {
        let l = this.getLength()
        return new Vector(this.x / l, this.y / l)
    }
    public rotate(a: number): Vector {
        let c = Math.cos(a)
        let s = Math.sin(a)
        return new Vector(this.x * c - this.y * s, this.x * s + this.y * c)
    }
    public distance(v: Vector): number {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2))
    }
    public equals(v: Vector): boolean {
        return this.x == v.x && this.y == v.y
    }
    public getLength(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    public getAngle(): number {
        return Math.atan2(this.y, this.x)
    }
    public setAngle(angle: number) {
        this.angle = angle
        this.x = this.length * Math.cos(angle)
        this.y = this.length * Math.sin(angle)
    }
    public setLength(length: number) {
        this.length = length
        this.x = length * Math.cos(this.angle)
        this.y = length * Math.sin(this.angle)
    }

    public angleFrom(v: Vector): number {
        return Math.atan2(v.y - this.y, v.x - this.x)
    }

    public moveTowards(v: Vector, speed: number) {
        let angle = this.angleFrom(v)
        this.x += Math.cos(angle) * speed
        this.y += Math.sin(angle) * speed
    }

    public setX(x: number) {
        this.x = x
        this.length = Math.sqrt(this.x * this.x + this.y * this.y)
        this.angle = Math.atan2(this.y, this.x)
    }
    public setY(y: number) {
        this.y = y
        this.length = Math.sqrt(this.x * this.x + this.y * this.y)
        this.angle = Math.atan2(this.y, this.x)
    }
    public getX(): number {
        return this.x
    }
    public getY(): number {
        return this.y
    }

    public getCordinates(): number[] {
        return [this.x, this.y]
    }

    public toInt(): number[] {
        return [Math.round(this.x), Math.round(this.y)]
    }

    public toFloat(): number[] {
        return [this.x, this.y]
    }

    public toString(): string {
        return "(" + this.x + ", " + this.y + ")"
    }
}