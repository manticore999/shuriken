import { line } from './line.js'
import { pressedKeys } from './input.js'

export function move(){
    const lineSpeed = line.set()
    const vec = { x: 0, y: 0 }

    if (pressedKeys.right) vec.x -= 1
    if (pressedKeys.left) vec.x += 1
    if (pressedKeys.down) vec.y -= 1
    if (pressedKeys.up) vec.y += 1
    
    const m = Math.sqrt((vec.x * vec.x) + (vec.y * vec.y))

    if (m !== 0) {
        vec.x /= m
        vec.y /= m
    }
    console.log(this.x, lineSpeed.move * vec.x)
    this.x += lineSpeed.move * vec.x
    this.y += lineSpeed.move * vec.y
}