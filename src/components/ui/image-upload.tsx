"use client"

import { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { Loader2, X } from "lucide-react"

import { Button } from "./button"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function ImageUpload({
  value,
  onChange,
  disabled
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      const files = e.target.files
      if (!files || files.length === 0) return

      const formData = new FormData()
      formData.append("file", files[0])

      const response = await fetch("/api/cloudinary", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      onChange(data.secure_url)
    } catch (error) {
      toast.error("Error uploading image")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange("")
  }

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-60 border-2 border-dashed rounded-lg hover:opacity-70 transition cursor-pointer"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={disabled || loading}
      />
      {value ? (
        <>
          <Image
            fill
            alt="Upload"
            src={value}
            className="object-cover rounded-lg"
          />
          <Button
            type="button"
            onClick={handleRemove}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            disabled={disabled || loading}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-gray-500 text-center">
            <div>Click to upload image</div>
            <div className="text-xs">Supports: JPG, PNG, GIF</div>
          </div>
        </div>
      )}
    </div>
  )
} 