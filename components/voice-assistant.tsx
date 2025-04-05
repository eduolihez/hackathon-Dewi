"use client"

import { useState } from "react"
import { Mic, MicOff, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface VoiceAssistantProps {
  onClose: () => void
}

export function VoiceAssistant({ onClose }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")

  // Simular respostes de l'assistent
  const getAssistantResponse = (query: string) => {
    const responses: Record<string, string> = {
      hola: "Hola, sóc el teu assistent de Dewi. En què puc ajudar-te?",
      consum: "El teu consum actual és de 85 litres per dia, un 19% menys que la mitjana de Catalunya.",
      consells:
        "Per estalviar aigua, pots tancar l'aixeta mentre et rentes les dents, dutxar-te en lloc de banyar-te i reutilitzar l'aigua de la rentadora per al vàter.",
      punts: "Tens 120 punts EcoAigua. Necessites 80 punts més per assolir el següent nivell.",
      reptes:
        "Tens 3 reptes actius: reduir el consum un 5% aquesta setmana, instal·lar un airejador a l'aixeta i completar el mòdul educatiu sobre el cicle de l'aigua.",
    }

    // Cercar paraules clau a la consulta
    for (const [keyword, answer] of Object.entries(responses)) {
      if (query.toLowerCase().includes(keyword)) {
        return answer
      }
    }

    return "Ho sento, no he entès la teva pregunta. Pots preguntar-me sobre el teu consum, consells per estalviar aigua, els teus punts o reptes actius."
  }

  // Simular reconeixement de veu
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
    } else {
      setIsListening(true)
      setTranscript("")
      setResponse("")

      // Simular reconeixement de veu després d'un temps
      setTimeout(() => {
        const simulatedQueries = [
          "Quin és el meu consum actual?",
          "Dóna'm consells per estalviar aigua",
          "Quants punts tinc?",
          "Quins reptes tinc actius?",
        ]
        const randomQuery = simulatedQueries[Math.floor(Math.random() * simulatedQueries.length)]
        setTranscript(randomQuery)

        // Generar resposta
        setTimeout(() => {
          setResponse(getAssistantResponse(randomQuery))
          setIsListening(false)
        }, 1000)
      }, 2000)
    }
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
        <h3 className="text-sm font-medium">Assistent de veu</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-muted rounded-md p-3 min-h-[100px] max-h-[200px] overflow-y-auto">
          {transcript && (
            <div className="mb-2">
              <p className="text-sm font-medium">Tu:</p>
              <p className="text-sm">{transcript}</p>
            </div>
          )}
          {response && (
            <div className="mt-3">
              <p className="text-sm font-medium text-sky-600">Assistent:</p>
              <p className="text-sm">{response}</p>
            </div>
          )}
          {!transcript && !response && (
            <p className="text-sm text-muted-foreground">
              {isListening ? "Escoltant..." : "Prem el botó del micròfon per fer una pregunta."}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 flex justify-center">
        <Button
          variant={isListening ? "destructive" : "default"}
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={toggleListening}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </CardFooter>
    </Card>
  )
}

