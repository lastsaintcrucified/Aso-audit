"use client"

import { ArrowDown, ArrowUp, Minus, Search } from "lucide-react"
import { useState } from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { KeywordRanking } from "@/types/app-data"

interface KeywordRankingsTableProps {
  keywords: KeywordRanking[]
}

export function KeywordRankingsTable({ keywords = [] }: KeywordRankingsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter keywords based on search term
  const filteredKeywords = keywords.filter((keyword) =>
    keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort keywords by rank
  const sortedKeywords = [...filteredKeywords].sort((a, b) => a.rank - b.rank)

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search keywords..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Keyword</TableHead>
              <TableHead className="w-[100px] text-right">Rank</TableHead>
              <TableHead className="w-[100px] text-right">Change</TableHead>
              <TableHead className="w-[100px] text-right">Volume</TableHead>
              <TableHead className="w-[100px] text-right">Difficulty</TableHead>
              <TableHead className="w-[100px] text-right">Relevance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedKeywords.length > 0 ? (
              sortedKeywords.map((keyword) => (
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
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        keyword.relevance === "High"
                          ? "default"
                          : keyword.relevance === "Medium"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {keyword.relevance}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {searchTerm ? "No matching keywords found" : "No keywords found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
