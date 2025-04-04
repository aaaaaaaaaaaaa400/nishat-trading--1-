"use client"

import * as React from "react"

interface ToastProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  className?: string
  closeButton?: boolean
  theme?: "light" | "dark" | "system"
}

export function Toaster({
  position = "top-right",
  className,
  closeButton = true,
  theme = "system",
}: ToastProps) {
  return (
    <div>
      {/* Simple placeholder for toast component */}
    </div>
  )
}

// Export a mock toast function that does nothing
export const toast = {
  // Basic toast function
  (...args: any[]) {
    console.log('Toast:', ...args);
    return { id: Date.now() };
  },
  // Common toast variants
  error: (...args: any[]) => {
    console.log('Error Toast:', ...args);
    return { id: Date.now() };
  },
  success: (...args: any[]) => {
    console.log('Success Toast:', ...args);
    return { id: Date.now() };
  },
  warning: (...args: any[]) => {
    console.log('Warning Toast:', ...args);
    return { id: Date.now() };
  },
  info: (...args: any[]) => {
    console.log('Info Toast:', ...args);
    return { id: Date.now() };
  },
  // Mock dismiss method
  dismiss: (toastId?: number) => {
    console.log('Dismiss Toast:', toastId);
  },
  // Other commonly used methods
  promise: (promise: Promise<any>, messages: any) => {
    console.log('Promise Toast:', messages);
    return promise;
  },
  custom: (...args: any[]) => {
    console.log('Custom Toast:', ...args);
    return { id: Date.now() };
  },
}
