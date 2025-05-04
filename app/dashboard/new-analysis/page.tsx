"use client"

import { useState } from "react"
import { ArrowRight, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewAnalysisPage() {
  const [competitors, setCompetitors] = useState<string[]>([""])

  const addCompetitor = () => {
    if (competitors.length < 3) {
      setCompetitors([...competitors, ""])
    }
  }

  const removeCompetitor = (index: number) => {
    const newCompetitors = [...competitors]
    newCompetitors.splice(index, 1)
    setCompetitors(newCompetitors)
  }

  const updateCompetitor = (index: number, value: string) => {
    const newCompetitors = [...competitors]
    newCompetitors[index] = value
    setCompetitors(newCompetitors)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Analysis</h1>
        <p className="text-muted-foreground">Create a new app analysis and competitor comparison</p>
      </div>

      <Tabs defaultValue="app-store" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="app-store">App Store (iOS)</TabsTrigger>
          <TabsTrigger value="play-store">Play Store (Android)</TabsTrigger>
        </TabsList>
        <TabsContent value="app-store">
          <Card>
            <CardHeader>
              <CardTitle>App Details</CardTitle>
              <CardDescription>Enter your iOS app details for analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="app-url">App Store URL</Label>
                <Input id="app-url" placeholder="https://apps.apple.com/us/app/your-app-id" />
                <p className="text-sm text-muted-foreground">Enter the full URL to your app on the App Store</p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Competitors</h3>
                    <p className="text-sm text-muted-foreground">Add up to 3 competitor apps for comparison</p>
                  </div>
                  {competitors.length < 3 && (
                    <Button variant="outline" size="sm" onClick={addCompetitor} className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Competitor
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {competitors.map((competitor, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Competitor ${index + 1} App Store URL`}
                        value={competitor}
                        onChange={(e) => updateCompetitor(index, e.target.value)}
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeCompetitor(index)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove competitor</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Analysis Options</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select which aspects of your app you want to analyze
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Metadata Analysis</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metadata" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                      <label
                        htmlFor="metadata"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        App name, subtitle, description
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Keyword Analysis</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="keywords" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                      <label
                        htmlFor="keywords"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Keyword rankings and opportunities
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ratings & Reviews</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="reviews" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                      <label
                        htmlFor="reviews"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Analyze ratings and review sentiment
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Visual Assets</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="visuals" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                      <label
                        htmlFor="visuals"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Screenshots and app icon analysis
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Report Type</h3>
                  <p className="text-sm text-muted-foreground mb-4">Choose how you want to receive your analysis</p>
                </div>

                <RadioGroup defaultValue="dashboard">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dashboard" id="dashboard" />
                    <Label htmlFor="dashboard">Dashboard only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <Label htmlFor="pdf">Dashboard + PDF report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="share" id="share" />
                    <Label htmlFor="share">Dashboard + Shareable link</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="gap-1">
                Start Analysis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="play-store">
          <Card>
            <CardHeader>
              <CardTitle>App Details</CardTitle>
              <CardDescription>Enter your Android app details for analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="play-app-url">Play Store URL</Label>
                <Input id="play-app-url" placeholder="https://play.google.com/store/apps/details?id=your.app.id" />
                <p className="text-sm text-muted-foreground">Enter the full URL to your app on the Google Play Store</p>
              </div>

              {/* The rest of the form is identical to the App Store tab */}
              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Competitors</h3>
                    <p className="text-sm text-muted-foreground">Add up to 3 competitor apps for comparison</p>
                  </div>
                  {competitors.length < 3 && (
                    <Button variant="outline" size="sm" onClick={addCompetitor} className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Competitor
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {competitors.map((competitor, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Competitor ${index + 1} Play Store URL`}
                        value={competitor}
                        onChange={(e) => updateCompetitor(index, e.target.value)}
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeCompetitor(index)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove competitor</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analysis options and report type sections are identical */}
              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Analysis Options</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select which aspects of your app you want to analyze
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Metadata Analysis</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="play-metadata"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <label
                        htmlFor="play-metadata"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        App name, subtitle, description
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Keyword Analysis</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="play-keywords"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <label
                        htmlFor="play-keywords"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Keyword rankings and opportunities
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ratings & Reviews</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="play-reviews"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <label
                        htmlFor="play-reviews"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Analyze ratings and review sentiment
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Visual Assets</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="play-visuals"
                        className="h-4 w-4 rounded border-gray-300"
                        defaultChecked
                      />
                      <label
                        htmlFor="play-visuals"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Screenshots and app icon analysis
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Report Type</h3>
                  <p className="text-sm text-muted-foreground mb-4">Choose how you want to receive your analysis</p>
                </div>

                <RadioGroup defaultValue="dashboard">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dashboard" id="play-dashboard" />
                    <Label htmlFor="play-dashboard">Dashboard only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="play-pdf" />
                    <Label htmlFor="play-pdf">Dashboard + PDF report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="share" id="play-share" />
                    <Label htmlFor="play-share">Dashboard + Shareable link</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="gap-1">
                Start Analysis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
