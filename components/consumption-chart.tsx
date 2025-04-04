"use client"

import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dades simulades
const dailyData = [
  { date: "Dll", consumption: 85 },
  { date: "Dm", consumption: 92 },
  { date: "Dc", consumption: 78 },
  { date: "Dj", consumption: 95 },
  { date: "Dv", consumption: 88 },
  { date: "Ds", consumption: 72 },
  { date: "Dg", consumption: 65 },
]

const monthlyData = [
  { date: "Gen", consumption: 2650 },
  { date: "Feb", consumption: 2450 },
  { date: "Mar", consumption: 2800 },
  { date: "Abr", consumption: 2600 },
  { date: "Mai", consumption: 2400 },
  { date: "Jun", consumption: 2200 },
  { date: "Jul", consumption: 2900 },
  { date: "Ago", consumption: 3100 },
  { date: "Set", consumption: 2700 },
  { date: "Oct", consumption: 2500 },
  { date: "Nov", consumption: 2300 },
  { date: "Des", consumption: 2400 },
]

const yearlyData = [
  { date: "2019", consumption: 32500 },
  { date: "2020", consumption: 31200 },
  { date: "2021", consumption: 29800 },
  { date: "2022", consumption: 28500 },
  { date: "2023", consumption: 27200 },
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
                label: "Consum",
                color: "hsl(var(--chart-1))",
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
              <Area
                type="monotone"
                dataKey="consumption"
                fill="var(--color-consumption)"
                fillOpacity={0.2}
                stroke="var(--color-consumption)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}

