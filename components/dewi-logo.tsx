import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-mobile"

interface DewiLogoProps {
  className?: string
  iconClassName?: string
}

export function DewiLogo({ className = "", iconClassName = "" }: DewiLogoProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  if (isMobile) {
    return (
      <div className={`relative ${iconClassName}`}>
        <Image src="/images/dewi-mobile-logo.png" alt="Dewi" width={40} height={40} className="h-8 w-8" priority />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image src="/images/dewi-logo.png" alt="Dewi" width={120} height={40} className="h-8 w-auto" priority />
    </div>
  )
}

