export function init() {
  const bullets = []
  for (let i = 0; i < 35; i++) {
    const bullet = {}
    randomiseBullet(bullet)
    bullets.push(bullet)
  }

  const coins = []
  for (let i = 0; i < 30; i++) {
    const coin = {}
    randomiseCoin(coin)
    coins.push(coin)
  }

  const avatar = { x: 0, y: 0, vx: 0, vy: 0 }
  const life = 20
  const wealth = 0

  return {
    bullets,
    coins,
    avatar,
    life,
    wealth,
  }
}

function randomiseCoin(coin) {
  coin.x = Math.floor(Math.random() * 640)
  coin.y = Math.floor(Math.random() * 384)
}

function randomiseBullet(bullet) {
  const theta = Math.random() * 2 * Math.PI
  bullet.x = Math.floor(Math.random() * 640)
  bullet.y = Math.floor(Math.random() * 384)
  bullet.vx = Math.cos(theta)
  bullet.vy = Math.sin(theta)
}

function clamp(n, x, y) {
  return Math.max(x, Math.min(n, y))
}

export function update(state, input) {
  if (state.life <= 0 || state.wealth >= 20) {
    return state
  }

  for (const bullet of state.bullets) {
    // if the bullet is heading out of bounds
    if (
      (bullet.vx < 0 && bullet.x < 0) ||
      (bullet.vx > 0 && bullet.x > 640) ||
      (bullet.vy < 0 && bullet.y < 0) ||
      (bullet.vy > 0 && bullet.y > 384)
    ) {
      randomiseBullet(bullet)
      // spawn them to the center
      bullet.x = 640 / 2
      bullet.y = 384 / 2
    }

    bullet.x += bullet.vx
    bullet.y += bullet.vy
  }

  const avatar = state.avatar
  const SPEED = 2
  // I'm not really into these controls TBH
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

  // if ((avatar.vy > 0 && avatar.y >= 368) || (avatar.vy < 0 && avatar.y <= 0)) {
  //   avatar.vy = 0
  // }

  // if (
  //   (avatar.vx > 0 && avatar.x >= 640 - 16) ||
  //   (avatar.vx < 0 && avatar.x <= 0)
  // ) {
  //   avatar.vx = 0
  // }

  // avatar.vx = clamp(avatar.vx, -20, 20)
  // avatar.vy = clamp(avatar.vy, -20, 20)

  // avatar.x += avatar.vx * 0.35
  // avatar.y += avatar.vy * 0.35
  avatar.x = clamp(avatar.x, 0, 640)
  avatar.y = clamp(avatar.y, 0, 384)
  avatar.x = Math.floor(avatar.x)
  avatar.y = Math.floor(avatar.y)

  for (let i = state.coins.length - 1; i >= 0; i--) {
    let coin = state.coins[i]
    if (hitByBullet(avatar, coin)) {
      state.wealth++
      state.coins.splice(i, 1)
    }
  }

  for (const bullet of state.bullets) {
    if (hitByBullet(avatar, bullet)) {
      state.life--
      randomiseBullet(bullet)
    }
  }

  return state
}

function hitByBullet(avatar, bullet) {
  const dx = avatar.x - bullet.x
  const dy = avatar.y - bullet.y
  return dx ** 2 + dy ** 2 < 128
}
