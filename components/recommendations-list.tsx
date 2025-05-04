"use client"

import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recommendations = [
  {
    id: 1,
    title: "Add 'productivity' keyword to your app subtitle",
    description: "This keyword has high search volume and your competitors are ranking for it.",
    impact: "High",
    category: "Metadata",
  },
  {
    id: 2,
    title: "Update screenshots to highlight new features",
    description: "Your screenshots are outdated and don't showcase your latest features.",
    impact: "Medium",
    category: "Visual Assets",
  },
  {
    id: 3,
    title: "Respond to recent negative reviews",
    description: "You have 5 recent negative reviews without responses. Addressing them can improve your rating.",
    impact: "High",
    category: "Reviews",
  },
  {
    id: 4,
    title: "Add localization for Spanish market",
    description: "There's significant search volume in Spanish-speaking countries for your app category.",
    impact: "Medium",
    category: "Localization",
  },
  {
    id: 5,
    title: "Optimize your app description with more keywords",
    description: "Your app description is missing several relevant keywords that could improve visibility.",
    impact: "Medium",
    category: "Metadata",
  },
]

export function RecommendationsList() {
  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base">{recommendation.title}</CardTitle>
                <CardDescription>{recommendation.description}</CardDescription>
              </div>
              <Badge variant={recommendation.impact === "High" ? "destructive" : "outline"}>
                {recommendation.impact} Impact
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="pt-2 flex justify-between items-center">
            <Badge variant="secondary">{recommendation.category}</Badge>
            <Button variant="ghost" size="sm" className="gap-1">
              <span>Implement</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
