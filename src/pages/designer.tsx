import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import ClothingTemplate from '@/components/ClothingTemplate'
import ColorPicker from '@/components/ColorPicker'
import DesignUpload from '@/components/DesignUpload'
import DesignerLoading from '@/components/DesignerLoading'
import ViewSelector from '@/components/ViewSelector'
import ConfirmationDialog from '@/components/ConfirmationDialog'
import Toast from '@/components/Toast'
import { FaUpload, FaPalette, FaDownload, FaEye } from 'react-icons/fa'
import { fabric } from 'fabric'

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

export default function Designer() {
  const router = useRouter()
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [selectedView, setSelectedView] = useState<'front' | 'back' | 'side'>('front')
  const [uploadedDesign, setUploadedDesign] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationConfig, setConfirmationConfig] = useState<{
    title: string
    message: string
    onConfirm: () => void
    type?: 'warning' | 'danger' | 'info'
  } | null>(null)
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({
    show: false,
    message: '',
    type: 'info'
  })

  useEffect(() => {
    if (router.query.template) {
      const template = router.query.template as string
      setSelectedTemplate(template)
      
      try {
        // Initialize canvas
        const canvas = new fabric.Canvas('design-canvas', {
          width: 400,
          height: 500,
          backgroundColor: '#ffffff'
        })
        canvasRef.current = canvas
      } catch (err) {
        console.error('Failed to initialize the designer. Please try refreshing the page.')
      } finally {
        setIsLoading(false)
      }

      return () => {
        if (canvasRef.current) {
          canvasRef.current.dispose()
        }
      }
    }
  }, [router.query])

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      show: true,
      message,
      type
    })
  }

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, show: false }))
  }

  const handleDesignUpload = (file: File) => {
    if (uploadedDesign) {
      setConfirmationConfig({
        title: 'Replace Design',
        message: 'Are you sure you want to replace your current design? This action cannot be undone.',
        type: 'warning',
        onConfirm: () => {
          try {
            setUploadedDesign(file)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
            showToast('Design uploaded successfully!', 'success')
            setShowConfirmation(false)
          } catch (err) {
            showToast('Failed to upload design. Please try again with a different file.', 'error')
          }
        }
      })
      setShowConfirmation(true)
    } else {
      try {
        setUploadedDesign(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        showToast('Design uploaded successfully!', 'success')
      } catch (err) {
        showToast('Failed to upload design. Please try again with a different file.', 'error')
      }
    }
  }

  const handleColorChange = (color: string) => {
    try {
      setSelectedColor(color)
      showToast('Color updated successfully!', 'success')
    } catch (err) {
      showToast('Failed to change color. Please try again.', 'error')
    }
  }

  const handleViewChange = (view: 'front' | 'back' | 'side') => {
    try {
      setSelectedView(view)
      showToast('View changed successfully!', 'success')
    } catch (err) {
      showToast('Failed to change view. Please try again.', 'error')
    }
  }

  const handleDownload = () => {
    setConfirmationConfig({
      title: 'Download Mockup',
      message: 'Are you sure you want to download this mockup? Make sure all your changes are saved.',
      type: 'info',
      onConfirm: () => {
        try {
          if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL({
              format: 'png',
              quality: 1
            })
            const link = document.createElement('a')
            link.download = 'mockup.png'
            link.href = dataUrl
            link.click()
            showToast('Mockup downloaded successfully!', 'success')
            setShowConfirmation(false)
          }
        } catch (err) {
          showToast('Failed to download mockup. Please try again.', 'error')
        }
      }
    })
    setShowConfirmation(true)
  }

  const handleRetry = () => {
    setConfirmationConfig({
      title: 'Reload Designer',
      message: 'Are you sure you want to reload the designer? All unsaved changes will be lost.',
      type: 'danger',
      onConfirm: () => {
        router.reload()
      }
    })
    setShowConfirmation(true)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setConfirmationConfig(null)
  }

  const getTemplateType = (template: string) => {
    if (template.startsWith('tshirt')) return 'tshirt'
    if (template.startsWith('hoodie')) return 'hoodie'
    if (template.startsWith('polo')) return 'polo'
    return 'tshirt'
  }

  if (isLoading) {
    return (
      <Layout>
        <DesignerLoading />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Design Your Mockup
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Customize your clothing mockup with colors and designs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="aspect-[3/4] relative">
                {selectedTemplate ? (
                  <>
                    <canvas id="design-canvas" className="w-full h-full" />
                    <ClothingTemplate
                      canvas={canvasRef.current}
                      type={getTemplateType(selectedTemplate)}
                      view={selectedView}
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Select a template to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls section */}
          <div className="space-y-6">
            {/* View selector */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                <FaEye className="inline-block mr-2" />
                View Options
              </h2>
              <ViewSelector
                view={selectedView}
                onChange={handleViewChange}
              />
            </div>

            {/* Design upload */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                <FaUpload className="inline-block mr-2" />
                Upload Design
              </h2>
              <DesignUpload
                onUpload={handleDesignUpload}
                preview={previewUrl}
              />
            </div>

            {/* Color customization */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                <FaPalette className="inline-block mr-2" />
                Customize Colors
              </h2>
              {selectedTemplate && (
                <ColorPicker
                  colors={clothingColors[getTemplateType(selectedTemplate)]}
                  selectedColor={selectedColor}
                  onChange={handleColorChange}
                />
              )}
            </div>

            {/* Download section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                <FaDownload className="inline-block mr-2" />
                Download
              </h2>
              <button
                onClick={handleDownload}
                disabled={!selectedTemplate}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download Mockup
              </button>
            </div>
          </div>
        </div>

        {confirmationConfig && (
          <ConfirmationDialog
            isOpen={showConfirmation}
            onClose={handleCloseConfirmation}
            onConfirm={confirmationConfig.onConfirm}
            title={confirmationConfig.title}
            message={confirmationConfig.message}
            type={confirmationConfig.type}
          />
        )}

        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      </div>
    </Layout>
  )
} 