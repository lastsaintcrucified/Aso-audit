import type { KeywordRanking } from "@/types/app-data"

interface VisibilityScoreResult {
  score: number
  breakdown: {
    keywordCount: number
    rankingScore: number
    volumeScore: number
    relevanceScore: number
  }
}

export function calculateVisibilityScore(keywordRankings: KeywordRanking[]): VisibilityScoreResult {
  // 1. Count keywords
  const keywordCount = keywordRankings.length

  // 2. Calculate ranking score
  // Lower ranks (closer to 1) should give higher scores
  const rankingScore =
    keywordRankings.reduce((score, keyword) => {
      // Normalize rank to a score between 0-1 (1 being best)
      const rankScore = Math.max(0, 1 - keyword.rank / 100)
      return score + rankScore
    }, 0) / Math.max(1, keywordRankings.length)

  // 3. Calculate volume score
  const volumeScore =
    keywordRankings.reduce((score, keyword) => {
      switch (keyword.volume) {
        case "High":
          return score + 1
        case "Medium":
          return score + 0.6
        case "Low":
          return score + 0.3
        default:
          return score
      }
    }, 0) / Math.max(1, keywordRankings.length)

  // 4. Calculate relevance score
  const relevanceScore =
    keywordRankings.reduce((score, keyword) => {
      switch (keyword.relevance) {
        case "High":
          return score + 1
        case "Medium":
          return score + 0.6
        case "Low":
          return score + 0.3
        default:
          return score + 0.5 // Default to medium if not specified
      }
    }, 0) / Math.max(1, keywordRankings.length)

  // 5. Calculate final score (weighted average)
  // The weights can be adjusted based on importance
  const finalScore = Math.round(
    (rankingScore * 0.4 + volumeScore * 0.3 + relevanceScore * 0.2 + Math.min(1, keywordCount / 50) * 0.1) * 100,
  )

  return {
    score: finalScore,
    breakdown: {
      keywordCount,
      rankingScore: Math.round(rankingScore * 100),
      volumeScore: Math.round(volumeScore * 100),
      relevanceScore: Math.round(relevanceScore * 100),
    },
  }
}

export function compareVisibilityScores(mainAppScore: number, competitorScores: Record<string, number>) {
  const scores = [mainAppScore, ...Object.values(competitorScores)]
  const maxScore = Math.max(...scores)
  const minScore = Math.min(...scores)

  const normalizedScores: Record<string, number> = {
    mainApp: normalizeScore(mainAppScore, minScore, maxScore),
  }

  Object.entries(competitorScores).forEach(([appId, score]) => {
    normalizedScores[appId] = normalizeScore(score, minScore, maxScore)
  })

  return normalizedScores
}

function normalizeScore(score: number, min: number, max: number): number {
  if (max === min) return 100
  return Math.round(((score - min) / (max - min)) * 100)
}
