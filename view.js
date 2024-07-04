export function render(state, canvas) {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, 640, 384)

  for (const bullet of state.bullets) {
    const { x, y } = bullet
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, 2 * Math.PI)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.closePath()
  }

  for (const coin of state.coins) {
    const { x, y } = coin
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, 2 * Math.PI)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
  }

  // it's a-me
  ctx.fillStyle = 'blue'
  ctx.beginPath()
  ctx.arc(state.avatar.x, state.avatar.y, 8, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()

  // HUD
  ctx.font = '14px sans-serif'
  ctx.fillStyle = 'white'
  ctx.fillText(`Life: ${state.life}, candy: ${state.wealth}`, 140, 20)

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
