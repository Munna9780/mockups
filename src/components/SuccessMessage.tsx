import { FaCheckCircle } from 'react-icons/fa'

interface SuccessMessageProps {
  title?: string
  message: string
  onDismiss?: () => void
}

export default function SuccessMessage({ title = 'Success', message, onDismiss }: SuccessMessageProps) {
  return (
    <div className="rounded-lg bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <FaCheckCircle className="h-5 w-5 text-green-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{title}</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>{message}</p>
          </div>
          {onDismiss && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 