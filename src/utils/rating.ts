export const getRatingStats = (reviews: { rating: number }[]) => {
    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    let total = 0
  
    for (const { rating } of reviews) {
      distribution[rating] = (distribution[rating] || 0) + 1
      total += rating
    }
  
    const count = reviews.length
    const average = count ? (total / count).toFixed(1) : '0.0'
  
    return { average, distribution, total: count }
  }