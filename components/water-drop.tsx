"use client"

import { useEffect, useRef } from "react"

interface WaterDropProps {
  percentage: number
  isFlowing: boolean
}

export function WaterDrop({ percentage, isFlowing = false }: WaterDropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const width = canvas.width
    const height = canvas.height

    // Animation variables
    let animationFrameId: number
    const ripples: { x: number; y: number; radius: number; opacity: number }[] = []

    // Calculate fill level based on percentage (inverted, less water = better)
    const fillLevel = Math.min(100, Math.max(0, 100 - percentage))
    const waterLevel = height * (1 - fillLevel / 100)

    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw drop outline
      ctx.beginPath()
      ctx.moveTo(width / 2, 0)
      ctx.bezierCurveTo(width * 0.3, height * 0.3, width * 0.1, height * 0.6, width / 2, height)
      ctx.bezierCurveTo(width * 0.9, height * 0.6, width * 0.7, height * 0.3, width / 2, 0)
      ctx.strokeStyle = "#0ea5e9"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.closePath()

      // Create clip for water
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(width / 2, 0)
      ctx.bezierCurveTo(width * 0.3, height * 0.3, width * 0.1, height * 0.6, width / 2, height)
      ctx.bezierCurveTo(width * 0.9, height * 0.6, width * 0.7, height * 0.3, width / 2, 0)
      ctx.closePath()
      ctx.clip()

      // Draw water
      const time = Date.now() / 1000
      const waveHeight = 5
      const waveFrequency = 0.05

      ctx.fillStyle = "#0ea5e9"
      ctx.beginPath()
      ctx.moveTo(0, height)

      for (let x = 0; x <= width; x += 5) {
        const y = waterLevel + Math.sin(x * waveFrequency + time) * waveHeight
        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()

      // Draw ripples if water is flowing
      if (isFlowing) {
        // Add new ripple occasionally
        if (Math.random() < 0.1) {
          ripples.push({
            x: width / 2 + (Math.random() * 20 - 10),
            y: waterLevel - 10,
            radius: 2,
            opacity: 1,
          })
        }

        // Draw and update ripples
        ripples.forEach((ripple, index) => {
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`
          ctx.stroke()

          // Update ripple
          ripple.radius += 0.5
          ripple.opacity -= 0.03

          // Remove faded ripples
          if (ripple.opacity <= 0) {
            ripples.splice(index, 1)
          }
        })
      }

      ctx.restore()

      // Add gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)")
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)")

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(width / 2, 0)
      ctx.bezierCurveTo(width * 0.3, height * 0.3, width * 0.1, height * 0.6, width / 2, height)
      ctx.bezierCurveTo(width * 0.9, height * 0.6, width * 0.7, height * 0.3, width / 2, 0)
      ctx.closePath()
      ctx.clip()

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      ctx.restore()

      // Continue animation
      animationFrameId = requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [percentage, isFlowing])

  return <canvas ref={canvasRef} width={150} height={200} className="drop-shadow-lg" />
}

