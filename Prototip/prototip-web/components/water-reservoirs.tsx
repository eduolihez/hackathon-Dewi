"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropletIcon, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useMediaQuery } from "@/hooks/use-mobile"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Tipo para los datos de embalses
interface Reservoir {
  nom: string
  nomComplet?: string
  volumActual: number
  volumMaxim: number
  percentatge: number
  dataActualitzacio: string
  conca?: string
}

export function WaterReservoirs() {
  const [reservoirs, setReservoirs] = useState<Reservoir[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Porcentaje global actual de las cuencas internas (dato actualizado)
  const currentGlobalPercentage = 61.3

  useEffect(() => {
    const fetchReservoirs = async () => {
      try {
        setLoading(true)

        // En una implementación real, aquí se haría una llamada a un endpoint de backend
        // que realizaría web scraping de la página de la ACA o consumiría una API oficial actualizada

        // Simulamos un retraso para mostrar el estado de carga
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos actualizados simulados basados en información real
        // En una implementación real, estos datos vendrían del web scraping
        const simulatedData: Reservoir[] = [
          {
            nom: "Darnius Boadella",
            volumActual: 38.5,
            volumMaxim: 61.1,
            percentatge: 63.0,
            dataActualitzacio: "2023-05-15",
            conca: "Muga",
          },
          {
            nom: "Sau",
            volumActual: 104.1,
            volumMaxim: 165.3,
            percentatge: 63.0,
            dataActualitzacio: "2023-05-15",
            conca: "Ter",
          },
          {
            nom: "Susqueda",
            volumActual: 147.1,
            volumMaxim: 233.5,
            percentatge: 63.0,
            dataActualitzacio: "2023-05-15",
            conca: "Ter",
          },
          {
            nom: "El Pasteral",
            volumActual: 1.8,
            volumMaxim: 2.0,
            percentatge: 90.0,
            dataActualitzacio: "2023-05-15",
            conca: "Ter",
          },
          {
            nom: "La Baells",
            volumActual: 67.9,
            volumMaxim: 115.4,
            percentatge: 58.8,
            dataActualitzacio: "2023-05-15",
            conca: "Llobregat",
          },
          {
            nom: "La Llosa del Cavall",
            volumActual: 50.4,
            volumMaxim: 80.0,
            percentatge: 63.0,
            dataActualitzacio: "2023-05-15",
            conca: "Llobregat",
          },
          {
            nom: "Sant Ponç",
            volumActual: 15.1,
            volumMaxim: 24.4,
            percentatge: 61.9,
            dataActualitzacio: "2023-05-15",
            conca: "Llobregat",
          },
          {
            nom: "Siurana",
            volumActual: 7.6,
            volumMaxim: 12.2,
            percentatge: 62.3,
            dataActualitzacio: "2023-05-15",
            conca: "Siurana-Riudecanyes",
          },
          {
            nom: "Riudecanyes",
            volumActual: 3.1,
            volumMaxim: 5.3,
            percentatge: 58.5,
            dataActualitzacio: "2023-05-15",
            conca: "Siurana-Riudecanyes",
          },
        ]

        setReservoirs(simulatedData)
        setError(null)
      } catch (err) {
        console.error("Error fetching reservoir data:", err)
        setError("No s'han pogut carregar les dades. Utilitzant dades simulades.")

        // Datos de respaldo en caso de error
        const fallbackData: Reservoir[] = [
          {
            nom: "Darnius Boadella",
            volumActual: 38.5,
            volumMaxim: 61.1,
            percentatge: 63.0,
            dataActualitzacio: "2023-05-15",
            conca: "Muga",
          },
          {
            nom: "Sau",
            volumActual: 104.1,
            volumMaxim: 165.3,
            percentatge: 63.0,
            dataActualitzacio: "2023-05-15",
            conca: "Ter",
          },
          {
            nom: "Susqueda",
            volumActual: 147.1,
            volumMaxim: 233.5,
            percentatge: 63.0,
            dataActualitzacio: "2023-05-15",
            conca: "Ter",
          },
          {
            nom: "La Baells",
            volumActual: 67.9,
            volumMaxim: 115.4,
            percentatge: 58.8,
            dataActualitzacio: "2023-05-15",
            conca: "Llobregat",
          },
          {
            nom: "La Llosa del Cavall",
            volumActual: 50.4,
            volumMaxim: 80.0,
            percentatge: 63.0,
            dataActualitzacio: "2023-05-15",
            conca: "Llobregat",
          },
          {
            nom: "Siurana",
            volumActual: 7.6,
            volumMaxim: 12.2,
            percentatge: 62.3,
            dataActualitzacio: "2023-05-15",
            conca: "Siurana-Riudecanyes",
          },
        ]

        setReservoirs(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchReservoirs()
  }, [])

  // Filtrar embalses según la pestaña activa
  const filteredReservoirs =
    activeTab === "all" ? reservoirs : reservoirs.filter((reservoir) => reservoir.conca === activeTab)

  // Función para determinar el color según el porcentaje
  const getColorByPercentage = (percentage: number) => {
    if (percentage < 25) return "hsl(0, 84%, 60%)" // Rojo
    if (percentage < 40) return "hsl(30, 84%, 60%)" // Naranja
    if (percentage < 60) return "hsl(45, 84%, 60%)" // Amarillo
    return "hsl(142, 71%, 45%)" // Verde
  }

  // Función para formatear números con separador de miles
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ca-ES", { maximumFractionDigits: 1 }).format(num)
  }

  // Componente personalizado para el tooltip del gráfico
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-2 border rounded shadow-sm text-xs">
          <p className="font-medium">{data.nom}</p>
          <p>Volum: {formatNumber(data.volumActual)} hm³</p>
          <p>Capacitat: {formatNumber(data.volumMaxim)} hm³</p>
          <p className="font-medium">{data.percentatge}%</p>
        </div>
      )
    }
    return null
  }

  // Fecha de actualización formateada
  const lastUpdate = new Date().toLocaleDateString("ca-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DropletIcon className="h-5 w-5 text-sky-500" />
              Estat de les conques internes
            </CardTitle>
            {!loading && (
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={`
                    ${
                      currentGlobalPercentage < 25
                        ? "bg-red-100 text-red-800"
                        : currentGlobalPercentage < 40
                          ? "bg-orange-100 text-orange-800"
                          : currentGlobalPercentage < 60
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                    }
                  `}
                >
                  {currentGlobalPercentage}% de capacitat
                </Badge>
                <span className="text-xs text-muted-foreground">Actualitzat: {lastUpdate}</span>
              </div>
            )}
          </div>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a
                    href="https://aca.gencat.cat/ca/laigua/estat-del-medi-hidric/recursos-disponibles/estat-de-les-reserves-daigua-als-embassaments/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Veure dades completes a l'ACA</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="all">Totes</TabsTrigger>
                <TabsTrigger value="Ter">Ter</TabsTrigger>
                <TabsTrigger value="Llobregat">Llobregat</TabsTrigger>
                <TabsTrigger value="Muga">Muga</TabsTrigger>
                <TabsTrigger value="Siurana-Riudecanyes">Siurana</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredReservoirs} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="nom" tick={{ fontSize: isMobile ? 10 : 12 }} interval={0} tickMargin={8} />
                      <YAxis
                        tickFormatter={(value) => `${value}%`}
                        domain={[0, 100]}
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="percentatge" name="Percentatge">
                        {filteredReservoirs.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getColorByPercentage(entry.percentatge)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 p-3 bg-sky-50 rounded-md border border-sky-100">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-sky-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-sky-800">
                        Les conques internes de Catalunya es troben actualment al{" "}
                        <strong>{currentGlobalPercentage}%</strong> de la seva capacitat.
                      </p>
                      <p className="text-xs text-sky-700 mt-1">
                        En una implementació real, aquestes dades s'obtindrien mitjançant web scraping de la pàgina
                        oficial de l'ACA o a través d'una API actualitzada.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs text-muted-foreground">Font: Agència Catalana de l'Aigua (ACA)</div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  )
}

