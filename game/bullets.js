import {
  WIDTH,
  HEIGHT,
  BULLET_SPEED,
  BULLET_M,
  DASH_I_FRAMES,
  DASH_DURATION_FRAMES,
} from './constants.js'
import { collide } from './collide.js'

export function update(state, ctx) {
  if (state.wave % 2 === 0) {
    state.source.x = WIDTH * (0.5 + Math.sin(state.frame * 0.008) * 0.4)
    state.source.y = HEIGHT * (0.5 + Math.sin(state.frame * 0.016) * 0.4)
  } else {
    state.source.x = WIDTH * (0.5 + Math.sin(state.frame * 0.02) * 0.2)
    state.source.y = HEIGHT * (0.5 + Math.cos(state.frame * 0.02) * 0.3)
  }

  for (const bullet of state.bullets) {
    // if the bullet is heading out of bounds
    if (
      (bullet.vx < 0 && bullet.x < 0) ||
      (bullet.vx > 0 && bullet.x > WIDTH) ||
      (bullet.vy < 0 && bullet.y < 0) ||
      (bullet.vy > 0 && bullet.y > HEIGHT)
    ) {
      randomiseBullet(bullet)
      bullet.x = state.source.x
      bullet.y = state.source.y
    }

    const { x, y } = bullet
    bullet.tail = bullet.tail || []
    bullet.tail.push({ x, y })

    while (bullet.tail.length > 12) {
      bullet.tail.shift()
    }

    bullet.x += bullet.vx
    bullet.y += bullet.vy
  }

  let hitByBullet = false

  for (const bullet of state.bullets) {
    if (collide(state.avatar, bullet)) {
      hitByBullet = true
      randomiseBullet(bullet)
      bullet.x = state.source.x
      bullet.y = state.source.y
      // you shouldn't be able to take more than one
      // damage per frame I think...
      break
    }
  }

  const isVulnerable =
    state.avatar.dashing == undefined ||
    state.avatar.dashing.t < DASH_DURATION_FRAMES - DASH_I_FRAMES

  if (hitByBullet && isVulnerable) {
    ctx.playSound('hit_hurt')
    state.life--
  }
}

export function render(state, ctx) {
  for (const bullet of state.bullets) {
    for (const [i, { x, y }] of bullet.tail.entries()) {
      // if (Math.floor(i + state.frame * 0.5) % 6 !== 0) {
      //   continue
      // }
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      const mix = Math.min(100, Math.floor(i * 10))
      ctx.fillStyle = `color-mix(in lch, red ${mix}%, orange)`
      ctx.strokeStyle = 'yellow'
      ctx.fill()
      ctx.closePath()
    }
  }

  for (const bullet of state.bullets) {
    const { x, y, r } = bullet
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.closePath()
  }

  if (state.source) {
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(state.source.x, state.source.y, 9, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}

export function init(state) {
  state.bullets = []
  state.source = { x: 0, y: 0 }
}

export function initWave(state) {
  let bulletCount = Math.log(state.wave + 1) * BULLET_M

  while (state.bullets.length < bulletCount) {
    const bullet = { r: 8, tail: [] }
    state.bullets.push(bullet)
  }

  for (const bullet of state.bullets) {
    randomiseBullet(bullet)
  }
}

function randomiseBullet(bullet) {
  const theta = Math.random() * 2 * Math.PI
  // spawn them to the center
  bullet.x = WIDTH / 2
  bullet.y = HEIGHT / 2

  bullet.vx = Math.cos(theta) * BULLET_SPEED
  bullet.vy = Math.sin(theta) * BULLET_SPEED
}
