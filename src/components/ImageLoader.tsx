import { useState } from 'react'
import Image from 'next/image'
import { FaImage, FaExclamationTriangle } from 'react-icons/fa'

interface ImageLoaderProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function ImageLoader({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  priority = false,
  onLoad,
  onError
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  if (hasError) {
    return (
      <div className={`relative flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center">
          <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Failed to load image</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <FaImage className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
            <p className="mt-2 text-sm text-gray-500">Loading image...</p>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
} 