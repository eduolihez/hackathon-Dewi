"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Define the water source type
interface WaterSource {
  id: number
  name: string
  address: string
  distance: number
}

interface MapComponentProps {
  filteredSources: WaterSource[]
}

// Coordinates for Mataró, Spain
const MATARO_COORDS = [41.5389, 2.4441]

// Generate random coordinates around Mataró for the water sources
const getRandomCoords = (index: number) => {
  // Create a pattern of points around the center
  const angle = (index * 72) % 360 // Distribute points in a circle
  const radius = 0.005 + index * 0.002 // Vary the distance from center

  const lat = MATARO_COORDS[0] + radius * Math.cos((angle * Math.PI) / 180)
  const lng = MATARO_COORDS[1] + radius * Math.sin((angle * Math.PI) / 180)

  return [lat, lng]
}

// Create a custom icon component for the water sources
const createWaterIcon = () => {
  return L.divIcon({
    html: `
      <div style="background-color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 4.5V9a4.5 4.5 0 1 0 9 0V4.5"/>
          <path d="M7.5 4.5h9"/>
          <path d="M7.5 1.5h9"/>
        </svg>
      </div>
    `,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

export default function MapComponent({ filteredSources }: MapComponentProps) {
  const [mounted, setMounted] = useState(false)

  // Set mounted to true after component mounts to avoid SSR issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Import Leaflet CSS */}
      <style jsx global>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
        }
      `}</style>

      <MapContainer center={MATARO_COORDS as [number, number]} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredSources.map((source, index) => (
          <Marker key={source.id} position={getRandomCoords(index) as [number, number]} icon={createWaterIcon()}>
            <Popup>
              <div className="p-1">
                <h3 className="font-medium">{source.name}</h3>
                <p className="text-sm text-muted-foreground">{source.address}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">{source.distance} km</span> de distància
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  )
}

