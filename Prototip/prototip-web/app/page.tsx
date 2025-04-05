"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, CloudRain, VolumeIcon as VolumeUp, Volume2, Power, PowerOff, Users, Home, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { WorldWaterContainer } from "@/components/world-water-container"
import { ConsumptionChart } from "@/components/consumption-chart"
import { WaterFinder } from "@/components/water-finder"
import { VoiceAssistant } from "@/components/voice-assistant"
import { Challenges } from "@/components/challenges"
import { WaterReservoirs } from "@/components/water-reservoirs"
import { DewiLogo } from "@/components/dewi-logo"
import { useSensorData } from "@/hooks/use-sensor-data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-mobile"
import { FriendsPanel } from "@/components/friends-panel"

export default function Dashboard() {
  const router = useRouter()
  const { sensorData, isLoading, error, setSensorData } = useSensorData()
  const [points, setPoints] = useState(120)
  const [voiceActive, setVoiceActive] = useState(false)
  const [friendsPanelOpen, setFriendsPanelOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [dailyLimit, setDailyLimit] = useState(100) // Limit in liters, customizable from profile

  // Dades de consum diari (simulades)
  const dailyConsumption = 85 // litres/persona/dia
  const mataroAverage = 92.95 // litres/persona/dia
  const cataloniaAverage = 105 // litres/persona/dia

  // Calcular percentatge d'estalvi
  const savingsPercentage = Math.round(((cataloniaAverage - dailyConsumption) / cataloniaAverage) * 100)

  // Funció per canviar l'estat de l'aixeta
  const toggleFaucet = () => {
    if (sensorData) {
      const newSensorData = {
        ...sensorData,
        clau: sensorData.clau === "oberta" ? "tancada" : "oberta",
      }
      setSensorData(newSensorData)
    }
  }

  // Tancar el panel d'amistats quan es canvia a mòbil
  useEffect(() => {
    if (isMobile && friendsPanelOpen) {
      setFriendsPanelOpen(false)
    }
  }, [isMobile])

  // Definir los 5 niveles con nombres originales relacionados con plantas
  const levels = [
    { id: 1, name: "Llavor Conscient", minPoints: 0, maxPoints: 200, color: "text-green-500" },
    { id: 2, name: "Brot Sostenible", minPoints: 200, maxPoints: 500, color: "text-emerald-500" },
    { id: 3, name: "Fulla Renovable", minPoints: 500, maxPoints: 1000, color: "text-teal-500" },
    { id: 4, name: "Arbre Guardià", minPoints: 1000, maxPoints: 2000, color: "text-cyan-600" },
    { id: 5, name: "Bosc Protector", minPoints: 2000, maxPoints: null, color: "text-blue-700" },
  ]

  // Encontrar el nivel actual
  const currentLevel = levels.find((l) => points >= l.minPoints && (!l.maxPoints || points < l.maxPoints)) || levels[0]
  const nextLevel = levels.find((l) => l.id === currentLevel.id + 1)

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <DewiLogo />
        </div>

        <nav className="flex items-center gap-2 md:gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-sky-500">
                  <Home className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Inici</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setVoiceActive(!voiceActive)}
                  className={voiceActive ? "text-sky-500" : ""}
                >
                  {voiceActive ? <Volume2 className="h-5 w-5" /> : <VolumeUp className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Assistent IA</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFriendsPanelOpen(!friendsPanelOpen)}
                  className={friendsPanelOpen ? "text-sky-500" : ""}
                >
                  <Users className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Amistats</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => router.push("/profile")}>
                  <User className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Perfil</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={sensorData?.clau === "oberta" ? "outline" : "ghost"}
                  size="icon"
                  onClick={toggleFaucet}
                  className={sensorData?.clau === "oberta" ? "border-sky-500 text-sky-500" : "text-muted-foreground"}
                >
                  {sensorData?.clau === "oberta" ? <Power className="h-5 w-5" /> : <PowerOff className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{sensorData?.clau === "oberta" ? "Aixeta oberta" : "Aixeta tancada"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <WorldWaterContainer
              percentage={(dailyConsumption / dailyLimit) * 100}
              isFlowing={sensorData?.clau === "oberta"}
              dailyLimit={dailyLimit}
            />
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">Consum actual</h2>
              <p className="text-3xl font-bold text-sky-600">{sensorData?.litres_acumulats || dailyConsumption} L</p>
              <p className="text-sm text-muted-foreground">
                {sensorData?.clau === "oberta" ? "Aixeta oberta" : "Aixeta tancada"}
              </p>
              <Button
                variant={sensorData?.clau === "oberta" ? "destructive" : "default"}
                size="sm"
                className="mt-2"
                onClick={toggleFaucet}
              >
                {sensorData?.clau === "oberta" ? "Tancar aixeta" : "Obrir aixeta"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="challenges">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="challenges">Reptes</TabsTrigger>
                <TabsTrigger value="waterfinder">WaterFinder</TabsTrigger>
                <TabsTrigger value="education">Recursos</TabsTrigger>
              </TabsList>
              <TabsContent value="challenges">
                <Challenges />
              </TabsContent>
              <TabsContent value="waterfinder">
                <WaterFinder />
              </TabsContent>
              <TabsContent value="education">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recomanacions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <CloudRain className="h-5 w-5 text-sky-500" />
                          <h4 className="font-medium">Avui plou! No reguis el jardí!</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Avui hi ha un 85% de probabilitat que plogui a Mataró. Recomanem no regar el jardí.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Droplet className="h-5 w-5 text-sky-500" />
                          <h4 className="font-medium">Si fiquessis l'aigua al 80%, t'estalviaries 10 €</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Prova-ho quan et dutxis! Baixa la pressió de la mateixa, vols provar a inclinar 60º l'aixeta?
                        </p>
                        <Button variant="link" className="px-0 mt-2">
                          Posar-ho a 60º!
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Punts EcoAigua</h2>
              <Sprout className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-green-500">{points}</p>
              <p className="text-sm text-muted-foreground">Punts acumulats</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Nivell actual</span>
                <span className={`font-medium ${currentLevel.color}`}>{currentLevel.name}</span>
              </div>
              <Progress value={65} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{currentLevel.minPoints}</span>
                <span>
                  Proper nivell: {nextLevel ? `${nextLevel.name} (${nextLevel.minPoints} pts)` : "Nivell màxim"}
                </span>
              </div>
            </div>
            <Button
              className="w-full mt-4"
              onClick={() => {
                router.push("/rewards")
                // Asegurar que la página se carga desde arriba
                setTimeout(() => window.scrollTo(0, 0), 100)
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Botiga de recompenses
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-2 sm:p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-2 md:mb-4 px-2">Anàlisi de consum</h2>
            <div className={`${isMobile ? "h-[200px]" : "h-[250px]"} overflow-x-auto`}>
              <ConsumptionChart />
            </div>
            <div className="mt-2 md:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 px-2">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-muted-foreground">El teu consum</span>
                <span className="text-sm sm:text-lg font-semibold">{dailyConsumption} L/dia</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-muted-foreground">Mitjana Mataró</span>
                <span className="text-sm sm:text-lg font-semibold">{mataroAverage} L/dia</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-muted-foreground">Mitjana Catalunya</span>
                <span className="text-sm sm:text-lg font-semibold">{cataloniaAverage} L/dia</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección de estado de las cuencas internas de Cataluña */}
      <div className="mb-6">
        <WaterReservoirs />
      </div>

      {voiceActive && <VoiceAssistant onClose={() => setVoiceActive(false)} />}

      {/* Panel d'amistats */}
      {friendsPanelOpen && <FriendsPanel onClose={() => setFriendsPanelOpen(false)} />}
    </div>
  )
}

// Importar el icono ShoppingBag
import { Droplet, ShoppingBag } from "lucide-react"

