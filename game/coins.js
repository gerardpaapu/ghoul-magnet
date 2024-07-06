import { WIDTH, HEIGHT, COIN_COUNT } from './constants.js'
import { collide } from './collide.js'

export function render(state, ctx) {
  for (const coin of state.coins) {
    const { x, y, r } = coin
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
}

export function init(state) {
  state.coins = []
}

export function initWave(state) {
  while (state.coins.length < COIN_COUNT) {
    const coin = { r: 8 }
    randomiseCoin(coin)
    state.coins.push(coin)
  }
}

function randomiseCoin(coin) {
  coin.x = Math.floor(Math.random() * WIDTH)
  coin.y = Math.floor(Math.random() * HEIGHT)
}

export function update(state) {
  // iterating backwards so that splice is safe
  // otherwise removing items while iterating
  // invalidates indexes
  for (let i = state.coins.length - 1; i >= 0; i--) {
    let coin = state.coins[i]
    if (collide(state.avatar, coin)) {
      state.wealth++
      state.coins.splice(i, 1)
    }
  }
}
