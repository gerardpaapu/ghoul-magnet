export function render(state, ctx) {
  ctx.font = '14px sans-serif'
  ctx.fillStyle = 'white'
  ctx.fillText(
    `wave: ${state.wave}, life: ${state.life}, candy: ${state.wealth}, score: ${
      state.score
    }, meter: ${state.avatar.dashMeter.toFixed(0).padStart(3, '0')}%`,
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
