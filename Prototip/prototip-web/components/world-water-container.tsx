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

  // Function to draw the pipe - horizontal pipe with water flowing down
  const drawTap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const pipeX = width * 0.4 // Moved left from 0.5 to 0.4
    const pipeY = height * 0.15
    const pipeLength = 40
    const pipeRadius = 15

    // Pipe colors
    const pipeColor = "#333333"
    const pipeDarkColor = "#222222"
    const pipeInnerColor = "#111111"

    // Draw the main horizontal pipe
    ctx.beginPath()
    ctx.ellipse(pipeX - pipeLength, pipeY, pipeRadius, pipeRadius, 0, 0, Math.PI * 2)
    ctx.fillStyle = pipeColor
    ctx.fill()
    ctx.strokeStyle = pipeDarkColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw the pipe body (rectangle)
    ctx.beginPath()
    ctx.rect(pipeX - pipeLength, pipeY - pipeRadius, pipeLength, pipeRadius * 2)
    ctx.fillStyle = pipeColor
    ctx.fill()

    // Draw the opening (circle)
    ctx.beginPath()
    ctx.arc(pipeX, pipeY, pipeRadius, 0, Math.PI * 2)
    ctx.fillStyle = pipeInnerColor
    ctx.fill()
    ctx.strokeStyle = pipeDarkColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw the inner opening (darker)
    ctx.beginPath()
    ctx.arc(pipeX, pipeY, pipeRadius * 0.7, 0, Math.PI * 2)
    ctx.fillStyle = "#000000"
    ctx.fill()

    // Add highlight to the pipe for dimension
    ctx.beginPath()
    ctx.ellipse(pipeX - pipeLength, pipeY - pipeRadius * 0.4, pipeRadius * 0.8, pipeRadius * 0.3, 0, 0, Math.PI)
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
    ctx.fill()

    // Removed the continuous water flow code
  }

  // Update the Earth container function to not require the image
  const drawEarthContainerWithImage = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    waterLevel: number,
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

  // Modify the useEffect to make loading faster
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

    // Set canvas dimensions
    const width = canvas.width
    const height = canvas.height

    // Animation variables
    let animationFrameId: number
    const droplets: { x: number; y: number; size: number; speed: number; opacity: number }[] = []

    // Calculate fill level based on percentage
    const fillPercentage = Math.min(100, Math.max(0, percentage))
    const waterLevel = height * 0.6 * (fillPercentage / 100)

    // Start drawing immediately without waiting for Earth image
    setIsLoading(false)

    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw tap/faucet
      drawTap(ctx, width, height)

      // Draw Earth container
      drawEarthContainerWithImage(ctx, width, height, waterLevel)

      // Draw water droplet if flowing
      if (isFlowing) {
        // Add new droplet at regular intervals
        if (Math.random() < 0.03) {
          // Reduced probability for fewer, more distinct drops
          droplets.push({
            x: width * 0.4, // Updated to match new pipe position (0.4 instead of 0.5)
            y: height * 0.15 + 5, // Position just below the pipe opening
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

      // Continue animation
      animationFrameId = requestAnimationFrame(draw)
    }

    // Start animation immediately
    draw()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [percentage, isFlowing, dailyLimit])

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

