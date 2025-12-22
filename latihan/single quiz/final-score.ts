function getFinalScore(score: number, bonus: number, penalty: number): number | string {
  let finalScore = 0
  finalScore = score + bonus - penalty
  if (score < 0 || bonus < 0 || penalty < 0) {
    return "invalid input"
  } else if (finalScore < 0) {
    return 0
  } else if (finalScore > 100) {
    return 100
  }
  return finalScore
}

const ipalScore = getFinalScore(100, 20, 130)
console.log(ipalScore)