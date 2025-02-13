"use client"

import { useState, useRef, useEffect } from "react"
import { COLOR_PINS, COLOR_OPTIONS } from "@/lib/constants"
import type { ColorType } from "@/types/goal"

interface ColorPickerProps {
  color: ColorType
  onChange: (color: ColorType) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-4 h-4 rounded-full ${COLOR_PINS[color]} hover:ring-2 ring-offset-2 ring-gray-400`}
        aria-label="色を選択"
      />
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 p-1 bg-white rounded shadow-lg z-10 flex">
          {COLOR_OPTIONS.map((colorOption) => (
            <button
              key={colorOption}
              onClick={() => {
                onChange(colorOption)
                setIsOpen(false)
              }}
              className={`w-6 h-6 rounded-full ${COLOR_PINS[colorOption]} m-1 hover:ring-2 ring-offset-1 ring-gray-400`}
              aria-label={`${colorOption}色を選択`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

