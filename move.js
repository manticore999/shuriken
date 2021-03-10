export function move(pressedKeys){
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
    return { x: vec.x, y: vec.y, keyZ: pressedKeys.z, keyX: pressedKeys.x, shift: pressedKeys.shift}
}