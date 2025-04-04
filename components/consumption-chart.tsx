"use client"

import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dades simulades amb comparatives
const dailyData = [
  { date: "Dll", consumption: 85, mataro: 92.95, catalunya: 105 },
  { date: "Dm", consumption: 92, mataro: 92.95, catalunya: 105 },
  { date: "Dc", consumption: 78, mataro: 92.95, catalunya: 105 },
  { date: "Dj", consumption: 95, mataro: 92.95, catalunya: 105 },
  { date: "Dv", consumption: 88, mataro: 92.95, catalunya: 105 },
  { date: "Ds", consumption: 72, mataro: 92.95, catalunya: 105 },
  { date: "Dg", consumption: 65, mataro: 92.95, catalunya: 105 },
]

const monthlyData = [
  { date: "Gen", consumption: 2650, mataro: 2790, catalunya: 3150 },
  { date: "Feb", consumption: 2450, mataro: 2790, catalunya: 3150 },
  { date: "Mar", consumption: 2800, mataro: 2790, catalunya: 3150 },
  { date: "Abr", consumption: 2600, mataro: 2790, catalunya: 3150 },
  { date: "Mai", consumption: 2400, mataro: 2790, catalunya: 3150 },
  { date: "Jun", consumption: 2200, mataro: 2790, catalunya: 3150 },
  { date: "Jul", consumption: 2900, mataro: 2790, catalunya: 3150 },
  { date: "Ago", consumption: 3100, mataro: 2790, catalunya: 3150 },
  { date: "Set", consumption: 2700, mataro: 2790, catalunya: 3150 },
  { date: "Oct", consumption: 2500, mataro: 2790, catalunya: 3150 },
  { date: "Nov", consumption: 2300, mataro: 2790, catalunya: 3150 },
  { date: "Des", consumption: 2400, mataro: 2790, catalunya: 3150 },
]

const yearlyData = [
  { date: "2019", consumption: 32500, mataro: 33900, catalunya: 38300 },
  { date: "2020", consumption: 31200, mataro: 33900, catalunya: 38300 },
  { date: "2021", consumption: 29800, mataro: 33900, catalunya: 38300 },
  { date: "2022", consumption: 28500, mataro: 33900, catalunya: 38300 },
  { date: "2023", consumption: 27200, mataro: 33900, catalunya: 38300 },
]

export function ConsumptionChart() {
  const [period, setPeriod] = useState("daily")

  const data = period === "daily" ? dailyData : period === "monthly" ? monthlyData : yearlyData

  const yAxisLabel = period === "daily" ? "Litres/dia" : period === "monthly" ? "Litres/mes" : "Litres/any"

  return (
    <div className="h-full">
      <Tabs value={period} onValueChange={setPeriod} className="h-full">
        <TabsList className="grid grid-cols-3 w-[250px] mb-4">
          <TabsTrigger value="daily">Diari</TabsTrigger>
          <TabsTrigger value="monthly">Mensual</TabsTrigger>
          <TabsTrigger value="yearly">Anual</TabsTrigger>
        </TabsList>

        <TabsContent value={period} className="h-[calc(100%-40px)]">
          <ChartContainer
            config={{
              consumption: {
                label: "El teu consum",
                color: "hsl(196, 94%, 48%)",
              },
              mataro: {
                label: "Mitjana Mataró",
                color: "hsl(217, 91%, 60%)",
              },
              catalunya: {
                label: "Mitjana Catalunya",
                color: "hsl(142, 71%, 45%)",
              },
            }}
            className="h-full"
          >
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={8} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                label={{
                  value: yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="consumption"
                fill="var(--color-consumption)"
                fillOpacity={0.2}
                stroke="var(--color-consumption)"
                strokeWidth={2}
                name="El teu consum"
              />
              <Area
                type="monotone"
                dataKey="mataro"
                fill="var(--color-mataro)"
                fillOpacity={0.1}
                stroke="var(--color-mataro)"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Mitjana Mataró"
              />
              <Area
                type="monotone"
                dataKey="catalunya"
                fill="var(--color-catalunya)"
                fillOpacity={0.1}
                stroke="var(--color-catalunya)"
                strokeWidth={2}
                strokeDasharray="3 3"
                name="Mitjana Catalunya"
              />
            </AreaChart>
          </ChartContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}

