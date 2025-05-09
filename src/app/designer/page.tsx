'use client'

import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { useDropzone } from 'react-dropzone'
import { useSearchParams } from 'next/navigation'
import ClothingTemplate from '@/components/ClothingTemplate'
import { FiDownload, FiTrash2, FiRotateCw, FiZoomIn, FiZoomOut } from 'react-icons/fi'

export default function Designer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  const templateType = searchParams.get('type') as 'tshirt' | 'hoodie' | 'polo' | null
  const templateView = searchParams.get('view') as 'front' | 'back' | 'side' | null

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      
      reader.onload = (event) => {
        fabric.Image.fromURL(event.target?.result as string, (img) => {
          img.scaleToWidth(200)
          canvas?.add(img)
          canvas?.renderAll()
        })
      }
      
      reader.readAsDataURL(file)
    }
  })

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true
      })

      fabricCanvas.on('selection:created', (e) => {
        setSelectedObject(e.selected?.[0] || null)
      })

      fabricCanvas.on('selection:updated', (e) => {
        setSelectedObject(e.selected?.[0] || null)
      })

      fabricCanvas.on('selection:cleared', () => {
        setSelectedObject(null)
      })

      setCanvas(fabricCanvas)
      setIsLoading(false)

      return () => {
        fabricCanvas.dispose()
      }
    }
  }, [])

  const handleDelete = () => {
    if (selectedObject && canvas) {
      canvas.remove(selectedObject)
      canvas.renderAll()
      setSelectedObject(null)
    }
  }

  const handleExport = () => {
    if (canvas) {
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1
      })
      const link = document.createElement('a')
      link.download = 'mockup.png'
      link.href = dataUrl
      link.click()
    }
  }

  const handleRotate = () => {
    if (selectedObject && canvas) {
      selectedObject.rotate((selectedObject.angle || 0) + 90)
      canvas.renderAll()
    }
  }

  const handleZoom = (direction: 'in' | 'out') => {
    if (selectedObject && canvas) {
      const scale = direction === 'in' ? 1.1 : 0.9
      selectedObject.scale(selectedObject.scaleX! * scale)
      canvas.renderAll()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex gap-6">
            {/* Canvas */}
            <div className="flex-1">
              <div className="relative">
                <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
                {selectedObject && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={handleRotate}
                      className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                      title="Rotate"
                    >
                      <FiRotateCw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleZoom('in')}
                      className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                      title="Zoom In"
                    >
                      <FiZoomIn className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleZoom('out')}
                      className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                      title="Zoom Out"
                    >
                      <FiZoomOut className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-red-500"
                      title="Delete"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="w-80 space-y-6">
              {templateType && (
                <ClothingTemplate
                  canvas={canvas}
                  type={templateType}
                  view={templateView || 'front'}
                />
              )}

              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Export</h3>
                <button
                  onClick={handleExport}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <FiDownload className="w-5 h-5" />
                  Download Mockup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 