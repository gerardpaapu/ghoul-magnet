import { WIDTH, HEIGHT } from './constants.js'

export function render(state, ctx) {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
}
