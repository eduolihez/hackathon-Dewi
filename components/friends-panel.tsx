"use client"

import { useState } from "react"
import { X, Search, UserPlus, MessageSquare, BarChart, Droplet, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-mobile"

interface FriendsPanelProps {
  onClose: () => void
}

// Dades simulades d'amistats
const friendsData = [
  {
    id: 1,
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    savings: 15,
    points: 230,
  },
  {
    id: 2,
    name: "Joan Martí",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    savings: 8,
    points: 180,
  },
  {
    id: 3,
    name: "Laura Puig",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    savings: 22,
    points: 310,
  },
  {
    id: 4,
    name: "Pau Ferrer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    savings: 12,
    points: 205,
  },
  {
    id: 5,
    name: "Anna Costa",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    savings: 5,
    points: 150,
  },
  {
    id: 6,
    name: "Jordi Valls",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    savings: 18,
    points: 275,
  },
]

export function FriendsPanel({ onClose }: FriendsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const filteredFriends = friendsData.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div
      className={`
      fixed 
      ${isMobile ? "inset-0 z-50 bg-background" : "top-0 right-0 bottom-0 w-80 z-40 border-l"} 
      bg-background shadow-lg
    `}
    >
      {/* Capçalera */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Amistats</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Barra de cerca */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cercar amistats..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Pestanyes */}
      <Tabs defaultValue="gota-a-gota" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="gota-a-gota">Gota a Gota</TabsTrigger>
          <TabsTrigger value="friends">Amistats</TabsTrigger>
          <TabsTrigger value="requests">Sol·licituds</TabsTrigger>
        </TabsList>

        <TabsContent value="gota-a-gota" className="p-0">
          <div className="overflow-y-auto" style={{ height: isMobile ? "calc(100vh - 180px)" : "calc(100vh - 160px)" }}>
            <div className="p-3 bg-sky-50 mb-3">
              <h3 className="font-medium text-sm mb-1">Lliga Municipal d'Estalvi d'Aigua</h3>
              <p className="text-xs text-muted-foreground">
                Classificació dels municipis segons els punts d'estalvi acumulats
              </p>
            </div>
            <ul className="divide-y">
              {[
                { name: "Mataró", points: 12450, position: 1, change: "up" },
                { name: "Barcelona", points: 11200, position: 2, change: "same" },
                { name: "Girona", points: 10800, position: 3, change: "up" },
                { name: "Tarragona", points: 9750, position: 4, change: "down" },
                { name: "Lleida", points: 9200, position: 5, change: "same" },
                { name: "Sabadell", points: 8900, position: 6, change: "up" },
                { name: "Terrassa", points: 8750, position: 7, change: "down" },
                { name: "Badalona", points: 8300, position: 8, change: "same" },
                { name: "Reus", points: 7950, position: 9, change: "up" },
                { name: "Manresa", points: 7800, position: 10, change: "down" },
              ].map((city) => (
                <li key={city.name} className={`p-3 hover:bg-muted/50 ${city.position === 1 ? "bg-sky-50" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">
                        {city.position}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{city.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {city.change === "up" && <span className="text-green-500">▲</span>}
                          {city.change === "down" && <span className="text-red-500">▼</span>}
                          {city.change === "same" && <span className="text-gray-400">•</span>}
                          <span>{city.points.toLocaleString()} punts</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {city.position === 1 && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                          <Award className="h-3 w-3 mr-1" />
                          Líder
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="friends" className="p-0">
          <div className="overflow-y-auto" style={{ height: isMobile ? "calc(100vh - 180px)" : "calc(100vh - 160px)" }}>
            {filteredFriends.length > 0 ? (
              <ul className="divide-y">
                {filteredFriends.map((friend) => (
                  <li key={friend.id} className="p-3 hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback>{friend.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${friend.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                          ></span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{friend.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Droplet className="h-3 w-3 mr-1" />
                              {friend.savings}% estalvi
                            </span>
                            <span className="flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              {friend.points} pts
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <BarChart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p>No s'han trobat amistats</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="p-4">
          <div className="text-center p-4">
            <p className="text-muted-foreground mb-4">No tens sol·licituds d'amistat pendents</p>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Afegir amistats
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Barra inferior en mòbil */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-background">
          <Button className="w-full" onClick={onClose}>
            Tancar
          </Button>
        </div>
      )}
    </div>
  )
}

