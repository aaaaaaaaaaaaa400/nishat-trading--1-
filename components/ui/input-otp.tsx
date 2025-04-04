"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface InputOTPProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (value: string) => void
  length?: number
}

export function InputOTP({
  className,
  value,
  onChange,
  length = 6,
  ...props
}: InputOTPProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (/^\d*$/.test(newValue) && newValue.length <= length) {
      onChange(newValue)
    }
  }

  return (
    <div className="flex gap-2 items-center justify-center">
      <input
        type="text"
        maxLength={length}
        className={cn("sr-only", className)}
        value={value}
        onChange={handleChange}
        {...props}
      />
      <div className="flex gap-2">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-12 border rounded-md flex items-center justify-center text-lg"
          >
            {value[i] || ""}
          </div>
        ))}
      </div>
    </div>
  )
}

export { InputOTP as OTPInput }

export const InputOTPGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center gap-2",
      className
    )}
    {...props}
  />
)

export const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { filled?: boolean }
>(({ className, filled, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative w-10 h-12 text-center text-base font-medium border rounded-md focus-within:border-primary flex items-center justify-center",
      filled && "border-primary",
      className
    )}
    {...props}
  />
))
InputOTPSlot.displayName = "InputOTPSlot"

export const InputOTPSeparator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex items-center text-base px-1", className)}
    {...props}
  >
    -
  </div>
)
