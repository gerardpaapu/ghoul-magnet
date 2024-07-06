import {
  WIDTH,
  HEIGHT,
  DASH_METER_COOLDOWN,
  DASH_METER_MAX,
  DASH_DURATION_FRAMES,
  DASH_I_FRAMES,
  DASH_SPEED,
  FEATURE_POWERUPS,
  WALK_SPEED,
} from './constants.js'

export function render(state, ctx) {
  const canDash = state.avatar.dashMeter === DASH_METER_MAX

  const isVulnerable =
    state.avatar.dashing == undefined ||
    state.avatar.dashing.t < DASH_DURATION_FRAMES - DASH_I_FRAMES

  if (isVulnerable) {
    ctx.fillStyle = 'blue'
  } else {
    ctx.fillStyle = 'skyblue'
  }

  let r =
    state.avatar.dashing && DASH_DURATION_FRAMES - state.avatar.dashing.t < 2
      ? 3
      : 1

  ctx.beginPath()
  ctx.arc(state.avatar.x, state.avatar.y, state.avatar.r * r, 0, 2 * Math.PI)
  ctx.fill()

  if (canDash) {
    ctx.strokeStyle = 'skyblue'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  ctx.closePath()
}

export function init(state) {
  // start bigger so that a shrinking powerup makes more sense
  const r = FEATURE_POWERUPS ? 12 : 8
  state.avatar = { x: 0, y: 0, r, dashing: undefined, dashMeter: 100 }
}

export function update(state, input) {
  const avatar = state.avatar

  const dir = { x: 0, y: 0 }
  if (input.LEFT) {
    dir.x--
  }

  if (input.RIGHT) {
    dir.x++
  }

  if (input.UP) {
    dir.y--
  }

  if (input.DOWN) {
    dir.y++
  }

  if (dir.x && dir.y) {
    dir.x = Math.sign(dir.x) * Math.SQRT1_2
    dir.y = Math.sign(dir.y) * Math.SQRT1_2
  }

  const canDashNormal = !avatar.dashing && avatar.dashMeter == DASH_METER_MAX
  const canDashJustFrame =
    avatar.dashing && avatar.dashing.t <= 2 && !avatar.dashing.isDouble
  const canDash = canDashJustFrame || canDashNormal
  if (input.DASH && canDash) {
    avatar.dashMeter = 0
    avatar.dashing = {
      t: DASH_DURATION_FRAMES,
      isDouble: canDashJustFrame,
      dir,
    }
  } else {
    avatar.x += dir.x * WALK_SPEED
    avatar.y += dir.y * WALK_SPEED
  }

  if (avatar.dashing) {
    avatar.x += avatar.dashing.dir.x * DASH_SPEED
    avatar.y += avatar.dashing.dir.y * DASH_SPEED
    if (--avatar.dashing.t <= 0) {
      avatar.dashing = undefined
    }
  } else {
    avatar.dashMeter += DASH_METER_MAX / DASH_METER_COOLDOWN
    avatar.dashMeter = clamp(avatar.dashMeter, 0, DASH_METER_MAX)
  }

  clampToBounds(avatar)
}

function clamp(n, x, y) {
  return Math.max(x, Math.min(n, y))
}

function clampToBounds(avatar) {
  avatar.x = clamp(avatar.x, 0, WIDTH)
  avatar.y = clamp(avatar.y, 0, HEIGHT)
}
