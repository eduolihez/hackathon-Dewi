"use client"

import { useState } from "react"
import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-muted-foreground">Carregant mapa...</p>
    </div>
  ),
})

// Dades simulades de fonts d'aigua
const waterSources = [
  { id: 1, name: "Font Parc Central", address: "Parc Central, Mataró", distance: 0.3 },
  { id: 2, name: "Font Plaça Major", address: "Plaça Major, Mataró", distance: 0.7 },
  { id: 3, name: "Font Estació", address: "Estació de tren, Mataró", distance: 1.2 },
  { id: 4, name: "Font Platja", address: "Passeig Marítim, Mataró", distance: 1.5 },
]

export function WaterFinder() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const filteredSources = waterSources.filter(
    (source) =>
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleGetLocation = () => {
    setIsLoading(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position)
          setIsLoading(false)
        },
        (error) => {
          console.error("Error obtenint la ubicació:", error)
          setIsLoading(false)
        },
      )
    } else {
      console.error("La geolocalització no està suportada per aquest navegador.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cercar fonts properes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={handleGetLocation} disabled={isLoading}>
          <MapPin className="h-4 w-4 mr-2" />
          {isLoading ? "Cercant..." : "La meva ubicació"}
        </Button>
      </div>

      <div className="h-[300px] bg-muted rounded-md overflow-hidden relative">
        <MapComponent filteredSources={filteredSources} />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Fonts properes</h3>
        <div className="space-y-2">
          {filteredSources.map((source) => (
            <Card key={source.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{source.name}</h4>
                    <p className="text-sm text-muted-foreground">{source.address}</p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-sky-500 mr-1" />
                    <span className="text-sm font-medium">{source.distance} km</span>
                  </div>
                </div>
                <Button variant="link" className="px-0 mt-1">
                  Veure ruta
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

