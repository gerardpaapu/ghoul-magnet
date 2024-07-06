const CAPTURE = new Set([
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'Space',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
])
export function init() {
  let keystate = { down: {}, up: {} }
  function listen() {
    window.addEventListener('keydown', (evt) => {
      if (!CAPTURE.has(evt.code)) {
        return
      }
      evt.preventDefault()
      keystate.down[evt.code] = true
    })

    window.addEventListener('keyup', (evt) => {
      if (!CAPTURE.has(evt.code)) {
        return
      }

      evt.preventDefault()

      keystate.down[evt.code] = false
      keystate.up[evt.code] = true
    })
  }

  function keys() {
    return {
      UP: keystate.down.ArrowUp || keystate.down.KasdeyW,
      DOWN: keystate.down.ArrowDown || keystate.down.KeyS,
      LEFT: keystate.down.ArrowLeft || keystate.down.KeyA,
      RIGHT: keystate.down.ArrowRight || keystate.down.KeyD,
      DASH: keystate.down.Space,
    }
  }

  return { listen, keys }
}
