"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Droplet, Award, User, Info, VolumeIcon as VolumeUp, Volume2, Power, PowerOff, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { WaterDrop } from "@/components/water-drop"
import { ConsumptionChart } from "@/components/consumption-chart"
import { WaterFinder } from "@/components/water-finder"
import { VoiceAssistant } from "@/components/voice-assistant"
import { Challenges } from "@/components/challenges"
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

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Droplet className="h-8 w-8 text-sky-500" />
          <h1 className="text-2xl font-bold">EstalviAigua</h1>
        </div>
        <div className="flex items-center gap-4">
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

          <Button variant="ghost" size="icon" onClick={() => setVoiceActive(!voiceActive)}>
            {voiceActive ? <Volume2 className="h-5 w-5" /> : <VolumeUp className="h-5 w-5" />}
          </Button>

          <Button
            variant={friendsPanelOpen ? "default" : "outline"}
            size="icon"
            onClick={() => setFriendsPanelOpen(!friendsPanelOpen)}
            className={friendsPanelOpen ? "bg-sky-500 text-white" : ""}
          >
            <Users className="h-5 w-5" />
          </Button>

          <Button variant="outline" onClick={() => router.push("/profile")}>
            <User className="h-5 w-5 mr-2" />
            <span>Perfil</span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <WaterDrop
              percentage={(dailyConsumption / cataloniaAverage) * 100}
              isFlowing={sensorData?.clau === "oberta"}
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
                <TabsTrigger value="education">Educació</TabsTrigger>
              </TabsList>
              <TabsContent value="challenges">
                <Challenges />
              </TabsContent>
              <TabsContent value="waterfinder">
                <WaterFinder />
              </TabsContent>
              <TabsContent value="education">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Mòduls educatius</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Info className="h-5 w-5 text-sky-500" />
                          <h4 className="font-medium">Cicle de l'aigua</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Aprèn sobre el cicle natural de l'aigua i la seva importància.
                        </p>
                        <Button variant="link" className="px-0 mt-2">
                          Iniciar mòdul
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Info className="h-5 w-5 text-sky-500" />
                          <h4 className="font-medium">Impacte ambiental</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Descobreix com el consum d'aigua afecta el medi ambient.
                        </p>
                        <Button variant="link" className="px-0 mt-2">
                          Iniciar mòdul
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
              <Award className="h-6 w-6 text-amber-500" />
            </div>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-amber-500">{points}</p>
              <p className="text-sm text-muted-foreground">Punts acumulats</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Nivell actual</span>
                <span className="font-medium">Eco-Conscient</span>
              </div>
              <Progress value={65} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>Proper nivell: 200 pts</span>
              </div>
            </div>
            <Button className="w-full mt-4" onClick={() => router.push("/rewards")}>
              Veure recompenses
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

      {voiceActive && <VoiceAssistant onClose={() => setVoiceActive(false)} />}

      {/* Panel d'amistats */}
      {friendsPanelOpen && <FriendsPanel onClose={() => setFriendsPanelOpen(false)} />}
    </div>
  )
}

