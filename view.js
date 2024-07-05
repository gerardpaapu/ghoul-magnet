export function render(state, canvas) {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, 640, 384)

  for (const bullet of state.bullets) {
    for (const [i, { x, y }] of bullet.tail.entries()) {
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      const mix = Math.min(100, Math.floor(i * 30))
      ctx.fillStyle = `color-mix(in lch, red ${mix}%, orange)`
      ctx.strokeStyle = 'yellow'
      ctx.fill()
      // ctx.stroke()
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

  for (const coin of state.coins) {
    const { x, y, r } = coin
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'white'
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }

  for (const door of state.doors) {
    const { x, y, r } = door
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = 'green'
    ctx.fill()
    ctx.closePath()
  }

  // it's a-me
  ctx.fillStyle = 'blue'
  ctx.beginPath()
  ctx.arc(state.avatar.x, state.avatar.y, state.avatar.r, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()

  if (state.source) {
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(state.source.x, state.source.y, 9, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }

  // HUD
  ctx.font = '14px sans-serif'
  ctx.fillStyle = 'white'
  ctx.fillText(
    `wave: ${state.wave}, life: ${state.life}, candy: ${state.wealth}, score: ${state.score}`,
    140,
    20
  )

  if (state.wealth >= 20) {
    ctx.font = '64px sans-serif'
    ctx.fillStyle = 'white'
    ctx.fillText(`You win!`, 100, 200)
  } else if (state.life <= 0) {
    ctx.font = '64px sans-serif'
    ctx.fillStyle = 'white'
    ctx.fillText(`You lose!`, 100, 200)
  }
}
