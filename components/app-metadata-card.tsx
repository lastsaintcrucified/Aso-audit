"use client"

import { Badge } from "@/components/ui/badge"

export function AppMetadataCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">A</span>
        </div>
        <div>
          <h3 className="font-semibold">My Productivity App</h3>
          <p className="text-sm text-muted-foreground">Task management & organization</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium mb-1">App Store Category</p>
          <div className="flex gap-2">
            <Badge variant="outline">Productivity</Badge>
            <Badge variant="outline">Business</Badge>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Current Version</p>
          <p className="text-sm">2.4.1 (Updated 2 weeks ago)</p>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Ratings</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">4.7</span>
            <div className="flex">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className={i < 4 ? "text-yellow-500" : "text-muted"}>
                  {star}
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">(1,204 reviews)</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Description Preview</p>
          <p className="text-xs text-muted-foreground line-clamp-3">
            Boost your productivity with our intuitive task management app. Organize projects, track time, collaborate
            with your team, and achieve your goals faster. Features include customizable to-do lists, reminders, project
            boards, and detailed analytics.
          </p>
        </div>
      </div>
    </div>
  )
}
