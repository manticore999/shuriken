export const pressedKeys = {
    up: false,
    left: false,
    right: false,
    down: false,
    z: false,
    x: false,
    shift: false,
  
    down_handler (key = '') {
      this[key.replace('Arrow', '').toLowerCase()] = true
      this[key.replace("w","up").toLowerCase()] = true
      this[key.replace("a","left").toLowerCase()] = true
      this[key.replace("s","down").toLowerCase()] = true
      this[key.replace("d","right").toLowerCase()] = true
      this[key.replace("j","z").toLowerCase()] = true
      this[key.replace("k","x").toLowerCase()] = true
      this[key.replace('shift').toLowerCase()] = true
    },
    up_handler (key = '') {
      this[key.replace('Arrow', '').toLowerCase()] = false
      this[key.replace("w","up").toLowerCase()] = false
      this[key.replace("a","left").toLowerCase()] = false
      this[key.replace("s","down").toLowerCase()] = false
      this[key.replace("d","right").toLowerCase()] = false
      this[key.replace("j","z").toLowerCase()] = false
      this[key.replace("k","x").toLowerCase()] = false
      this[key.replace('shift').toLowerCase()] = false
    }
  }
  
  document.addEventListener('keydown', (e) => pressedKeys.down_handler(e.key), false)
  document.addEventListener('keyup', (e) => pressedKeys.up_handler(e.key), false)
  