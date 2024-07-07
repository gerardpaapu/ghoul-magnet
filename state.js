import { WIDTH, HEIGHT } from './game/constants.js'
import * as Bullets from './game/bullets.js'
import * as Coins from './game/coins.js'
import * as Doors from './game/doors.js'
import * as Avatar from './game/avatar.js'
import * as Powerups from './game/powerups.js'

export function init() {
  let state = {
    life: 10,
    wealth: 0,
    wave: 1,
    score: 0,
    frame: 1,
  }

  Avatar.init(state)
  Bullets.init(state)
  Coins.init(state)
  Doors.init(state)
  Powerups.init(state)

  initWave(state)
  return state
}

function nextWave(state) {
  // cash in your coins for points
  state.score += state.wealth * state.wave
  state.wave++
  state.wealth = 0
  initWave(state)
}

function initWave(state) {
  Bullets.initWave(state)
  Coins.initWave(state)
  Doors.initWave(state)
  Powerups.initWave(state)
}

export function update(state, ctx) {
  if (state.life <= 0 || state.wealth >= 20) {
    return state
  }

  if (state.nextWave) {
    nextWave(state)
    state.nextWave = false
  }

  state.frame++

  Bullets.update(state, ctx)
  Avatar.update(state, ctx)
  Coins.update(state, ctx)
  Doors.update(state, ctx)
  Powerups.update(state, ctx)

  return state
}
