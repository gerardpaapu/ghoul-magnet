export function init() {
  let keystate = { down: {}, up: {} }
  function listen() {
    window.addEventListener('keydown', (evt) => {
      console.log(evt.code)
      keystate.down[evt.code] = true
    })

    window.addEventListener('keyup', (evt) => {
      keystate.down[evt.code] = false
      keystate.up[evt.code] = true
    })
  }

  function keys() {
    return {
      UP: keystate.down.ArrowUp || keystate.down.KeyW,
      DOWN: keystate.down.ArrowDown || keystate.down.KeyS,
      LEFT: keystate.down.ArrowLeft || keystate.down.KeyA,
      RIGHT: keystate.down.ArrowRight || keystate.down.KeyD,
      DASH: keystate.down.Space,
    }
  }

  return { listen, keys }
}
