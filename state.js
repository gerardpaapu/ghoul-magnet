export function init() {
  const bullets = []
  for (let i = 0; i < 120; i++) {
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

  const avatar = { x: 0, y: 0 }
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

export function update(state, input) {
  for (let i = state.bullets.length - 1; i >= 0; i--) {
    const bullet = state.bullets[i]
    if (
      (bullet.vx < 0 && bullet.x < 0) ||
      (bullet.vx > 0 && bullet.x > 640) ||
      (bullet.vy < 0 && bullet.y < 0) ||
      (bullet.vy > 0 && bullet.y > 384)
    ) {
      console.log({ bullet })
      randomiseBullet(bullet)
      bullet.x = 640 / 2
      bullet.y = 384 / 2
    }

    bullet.x += bullet.vx
    bullet.y += bullet.vy
  }

  if (input.down.ArrowLeft) {
    state.avatar.x -= 5
  }

  if (input.down.ArrowRight) {
    state.avatar.x += 5
  }

  if (input.down.ArrowUp) {
    state.avatar.y -= 5
  }

  if (input.down.ArrowDown) {
    state.avatar.y += 5
  }

  for (let i = state.coins.length - 1; i >= 0; i--) {
    let coin = state.coins[i]
    if (hitByBullet(state.avatar, coin)) {
      state.wealth++
      state.coins.splice(i, 1)
    }
  }

  for (const bullet of state.bullets) {
    if (hitByBullet(state.avatar, bullet)) {
      state.life--
      randomiseBullet(bullet)
    }
  }

  return state
}

function hitByBullet(avatar, bullet) {
  const dx = avatar.x + 8 - bullet.x
  const dy = avatar.y + 8 - bullet.y
  return dx ** 2 + dy ** 2 < 128
}
