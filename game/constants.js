export const WIDTH = 640
export const HEIGHT = 384
export const WALK_SPEED = 2
export const BULLET_SPEED = 1.4
export const BULLET_M = 60
export const COIN_COUNT = 15
export const DASH_METER_MAX = 100
export const DASH_METER_COOLDOWN = 200
export const DASH_SPEED = 10
export const DASH_I_FRAMES = 8
export const DASH_DURATION_FRAMES = 10

// feature flags
export const FEATURE_POWERUPS =
  localStorage.getItem('FEATURE_POWERUPS') === 'true' || false
