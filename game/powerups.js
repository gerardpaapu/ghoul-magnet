import { WIDTH, HEIGHT, FEATURE_POWERUPS } from './constants.js'
import { collide } from './collide.js'

export function render(state, ctx) {
  for (const powerup of state.powerups) {
    const { x, y, r } = powerup
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = 'pink'
    ctx.strokeStyle = 'purple'
    ctx.lineWidth = 1

    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
}

export function init(state) {
  state.powerups = []
}

export function initWave(state) {
  if (FEATURE_POWERUPS) {
    const coin = { r: 8 }
    randomise(coin)
    state.powerups.push(coin)
  }
}

function randomise(coin) {
  coin.x = Math.floor(Math.random() * WIDTH)
  coin.y = Math.floor(Math.random() * HEIGHT)
}

export function update(state) {
  // iterating backwards so that splice is safe
  // otherwise removing items while iterating
  // invalidates indexes
  for (let i = state.powerups.length - 1; i >= 0; i--) {
    let powerup = state.powerups[i]
    if (collide(state.avatar, powerup)) {
      state.avatar.r--
      state.powerups.splice(i, 1)
    }
  }
}
