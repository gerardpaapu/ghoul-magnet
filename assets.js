export async function load(audio) {
  const [hit_hurt, jump, pickup_coin] = await Promise.all([
    loadWav('./assets/Hit_Hurt.wav'),
    loadWav('./assets/Jump.wav'),
    loadWav('./assets/Pickup_Coin.wav'),
  ])

  return {
    hit_hurt,
    jump,
    pickup_coin,
  }

  async function loadWav(url) {
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    return { buffer }
  }
}
