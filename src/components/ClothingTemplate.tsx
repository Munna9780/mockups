'use client'

import { useState, useEffect } from 'react'
import { fabric } from 'fabric'
import ImageLoader from './ImageLoader'

interface ClothingTemplateProps {
  canvas: fabric.Canvas | null
  type: 'tshirt' | 'hoodie' | 'polo'
  view: 'front' | 'back' | 'side'
}

const clothingColors = {
  tshirt: [
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#ff0000' },
    { name: 'Navy', value: '#000080' },
    { name: 'Forest Green', value: '#228B22' },
    { name: 'Gray', value: '#808080' },
    { name: 'Burgundy', value: '#800020' }
  ],
  hoodie: [
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#808080' },
    { name: 'Navy', value: '#000080' },
    { name: 'Burgundy', value: '#800020' },
    { name: 'Forest Green', value: '#228B22' },
    { name: 'Charcoal', value: '#36454F' }
  ],
  polo: [
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
    { name: 'Navy', value: '#000080' },
    { name: 'Burgundy', value: '#800020' },
    { name: 'Forest Green', value: '#228B22' },
    { name: 'Gray', value: '#808080' }
  ]
}

const templatePaths = {
  tshirt: {
    front: '/images/templates/clothing/tshirt-front.png',
    back: '/images/templates/clothing/tshirt-back.png',
    side: '/images/templates/clothing/tshirt-side.png'
  },
  hoodie: {
    front: '/images/templates/clothing/hoodie-front.png',
    back: '/images/templates/clothing/hoodie-back.png',
    side: '/images/templates/clothing/hoodie-side.png'
  },
  polo: {
    front: '/images/templates/clothing/polo-front.png',
    back: '/images/templates/clothing/polo-back.png',
    side: '/images/templates/clothing/polo-side.png'
  }
}

export default function ClothingTemplate({ canvas, type, view }: ClothingTemplateProps) {
  const [selectedColor, setSelectedColor] = useState(clothingColors[type][0].value)
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (canvas) {
      setIsLoading(true)
      // Load the template image
      try {
        fabric.Image.fromURL(
          templatePaths[type][view],
          (img) => {
            canvas.clear()
            img.scaleToWidth(400)
            canvas.add(img)
            canvas.centerObject(img)
            canvas.renderAll()
            setIsLoading(false)
          },
          { crossOrigin: 'anonymous' }
        )
      } catch (err) {
        console.error('Error loading template:', err)
        setImageError(true)
        setIsLoading(false)
      }
    }
  }, [canvas, type, view])

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    if (canvas) {
      const objects = canvas.getObjects()
      const baseObject = objects.find(obj => obj.type === 'image') as fabric.Image | undefined
      if (baseObject) {
        // Apply color overlay
        baseObject.filters = [
          new fabric.Image.filters.BlendColor({
            color: color,
            mode: 'tint',
            alpha: 0.5
          })
        ]
        baseObject.applyFilters()
        canvas.renderAll()
      }
    }
  }

  const handleDesignUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && canvas) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setUploadedDesign(dataUrl)
        fabric.Image.fromURL(dataUrl, (img) => {
          img.scaleToWidth(200)
          canvas.add(img)
          canvas.renderAll()
        })
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (imageError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500">Failed to load template</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
          <ImageLoader
            src={templatePaths[type][view]}
            alt={`${type} ${view} view`}
            fill
            priority
            className="object-contain"
            onError={() => setImageError(true)}
          />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Color Options</h3>
        <div className="grid grid-cols-2 gap-3">
          {clothingColors[type].map((color) => (
            <button
              key={color.value}
              onClick={() => handleColorChange(color.value)}
              className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all ${
                selectedColor === color.value
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-sm font-medium">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Upload Design</h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleDesignUpload}
              className="hidden"
              id="design-upload"
            />
            <label
              htmlFor="design-upload"
              className="cursor-pointer block"
            >
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  Drag and drop your design here, or click to browse
                </span>
              </div>
            </label>
          </div>
          {uploadedDesign && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <ImageLoader
                src={uploadedDesign}
                alt="Uploaded design"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 