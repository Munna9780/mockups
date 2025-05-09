import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FaUpload } from 'react-icons/fa'

interface DesignUploadProps {
  onUpload: (file: File) => void
  preview?: string
}

export default function DesignUpload({ onUpload, preview }: DesignUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0])
    }
  }, [onUpload])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false)
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <FaUpload className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-600">
            Drag and drop your design here, or click to browse
          </span>
          <span className="text-xs text-gray-500">
            Supports PNG, JPG, JPEG, and SVG
          </span>
        </div>
      </div>

      {preview && (
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={preview}
            alt="Design preview"
            fill
            className="object-contain"
          />
        </div>
      )}
    </div>
  )
} 