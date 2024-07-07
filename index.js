import * as Dom from './dom.js'
import * as State from './state.js'
import * as View from './view.js'
import * as Input from './input.js'
import * as Assets from './assets.js'

async function App(root) {
  let audio = undefined
  let gain = undefined

  function initAudio() {
    if (audio && gain) {
      return
    }

    audio = new AudioContext()
    gain = audio.createGain()
    gain.gain.setValueAtTime(0.4, audio.currentTime)
    gain.connect(audio.destination)
  }

  Dom.init(root)
  let assets = await Assets.load(audio)
  let state = State.init()
  let input = Input.init()

  let animationToken
  let updateToken
  let viewIsDirty

  async function playSound(name) {
    initAudio()

    const asset = assets[name]
    if (asset.sound == undefined) {
      asset.sound = await audio.decodeAudioData(asset.buffer)
    }
    if (audio.state == 'suspended') {
      audio.resume()
    }

    const player = audio.createBufferSource()
    player.buffer = asset.sound
    player.connect(gain)
    player.start(audio.currentTime)
  }

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
      state = State.update(state, { ...input, playSound }) || state
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
