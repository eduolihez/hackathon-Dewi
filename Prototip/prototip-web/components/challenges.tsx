"use client"

import { useState } from "react"
import { CheckCircle2, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dades simulades de reptes
const challengesData = [
  {
    id: 1,
    title: "Reduir consum setmanal",
    description: "Redueix el teu consum un 5% aquesta setmana",
    type: "daily",
    progress: 65,
    points: 50,
    daysLeft: 3,
  },
  {
    id: 2,
    title: "Instal·lar airejador",
    description: "Instal·la un airejador a l'aixeta principal",
    type: "action",
    progress: 0,
    points: 100,
    daysLeft: 14,
  },
  {
    id: 3,
    title: "Mòdul educatiu",
    description: "Completa el mòdul sobre el cicle de l'aigua",
    type: "education",
    progress: 30,
    points: 75,
    daysLeft: 7,
  },
  {
    id: 4,
    title: "Repte comunitari",
    description: "Participa a la campanya d'estalvi comunitari",
    type: "community",
    progress: 50,
    points: 150,
    daysLeft: 21,
  },
]

export function Challenges() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredChallenges =
    activeFilter === "all" ? challengesData : challengesData.filter((challenge) => challenge.type === activeFilter)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("all")}
        >
          Tots
        </Button>
        <Button
          variant={activeFilter === "daily" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("daily")}
        >
          Diaris
        </Button>
        <Button
          variant={activeFilter === "action" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("action")}
        >
          Accions
        </Button>
        <Button
          variant={activeFilter === "education" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("education")}
        >
          Educatius
        </Button>
        <Button
          variant={activeFilter === "community" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("community")}
        >
          Comunitaris
        </Button>
      </div>

      <div className="space-y-3">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{challenge.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {challenge.daysLeft} dies
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <div className="flex items-center">
                  <Sprout className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium">{challenge.points} pts</span>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progrés</span>
                  <span>{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>
              <div className="mt-3 flex justify-between">
                <Button variant="ghost" size="sm" className="text-xs h-8">
                  Veure detalls
                </Button>
                {challenge.progress === 100 ? (
                  <div className="flex items-center text-green-600 text-xs">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Completat
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    {challenge.type === "action" ? "Marcar com a completat" : "Continuar"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

