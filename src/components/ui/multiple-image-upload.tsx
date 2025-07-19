"use client"

import { Plus } from "lucide-react"
import { ImageUpload } from "./image-upload"

interface MultipleImageUploadProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function MultipleImageUpload({
  value,
  onChange,
  disabled
}: MultipleImageUploadProps) {
  // Convert comma-separated string to array
  const images = value ? value.split(",") : []

  const handleImageChange = (imageUrl: string, index: number) => {
    const newImages = [...images]
    
    if (imageUrl === "") {
      // Remove image
      newImages.splice(index, 1)
    } else if (index === newImages.length) {
      // Add new image
      newImages.push(imageUrl)
    } else {
      // Update existing image
      newImages[index] = imageUrl
    }
    
    // Convert back to comma-separated string
    onChange(newImages.join(","))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <ImageUpload
            key={`${index}-${image}`}
            value={image}
            onChange={(url) => handleImageChange(url, index)}
            disabled={disabled}
          />
        ))}
        {images.length < 5 && (
          <ImageUpload
            value=""
            onChange={(url) => handleImageChange(url, images.length)}
            disabled={disabled}
          />
        )}
      </div>
      {images.length === 0 && (
        <div className="text-sm text-muted-foreground text-center">
          No images uploaded yet. Click the box above to upload.
        </div>
      )}
    </div>
  )
} 