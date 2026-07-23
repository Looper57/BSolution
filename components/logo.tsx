"use client"

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative h-[75px] lg:h-[110px] w-auto", className)}>
      <Image
        src="/images/logo.png"
        alt="B Solution Executive Search"
        width={550}
        height={165}
        className="h-full w-auto object-contain bg-transparent"
        priority
      />
    </div>
  )
}
