const COIN_COUNT = 15
const BULLET_SPEED = 1.2
const BULLET_M = 60

const WIDTH = 640
const HEIGHT = 384

export function init() {
  const avatar = { x: 0, y: 0, r: 8 }
  let state = {
    bullets: [],
    coins: [],
    doors: [],

    avatar,
    life: 10,
    wealth: 0,
    wave: 1,
    score: 0,
    frame: 1,
  }

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
  let bulletCount = Math.log(state.wave + 1) * BULLET_M

  while (state.bullets.length < bulletCount) {
    const bullet = { r: 8, tail: [] }
    state.bullets.push(bullet)
  }

  for (const bullet of state.bullets) {
    randomiseBullet(bullet)
  }

  while (state.coins.length < COIN_COUNT) {
    const coin = { r: 8 }
    randomiseCoin(coin)
    state.coins.push(coin)
  }

  while (state.doors.length) {
    state.doors.splice(0, 1)
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

function randomiseCoin(coin) {
  coin.x = Math.floor(Math.random() * WIDTH)
  coin.y = Math.floor(Math.random() * HEIGHT)
}

function randomiseBullet(bullet) {
  const theta = Math.random() * 2 * Math.PI
  // spawn them to the center
  bullet.x = WIDTH / 2
  bullet.y = HEIGHT / 2

  bullet.vx = Math.cos(theta) * BULLET_SPEED
  bullet.vy = Math.sin(theta) * BULLET_SPEED
}

function clamp(n, x, y) {
  return Math.max(x, Math.min(n, y))
}

export function update(state, input) {
  if (state.life <= 0 || state.wealth >= 20) {
    return state
  }

  state.frame++
  const source = {
    x: WIDTH * 0.5 + Math.sin(state.frame * 0.02) * 100,
    y: HEIGHT * 0.5 + Math.cos(state.frame * 0.02) * 100,
  }
  state.source = source

  console.log(source)

  if (state.wealth >= 10 && state.doors.length === 0) {
    addDoors(state)
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
      bullet.x = source.x
      bullet.y = source.y
    }

    if (state.frame % 3 === 0) {
      const { x, y } = bullet
      bullet.tail = bullet.tail || []
      bullet.tail.push({ x, y })

      while (bullet.tail.length > 4) {
        bullet.tail.shift()
      }
    }

    bullet.x += bullet.vx
    bullet.y += bullet.vy
  }

  const avatar = state.avatar
  const SPEED = 2
  if (input.down.ArrowLeft) {
    avatar.x -= SPEED
  }

  if (input.down.ArrowRight) {
    avatar.x += SPEED
  }

  if (input.down.ArrowUp) {
    avatar.y -= SPEED
  }

  if (input.down.ArrowDown) {
    avatar.y += SPEED
  }

  avatar.x = clamp(avatar.x, 0, WIDTH)
  avatar.y = clamp(avatar.y, 0, HEIGHT)
  avatar.x = Math.floor(avatar.x)
  avatar.y = Math.floor(avatar.y)

  // iterating backwards so that splice is safe
  // otherwise removing items while iterating
  // invalidates indexes
  for (let i = state.coins.length - 1; i >= 0; i--) {
    let coin = state.coins[i]
    if (collide(avatar, coin)) {
      state.wealth++
      state.coins.splice(i, 1)
    }
  }

  for (const bullet of state.bullets) {
    if (collide(avatar, bullet)) {
      state.life--
      randomiseBullet(bullet)
      // you shouldn't be able to take more than one
      // damage per frame I think...
      break
    }
  }

  for (const door of state.doors) {
    if (collide(avatar, door)) {
      nextWave(state)
    }
  }

  return state
}

function collide(lhs, rhs) {
  const dx = lhs.x - rhs.x
  const dy = lhs.y - rhs.y
  return dx ** 2 + dy ** 2 < (lhs.r + rhs.r) ** 2
}
