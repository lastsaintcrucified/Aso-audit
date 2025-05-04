"use client"

import { ArrowDown, ArrowUp, Minus } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const keywordData = [
  {
    keyword: "productivity app",
    rank: 12,
    change: 3,
    volume: "High",
    difficulty: "Medium",
  },
  {
    keyword: "task manager",
    rank: 8,
    change: -2,
    volume: "High",
    difficulty: "High",
  },
  {
    keyword: "to-do list",
    rank: 15,
    change: 5,
    volume: "Medium",
    difficulty: "Medium",
  },
  {
    keyword: "project management",
    rank: 24,
    change: 0,
    volume: "High",
    difficulty: "High",
  },
  {
    keyword: "time tracking",
    rank: 18,
    change: 2,
    volume: "Medium",
    difficulty: "Low",
  },
  {
    keyword: "work organization",
    rank: 32,
    change: -4,
    volume: "Low",
    difficulty: "Low",
  },
  {
    keyword: "team collaboration",
    rank: 45,
    change: 7,
    volume: "Medium",
    difficulty: "Medium",
  },
]

export function KeywordRankingsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Keyword</TableHead>
            <TableHead className="w-[100px] text-right">Rank</TableHead>
            <TableHead className="w-[100px] text-right">Change</TableHead>
            <TableHead className="w-[100px] text-right">Volume</TableHead>
            <TableHead className="w-[100px] text-right">Difficulty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keywordData.map((keyword) => (
            <TableRow key={keyword.keyword}>
              <TableCell className="font-medium">{keyword.keyword}</TableCell>
              <TableCell className="text-right">{keyword.rank}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  {keyword.change > 0 ? (
                    <>
                      <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500">{keyword.change}</span>
                    </>
                  ) : keyword.change < 0 ? (
                    <>
                      <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                      <span className="text-red-500">{Math.abs(keyword.change)}</span>
                    </>
                  ) : (
                    <>
                      <Minus className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">0</span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={
                    keyword.volume === "High" ? "default" : keyword.volume === "Medium" ? "outline" : "secondary"
                  }
                >
                  {keyword.volume}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={
                    keyword.difficulty === "High"
                      ? "destructive"
                      : keyword.difficulty === "Medium"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {keyword.difficulty}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
