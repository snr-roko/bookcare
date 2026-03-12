export const derivePrice = (coverId?: number, publishYear?: number) => {
    const currentYear = new Date().getFullYear()
    const year = publishYear ?? 2000
    
    const variation = coverId && (coverId !== -1) ? (coverId % 20) : 10

    const bookAge = currentYear - year

    let base: number

    if (bookAge <= 2) base = 90
    else if (bookAge <= 5) base = 70
    else if (bookAge <= 10) base = 60
    else if (bookAge <= 20) base = 50
    else base = 40

    return base + variation
}

export const deriveRating = (workKey: string, editionCount: number): number => {
  const hash = workKey
    .split('')
    .reduce<number>((acc, char) => acc + char.charCodeAt(0), 0)

  const editionBoost = Math.min(editionCount, 100) / 100

  const hashComponent = (hash % 10) / 10

  const rating = 3.0 + editionBoost + hashComponent * 0.9

  return parseFloat(Math.min(rating, 4.9).toFixed(1))
}