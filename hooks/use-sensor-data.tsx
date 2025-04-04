"use client"

import { useState, useEffect } from "react"

interface SensorData {
  cabdal: number
  litres_acumulats: number
  temperatura: number
  clau: "oberta" | "tancada"
}

export function useSensorData() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simular l'obtenció de dades de l'API local
    // En una implementació real, això seria un fetch a http://localhost:PORT/
    const fetchData = () => {
      setIsLoading(true)

      // Simular una resposta d'API
      setTimeout(() => {
        try {
          // Dades simulades
          const mockData: SensorData = {
            cabdal: Math.random() * 2,
            litres_acumulats: Math.floor(Math.random() * 20) + 80,
            temperatura: Math.floor(Math.random() * 5) + 20,
            clau: Math.random() > 0.7 ? "oberta" : "tancada",
          }

          setSensorData(mockData)
          setIsLoading(false)
          setError(null)
        } catch (err) {
          setError(err instanceof Error ? err : new Error("Error desconegut"))
          setIsLoading(false)
        }
      }, 1000)
    }

    // Obtenir dades inicials
    fetchData()

    // Configurar interval per actualitzar dades cada 10 segons
    const intervalId = setInterval(fetchData, 10000)

    // Netejar interval al desmuntar
    return () => clearInterval(intervalId)
  }, [])

  return { sensorData, isLoading, error, setSensorData }
}

