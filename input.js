export function init() {
  let keystate = { down: {}, up: {} }
  function listen() {
    window.addEventListener('keydown', (evt) => {
      keystate.down[evt.code] = true
    })

    window.addEventListener('keyup', (evt) => {
      keystate.up[evt.code] = true
    })
  }

  function keys() {
    let temp = keystate
    keystate = { down: {}, up: {} }
    return temp
  }

  return { listen, keys }
}
