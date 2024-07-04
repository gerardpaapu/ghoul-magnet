export function init() {
  let keystate = { down: {}, up: {} }
  function listen() {
    window.addEventListener('keydown', (evt) => {
      keystate.down[evt.code] = true
    })

    window.addEventListener('keyup', (evt) => {
      keystate.down[evt.code] = false
      keystate.up[evt.code] = true
    })
  }

  function keys() {
    return keystate
  }

  return { listen, keys }
}
