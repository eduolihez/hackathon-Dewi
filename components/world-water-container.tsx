"use client"

import { useEffect, useRef, useState } from "react"

interface WorldWaterContainerProps {
  percentage: number
  isFlowing: boolean
  dailyLimit?: number // Limit in liters, will be customizable from profile
}

export function WorldWaterContainer({
  percentage,
  isFlowing = false,
  dailyLimit = 100, // Default limit if not provided
}: WorldWaterContainerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error("Canvas element not found")
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      console.error("Could not get 2D context from canvas")
      return
    }

    console.log("Canvas initialized successfully", { width: canvas.width, height: canvas.height })

    // Set canvas dimensions
    const width = canvas.width
    const height = canvas.height

    // Load Earth image
    const earthImage = new Image()
    earthImage.src = "/images/earth.png" // Use the actual Earth image
    earthImage.crossOrigin = "anonymous"

    // Animation variables
    let animationFrameId: number
    const droplets: { x: number; y: number; size: number; speed: number; opacity: number }[] = []

    // Calculate fill level based on percentage
    const fillPercentage = Math.min(100, Math.max(0, percentage))
    const waterLevel = height * 0.6 * (fillPercentage / 100)

    // Wait for the Earth image to load
    earthImage.onload = () => {
      setIsLoading(false)
      // Draw function
      const draw = () => {
        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Draw tap/faucet
        drawTap(ctx, width, height)

        // Draw Earth container with image
        drawEarthContainerWithImage(ctx, width, height, waterLevel, earthImage)

        // Draw water droplet if flowing
        if (isFlowing) {
          // Add new droplet at regular intervals
          if (Math.random() < 0.03) {
            // Reduced probability for fewer, more distinct drops
            droplets.push({
              x: width * 0.5,
              y: height * 0.3 + 2, // Position below the tap (adjusted by 2px)
              size: 12 + Math.random() * 4, // Slightly larger drops
              speed: 1.5 + Math.random() * 1.5, // Slightly slower for better visibility
              opacity: 1,
            })
          }

          // Draw and update droplets
          droplets.forEach((droplet, index) => {
            // Draw droplet
            ctx.beginPath()
            ctx.moveTo(droplet.x, droplet.y)
            ctx.bezierCurveTo(
              droplet.x - droplet.size / 2,
              droplet.y + droplet.size / 3,
              droplet.x - droplet.size / 2,
              droplet.y + (droplet.size * 2) / 3,
              droplet.x,
              droplet.y + droplet.size,
            )
            ctx.bezierCurveTo(
              droplet.x + droplet.size / 2,
              droplet.y + (droplet.size * 2) / 3,
              droplet.x + droplet.size / 2,
              droplet.y + droplet.size / 3,
              droplet.x,
              droplet.y,
            )

            // Fill droplet with gradient
            const dropGradient = ctx.createLinearGradient(
              droplet.x - droplet.size / 2,
              droplet.y,
              droplet.x + droplet.size / 2,
              droplet.y + droplet.size,
            )
            dropGradient.addColorStop(0, `rgba(120, 210, 255, ${droplet.opacity})`)
            dropGradient.addColorStop(1, `rgba(0, 165, 233, ${droplet.opacity})`)

            ctx.fillStyle = dropGradient
            ctx.fill()

            // Add highlight
            ctx.beginPath()
            ctx.arc(droplet.x - droplet.size / 4, droplet.y + droplet.size / 3, droplet.size / 6, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${droplet.opacity * 0.7})`
            ctx.fill()

            // Update droplet position
            droplet.y += droplet.speed

            // Remove droplet if it reaches the water level or fades out
            if (droplet.y >= height * 0.4 + (height * 0.6 - waterLevel)) {
              // Create ripple effect when droplet hits water
              createRipple(ctx, droplet.x, droplet.y, droplet.size, waterLevel)
              droplets.splice(index, 1)
            }
          })
        }

        // Removed call to drawUsageInfo() as it's no longer needed

        // Continue animation
        animationFrameId = requestAnimationFrame(draw)
      }

      // Start animation
      draw()
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [percentage, isFlowing, dailyLimit])

  // Function to draw the tap/faucet
  const drawTap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const tapWidth = width * 0.4
    const tapHeight = height * 0.2
    const tapX = width * 0.3
    const tapY = height * 0.05 + 2 // Moved down by 2 pixels

    // Draw tap handle
    ctx.beginPath()
    ctx.arc(tapX, tapY, 15, 0, Math.PI * 2)
    const handleGradient = ctx.createLinearGradient(tapX - 15, tapY - 15, tapX + 15, tapY + 15)
    handleGradient.addColorStop(0, "#a0d8ef")
    handleGradient.addColorStop(1, "#7cb9d3")
    ctx.fillStyle = handleGradient
    ctx.fill()
    ctx.strokeStyle = "#5a9bbd"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw tap body
    ctx.beginPath()
    ctx.rect(tapX - 10, tapY, 20, 15)
    const bodyGradient = ctx.createLinearGradient(tapX - 10, tapY, tapX + 10, tapY + 15)
    bodyGradient.addColorStop(0, "#a0d8ef")
    bodyGradient.addColorStop(1, "#7cb9d3")
    ctx.fillStyle = bodyGradient
    ctx.fill()
    ctx.strokeStyle = "#5a9bbd"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw tap spout
    ctx.beginPath()
    ctx.moveTo(tapX, tapY + 15)
    ctx.lineTo(tapX, tapY + 25)
    ctx.lineTo(width * 0.5, tapY + 25)
    ctx.lineTo(width * 0.5, tapY + 40)
    ctx.lineWidth = 10
    ctx.strokeStyle = "#7cb9d3"
    ctx.stroke()

    // Draw tap outline
    ctx.beginPath()
    ctx.moveTo(tapX, tapY + 15)
    ctx.lineTo(tapX, tapY + 25)
    ctx.lineTo(width * 0.5, tapY + 25)
    ctx.lineTo(width * 0.5, tapY + 40)
    ctx.lineWidth = 2
    ctx.strokeStyle = "#5a9bbd"
    ctx.stroke()

    // Draw tap end
    ctx.beginPath()
    ctx.arc(width * 0.5, tapY + 40, 5, 0, Math.PI * 2)
    ctx.fillStyle = "#7cb9d3"
    ctx.fill()
    ctx.strokeStyle = "#5a9bbd"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  const drawEarthContainerWithImage = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    waterLevel: number,
    earthImage: HTMLImageElement,
  ) => {
    const earthX = width * 0.5
    const earthY = height * 0.7
    const earthRadius = width * 0.35

    // Draw the empty world container (outline)
    ctx.beginPath()
    ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2)
    ctx.lineWidth = 3
    ctx.strokeStyle = "#3498db"
    ctx.stroke()

    // Add some continent outlines to make it look like a world
    ctx.beginPath()
    // Draw simplified continent shapes
    // North America
    ctx.moveTo(earthX - earthRadius * 0.5, earthY - earthRadius * 0.3)
    ctx.bezierCurveTo(
      earthX - earthRadius * 0.6,
      earthY - earthRadius * 0.5,
      earthX - earthRadius * 0.4,
      earthY - earthRadius * 0.7,
      earthX - earthRadius * 0.2,
      earthY - earthRadius * 0.6,
    )

    // South America
    ctx.moveTo(earthX - earthRadius * 0.1, earthY + earthRadius * 0.1)
    ctx.bezierCurveTo(
      earthX - earthRadius * 0.2,
      earthY + earthRadius * 0.3,
      earthX - earthRadius * 0.1,
      earthY + earthRadius * 0.5,
      earthX + earthRadius * 0.1,
      earthY + earthRadius * 0.4,
    )

    // Europe/Africa
    ctx.moveTo(earthX + earthRadius * 0.1, earthY - earthRadius * 0.4)
    ctx.bezierCurveTo(
      earthX + earthRadius * 0.2,
      earthY - earthRadius * 0.1,
      earthX + earthRadius * 0.2,
      earthY + earthRadius * 0.3,
      earthX,
      earthY + earthRadius * 0.5,
    )

    // Asia/Australia
    ctx.moveTo(earthX + earthRadius * 0.3, earthY - earthRadius * 0.3)
    ctx.bezierCurveTo(
      earthX + earthRadius * 0.5,
      earthY - earthRadius * 0.2,
      earthX + earthRadius * 0.6,
      earthY + earthRadius * 0.1,
      earthX + earthRadius * 0.4,
      earthY + earthRadius * 0.3,
    )

    ctx.lineWidth = 1.5
    ctx.strokeStyle = "#4d7c0f"
    ctx.stroke()

    // Draw grid lines to make it look more like a globe
    for (let i = 1; i <= 3; i++) {
      // Horizontal lines (latitudes)
      ctx.beginPath()
      ctx.ellipse(earthX, earthY, earthRadius, earthRadius * 0.2 * i, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(52, 152, 219, 0.3)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Vertical lines (longitudes)
      ctx.beginPath()
      ctx.ellipse(earthX, earthY, earthRadius * 0.2 * i, earthRadius, Math.PI / 2, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw water filling the world
    if (waterLevel > 0) {
      // Calculate how much of the globe to fill
      const fillRatio = waterLevel / (height * 0.6)
      const fillHeight = earthRadius * 2 * fillRatio
      const startY = earthY + earthRadius - fillHeight

      // Create clipping region for the water (inside the globe)
      ctx.save()
      ctx.beginPath()
      ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2)
      ctx.clip()

      // Draw water
      ctx.beginPath()
      ctx.rect(earthX - earthRadius, startY, earthRadius * 2, fillHeight)

      // Create gradient for water
      const waterGradient = ctx.createLinearGradient(earthX, startY, earthX, startY + fillHeight)
      waterGradient.addColorStop(0, "rgba(56, 189, 248, 0.7)")
      waterGradient.addColorStop(1, "rgba(14, 165, 233, 0.8)")

      ctx.fillStyle = waterGradient
      ctx.fill()

      // Add wave effect at the top of the water
      const time = Date.now() / 1000
      const waveHeight = 3
      const waveFrequency = 0.05

      ctx.beginPath()
      ctx.moveTo(earthX - earthRadius, startY)

      for (let x = earthX - earthRadius; x <= earthX + earthRadius; x += 5) {
        const y = startY + Math.sin(x * waveFrequency + time) * waveHeight
        ctx.lineTo(x, y)
      }

      ctx.lineTo(earthX + earthRadius, startY)
      ctx.lineTo(earthX + earthRadius, startY + fillHeight)
      ctx.lineTo(earthX - earthRadius, startY + fillHeight)
      ctx.closePath()

      ctx.fillStyle = waterGradient
      ctx.fill()

      // Add water shine/reflection
      ctx.beginPath()
      ctx.ellipse(earthX, startY + fillHeight / 2, earthRadius * 0.7, fillHeight / 4, 0, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fill()

      ctx.restore()
    }
  }

  const createRipple = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, waterLevel: number) => {
    // Calculate where the droplet hits the water in the globe
    const earthY = ctx.canvas.height * 0.7
    const earthRadius = ctx.canvas.width * 0.35
    const fillRatio = waterLevel / (ctx.canvas.height * 0.6)
    const fillHeight = earthRadius * 2 * fillRatio
    const waterTopY = earthY + earthRadius - fillHeight

    // Only create ripples if the droplet hits the water
    if (y >= waterTopY) {
      // Draw ripple circles
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(x, waterTopY, size * (i + 1) * 0.7, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 - i * 0.15})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }

  // We've removed the drawUsageInfo function as requested

  return (
    <div className="relative w-[200px] h-[250px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
        </div>
      )}
      <canvas ref={canvasRef} width={200} height={250} className="drop-shadow-lg" />
    </div>
  )
}

