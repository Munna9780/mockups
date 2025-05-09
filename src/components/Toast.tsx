import { Fragment, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa'

interface ToastProps {
  show: boolean
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

export default function Toast({
  show,
  message,
  type = 'info',
  duration = 3000,
  onClose
}: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [show, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="h-6 w-6 text-green-400" />
      case 'error':
        return <FaExclamationTriangle className="h-6 w-6 text-red-400" />
      default:
        return <FaInfoCircle className="h-6 w-6 text-blue-400" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50'
      case 'error':
        return 'bg-red-50'
      default:
        return 'bg-blue-50'
    }
  }

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`max-w-sm w-full ${getBackgroundColor()} shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}>
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getIcon()}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    {message}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
} 