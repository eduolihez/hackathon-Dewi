"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Award, Droplet, Power, PowerOff, Thermometer, Gauge, Waves, Users, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useSensorData } from "@/hooks/use-sensor-data"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DewiLogo } from "@/components/dewi-logo"

import DadesTempsReals from "@/components/DadesTempsReals"

export default function ProfilePage() {
  const router = useRouter()
  const { sensorData, setSensorData } = useSensorData()
  const [monthlyLimit, setMonthlyLimit] = useState(90)
  const [customLimit, setCustomLimit] = useState("90")
  const [sliderMax, setSliderMax] = useState(200)
  const [name, setName] = useState("Marc Puig")
  const [email, setEmail] = useState("marc.puig@example.com")
  const [level, setLevel] = useState("Eco-Conscient")
  const [points, setPoints] = useState(120)
  const ambientTemperature = 22 // Temperatura ambient simulada
  const [householdMembers, setHouseholdMembers] = useState(1)

  // Límites base por persona
  const baseLimitPerPerson = 90
  const maxLimitPerPerson = 200

  // Actualizar el valor personalizado cuando cambia el slider o el número de personas
  useEffect(() => {
    setCustomLimit(monthlyLimit.toString())
  }, [monthlyLimit])

  // Actualizar límites cuando cambia el número de personas
  useEffect(() => {
    const newBaseLimit = baseLimitPerPerson * householdMembers
    setMonthlyLimit(newBaseLimit)
    setCustomLimit(newBaseLimit.toString())
    setSliderMax(maxLimitPerPerson * householdMembers)
  }, [householdMembers])

  // Manejar cambios en el input personalizado
  const handleCustomLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomLimit(value)

    // Actualizar el slider si el valor es un número válido
    const numValue = Number.parseInt(value)
    if (!isNaN(numValue)) {
      // Si el valor es mayor que el máximo actual, actualizar el máximo
      if (numValue > sliderMax) {
        setSliderMax(numValue)
      }

      // Actualizar el slider con el valor (limitado al máximo del slider)
      setMonthlyLimit(Math.min(numValue, maxLimitPerPerson * householdMembers))
    }
  }

  // Aplicar el valor personalizado cuando el input pierde el foco
  const handleCustomLimitBlur = () => {
    const numValue = Number.parseInt(customLimit)
    if (isNaN(numValue) || numValue <= 0) {
      // Si no es un número válido, volver al valor anterior
      setCustomLimit(monthlyLimit.toString())
    }
  }

  // Incrementar el número de personas
  const incrementHouseholdMembers = () => {
    if (householdMembers < 10) {
      setHouseholdMembers(householdMembers + 1)
    }
  }

  // Decrementar el número de personas
  const decrementHouseholdMembers = () => {
    if (householdMembers > 1) {
      setHouseholdMembers(householdMembers - 1)
    }
  }

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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <DewiLogo />
        <h1 className="text-2xl font-bold ml-2">El meu perfil</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Visualització en temps real - Movido arriba */}
        <Card>
          <CardHeader>
            <CardTitle>Estat actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Dades del sensor:</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Power className={`h-4 w-4 ${sensorData?.clau === "oberta" ? "text-red-500" : "text-green-500"}`} />
                    <span>Posició de la clau</span>
                  </div>
                  <span className="font-medium">{sensorData?.clau === "oberta" ? "Oberta" : "Tancada"}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-sky-500" />
                    <span>Cabal d'aigua</span>
                  </div>
                  <span className="font-medium">6.7 L/min</span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${Math.min(100, (sensorData?.cabdal || 0.28) * 50)}%` }}
                  ></div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-sky-500" />
                    <span>Litres acumulats</span>
                  </div>
                  <span className="font-medium">{sensorData?.litres_acumulats || "85"} L</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    <span>Temperatura</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{sensorData?.temperatura || "20"}°C</div>
                    <div className="text-xs text-muted-foreground">Ambient: {ambientTemperature}°C</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant={sensorData?.clau === "oberta" ? "destructive" : "default"}
                  size="sm"
                  className="w-full"
                  onClick={toggleFaucet}
                >
                  {sensorData?.clau === "oberta" ? (
                    <>
                      <PowerOff className="h-4 w-4 mr-1" /> Tancar aixeta
                    </>
                  ) : (
                    <>
                      <Power className="h-4 w-4 mr-1" /> Obrir aixeta
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informació de l'usuari */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informació personal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96&text=MP" alt="Avatar" />
                  <AvatarFallback>
                    <Droplet className="h-12 w-12 text-sky-500" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Canviar foto
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correu electrònic</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Nivell de recompenses</Label>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-sm font-medium">{points} punts</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{level}</div>
                    <Progress value={65} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>Proper nivell: 200 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Litres estalviats - Ahora ocupa todo el ancho */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-sky-500" />
              Estalvi d'aigua
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-sky-50 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Has estalviat respecte el mes anterior</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-bold text-sky-600">4 L</span>
                      <span className="text-xs text-green-600">+2%</span>
                    </div>
                  </div>
                  <Droplet className="h-8 w-8 text-sky-200" />
                </div>
              </div>

              <div className="bg-sky-50 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Portes estalviat aquest any en total</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-bold text-sky-600">50 L</span>
                      <span className="text-xs text-green-600">+8%</span>
                    </div>
                  </div>
                  <Droplet className="h-8 w-8 text-sky-200" />
                </div>
              </div>

              <div className="bg-sky-50 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Ahir vas estalviar respecte el dia anterior</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-bold text-sky-600">1.5 L</span>
                      <span className="text-xs text-green-600">+5%</span>
                    </div>
                  </div>
                  <Droplet className="h-8 w-8 text-sky-200" />
                </div>
              </div>
            </div>
            <div className="text-xs text-center text-muted-foreground mt-3">
              Segueix així! Estàs contribuint a un futur més sostenible.
            </div>
          </CardContent>
        </Card>

        {/* Configuració de límits */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Configuració de límits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Número de personas en el hogar */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="household-members">Persones a casa</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={decrementHouseholdMembers}
                      disabled={householdMembers <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center justify-center w-10 h-8 border rounded-md">
                      <span className="font-medium">{householdMembers}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={incrementHouseholdMembers}
                      disabled={householdMembers >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-sky-500" />
                  <div className="text-sm text-muted-foreground">
                    Els límits de consum s'ajusten automàticament segons el nombre de persones a casa.
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="monthly-limit">Límit mensual de consum</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="custom-limit"
                      value={customLimit}
                      onChange={handleCustomLimitChange}
                      onBlur={handleCustomLimitBlur}
                      className="w-20 h-8 text-right"
                    />
                    <span className="text-sm">litres</span>
                  </div>
                </div>

                <Slider
                  id="monthly-limit"
                  min={0}
                  max={maxLimitPerPerson * householdMembers}
                  step={10}
                  value={[monthlyLimit]}
                  onValueChange={(value) => setMonthlyLimit(value[0])}
                  className="mt-2"
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 L</span>
                  <span>Mitjana: {baseLimitPerPerson * householdMembers} L</span>
                  <span>{maxLimitPerPerson * householdMembers} L</span>
                </div>

                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-sky-500" />
                  <div className="text-sm text-muted-foreground">
                    Límit recomanat per {householdMembers} {householdMembers === 1 ? "persona" : "persones"}:{" "}
                    {baseLimitPerPerson * householdMembers} litres al mes.
                  </div>
                </div>

                {Number.parseInt(customLimit) > maxLimitPerPerson * householdMembers && (
                  <div className="text-xs text-amber-600 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    El valor introduït ({customLimit} L) supera el màxim recomanat de{" "}
                    {maxLimitPerPerson * householdMembers} L.
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="daily-limit">Límit diari recomanat</Label>
                  <span className="text-sm font-medium">{Math.round(Number.parseInt(customLimit) / 30)} litres</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-sky-500" />
                  <div className="text-sm text-muted-foreground">
                    Basat en el teu límit mensual, et recomanem un consum diari màxim de{" "}
                    <span className="font-medium">{Math.round(Number.parseInt(customLimit) / 30)} litres</span>.
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Els canvis es desen automàticament.</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <DadesTempsReals />
      </div>
    </div>
  )
}

