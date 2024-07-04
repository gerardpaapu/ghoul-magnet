export function init(root) {
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 384
  canvas.id = 'GameCanvas'
  canvas.classList.add('game-canvas')
  root.appendChild(canvas)
}

export function getCanvas() {
  return document.getElementById('GameCanvas')
}
