import * as Bullets from './game/bullets.js'
import * as Coins from './game/coins.js'
import * as Doors from './game/doors.js'
import * as Hud from './game/hud.js'
import * as Avatar from './game/avatar.js'
import * as Background from './game/bg.js'
import * as Powerups from './game/powerups.js'

export function render(state, canvas) {
  const ctx = canvas.getContext('2d')

  Background.render(state, ctx)
  Bullets.render(state, ctx)
  Coins.render(state, ctx)
  Doors.render(state, ctx)
  Powerups.render(state, ctx)
  Avatar.render(state, ctx)
  Hud.render(state, ctx)
}
