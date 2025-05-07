"use client"

import { useState } from "react"
import { Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: string
  userName: string
  rating: number
  title?: string
  text: string
  date: string
  version?: string
}

interface AppReviewsListProps {
  reviews: Review[]
}

export function AppReviewsList({ reviews = [] }: AppReviewsListProps) {
  const [filter, setFilter] = useState<string>("all")

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true
    if (filter === "positive") return review.rating >= 4
    if (filter === "negative") return review.rating <= 2
    if (filter === "neutral") return review.rating === 3
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Reviews</h3>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter reviews" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="positive">Positive (4-5 ★)</SelectItem>
            <SelectItem value="neutral">Neutral (3 ★)</SelectItem>
            <SelectItem value="negative">Negative (1-2 ★)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredReviews.length > 0 ? (
        <div className="space-y-3">
          {filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{review.userName}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                      {review.version && ` • Version ${review.version}`}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {review.title && <div className="font-medium mb-1">{review.title}</div>}
                <p className="text-sm">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">No reviews found</p>
        </div>
      )}
    </div>
  )
}
