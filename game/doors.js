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

export function update(state) {
  if (state.wealth >= 10 && state.doors.length === 0) {
    addDoors(state)
  }

  for (const door of state.doors) {
    if (collide(state.avatar, door)) {
      state.nextWave = true
    }
  }
}

function addDoors(state) {
  while (state.doors.length < 4) {
    let door = {
      x: Math.floor(Math.random() * WIDTH),
      y: Math.floor(Math.random() * HEIGHT),
      r: 12,
    }
    state.doors.push(door)
  }
}
