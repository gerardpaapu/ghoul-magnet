import { WIDTH, HEIGHT } from './constants.js'
import { collide } from './collide.js'

export function render(state, ctx) {
  for (const door of state.doors) {
    const { x, y, r } = door
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = 'green'
    ctx.fill()
    ctx.closePath()
  }
}

export function init(state) {
  state.doors = []
}

export function initWave(state) {
  while (state.doors.length) {
    state.doors.splice(0, 1)
  }
}

export function update(state, ctx) {
  if (state.wealth >= 10 && state.doors.length === 0) {
    addDoors(state)
  }

  for (const door of state.doors) {
    if (collide(state.avatar, door)) {
      ctx.playSound('jump')
      state.nextWave = true
    }
  }
}

function addDoors(state) {
  while (state.doors.length < 4) {
    let theta = Math.random() * 2 * Math.PI
    let d = HEIGHT * (Math.random() * 0.2 + 0.3)
    const x = WIDTH * 0.5 + Math.sin(theta) * d
    const y = HEIGHT * 0.5 + Math.cos(theta) * d

    let door = {
      x,
      y,
      r: 12,
    }
    state.doors.push(door)
  }
}
