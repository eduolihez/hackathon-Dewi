"use client"

import { useState, useEffect } from "react"

interface SensorData {
  cabdal: number
  litres_acumulats: number
  temperatura: number
  clau: "oberta" | "tancada"
}

interface APISensorData {
  timestamp: string
  cabdal?: string | number
  litres?: string | number
  litres_acumulats?: string | number
  temperatura?: string | number
  posicioClau?: string |number
}

export function useSensorData() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await fetch("http://localhost:5000/dades")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const data: APISensorData[] = await response.json()
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No s'han rebut dades")
        }

        const last = [...data].reverse().find(d =>
          d.cabdal !== undefined ||
          d.litres_acumulats !== undefined ||
          d.litres !== undefined ||
          d.temperatura !== undefined
        )

        if (!last) throw new Error("Cap dada vàlida trobada")

        const mockData: SensorData = {
          cabdal: parseFloat(String(last.cabdal ?? 0)),
          litres_acumulats: parseFloat(String(last.litres_acumulats ?? last.litres ?? 0)),
          temperatura: parseFloat(String(last.temperatura ?? 0)),
          clau: parseInt(String(last.posicioClau ?? 0)) > 0 ? "oberta" : "tancada"
        }

        setSensorData(mockData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconegut"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 10000)
    return () => clearInterval(intervalId)
  }, [])

  return { sensorData, isLoading, error, setSensorData }
}
