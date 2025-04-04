"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: any[]
}

export function Chart({
  className,
  data = [],
  ...props
}: ChartProps) {
  return (
    <div 
      className={cn("w-full h-[200px] flex items-center justify-center border rounded", className)} 
      {...props}
    >
      <div className="text-center text-muted-foreground">
        <p>Chart placeholder</p>
        <p className="text-xs">{data.length} data points</p>
      </div>
    </div>
  )
}

// Export simplified chart components
export const Line = Chart
export const Bar = Chart
export const Area = Chart
export const Pie = Chart
export const Scatter = Chart

// Export simplified axis components
export const XAxis = ({ children }: { children?: React.ReactNode }) => children
export const YAxis = ({ children }: { children?: React.ReactNode }) => children
export const CartesianGrid = () => null
export const Tooltip = () => null
export const Legend = () => null
export const ResponsiveContainer = ({ children }: { children?: React.ReactNode }) => <>{children}</>

// Export utility functions
export function formatNumber(num: number): string {
  return num.toLocaleString()
}
