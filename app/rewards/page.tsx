"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Sprout, ShoppingBag, Lock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DewiLogo } from "@/components/dewi-logo"

export default function RewardsPage() {
  const router = useRouter()

  // Asegurar que la página se carga desde arriba
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [points, setPoints] = useState(120)
  const [level, setLevel] = useState(1)

  // Definir los 5 niveles con nombres originales relacionados con plantas
  const levels = [
    { id: 1, name: "Llavor Conscient", minPoints: 0, maxPoints: 200, color: "text-green-500" },
    { id: 2, name: "Brot Sostenible", minPoints: 200, maxPoints: 500, color: "text-emerald-500" },
    { id: 3, name: "Fulla Renovable", minPoints: 500, maxPoints: 1000, color: "text-teal-500" },
    { id: 4, name: "Arbre Guardià", minPoints: 1000, maxPoints: 2000, color: "text-cyan-600" },
    { id: 5, name: "Bosc Protector", minPoints: 2000, maxPoints: null, color: "text-blue-700" },
  ]

  // Encontrar el nivel actual y calcular el progreso
  const currentLevel = levels.find((l) => l.id === level) || levels[0]
  const nextLevel = levels.find((l) => l.id === level + 1)
  const progress = nextLevel
    ? Math.min(100, ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100)
    : 100

  // Recompensas disponibles
  const rewards = [
    {
      id: 1,
      name: "Airejador per l'aixeta",
      description: "Redueix el consum d'aigua sense perdre pressió",
      points: 100,
      category: "productes",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Descompte 5€ factura",
      description: "Descompte directe a la teva propera factura d'aigua",
      points: 150,
      category: "descomptes",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Kit de reg per degoteig",
      description: "Sistema eficient per regar les teves plantes",
      points: 200,
      category: "productes",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Ampolla reutilitzable",
      description: "Ampolla d'acer inoxidable amb el logo de Dewi",
      points: 250,
      category: "productes",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Descompte 10€ factura",
      description: "Descompte directe a la teva propera factura d'aigua",
      points: 300,
      category: "descomptes",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Temporitzador de dutxa",
      description: "Controla el temps que passes a la dutxa",
      points: 350,
      category: "productes",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <DewiLogo />
        <h1 className="text-2xl font-bold ml-2">Botiga de Recompenses</h1>
      </div>

      {/* Sección de nivel y puntos */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-full bg-green-100 flex items-center justify-center ${currentLevel.color}`}
              >
                <Sprout className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentLevel.name}</h2>
                <p className="text-sm text-muted-foreground">Nivell {level} de 5</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{points}</span>
              <span className="text-sm text-muted-foreground">punts</span>
            </div>
          </div>

          {nextLevel && (
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progrés cap al següent nivell</span>
                <span>{nextLevel.name}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{currentLevel.minPoints} pts</span>
                <span>{nextLevel.minPoints} pts</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Todos los niveles */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {levels.map((lvl) => (
          <Card key={lvl.id} className={`${lvl.id === level ? "border-green-500" : ""}`}>
            <CardContent className="p-4 text-center">
              <div
                className={`mx-auto h-10 w-10 rounded-full bg-green-100 flex items-center justify-center ${lvl.color} mb-2`}
              >
                <Sprout className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-sm">{lvl.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {lvl.maxPoints ? `${lvl.minPoints}-${lvl.maxPoints} pts` : `+${lvl.minPoints} pts`}
              </p>
              {lvl.id === level && (
                <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 text-xs">
                  Nivell actual
                </Badge>
              )}
              {lvl.id < level && (
                <Badge variant="outline" className="mt-2 bg-sky-50 text-sky-700 text-xs">
                  <Check className="h-3 w-3 mr-1" /> Completat
                </Badge>
              )}
              {lvl.id > level && (
                <Badge variant="outline" className="mt-2 bg-gray-50 text-gray-500 text-xs">
                  <Lock className="h-3 w-3 mr-1" /> Bloquejat
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Catálogo de recompensas */}
      <h2 className="text-xl font-bold mb-4">Catàleg de recompenses</h2>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tots</TabsTrigger>
          <TabsTrigger value="productes">Productes</TabsTrigger>
          <TabsTrigger value="descomptes">Descomptes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} userPoints={points} />
          ))}
        </TabsContent>

        <TabsContent value="productes" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rewards
            .filter((r) => r.category === "productes")
            .map((reward) => (
              <RewardCard key={reward.id} reward={reward} userPoints={points} />
            ))}
        </TabsContent>

        <TabsContent value="descomptes" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rewards
            .filter((r) => r.category === "descomptes")
            .map((reward) => (
              <RewardCard key={reward.id} reward={reward} userPoints={points} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Componente para la tarjeta de recompensa
function RewardCard({ reward, userPoints }) {
  const canRedeem = userPoints >= reward.points

  return (
    <Card className={`${!canRedeem ? "opacity-70" : ""}`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{reward.name}</CardTitle>
          <div className="flex items-center">
            <Sprout className="h-4 w-4 text-green-500 mr-1" />
            <span className="font-medium">{reward.points}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <div className="flex items-center justify-center mb-3">
          <img src={reward.image || "/placeholder.svg"} alt={reward.name} className="h-24 w-auto object-contain" />
        </div>
        <p className="text-sm text-muted-foreground">{reward.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Button className="w-full" disabled={!canRedeem}>
          {canRedeem ? (
            <>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Bescanviar
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Punts insuficients
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

