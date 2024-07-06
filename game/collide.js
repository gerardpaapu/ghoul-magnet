export function collide(lhs, rhs) {
  const dx = lhs.x - rhs.x
  const dy = lhs.y - rhs.y
  return dx ** 2 + dy ** 2 < (lhs.r + rhs.r) ** 2
}
