import * as Dom from './dom.js'
import * as State from './state.js'
import * as View from './view.js'
import * as Input from './input.js'

function App(root) {
  Dom.init(root)
  let state = State.init()
  let input = Input.init()

  let animationToken
  let updateToken
  let viewIsDirty

  function startRendering() {
    animationToken = requestAnimationFrame(() => {
      if (viewIsDirty) {
        View.render(state, Dom.getCanvas())
        viewIsDirty = false
      }
      startRendering()
    })
  }

  function stopRendering() {
    if (animationToken) {
      cancelAnimationFrame(animationToken)
    }
  }

  function startUpdating() {
    updateToken = setInterval(() => {
      state = State.update(state, input.keys()) || state
      viewIsDirty = true
    }, 1000 / 60)
  }

  function stopUpdating() {
    if (updateToken) {
      clearInterval(updateToken)
    }
  }

  function stop() {
    stopRendering()
    stopUpdating()
  }

  function start() {
    input.listen()
    startRendering()
    startUpdating()
  }

  return {
    start,
    stop,
  }
}

export default App
