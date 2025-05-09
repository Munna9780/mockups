import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export default class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <FaExclamationTriangle className="mx-auto h-12 w-12 text-red-500" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
              </p>
              {this.state.error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm font-mono text-red-800">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}
              <div className="mt-6">
                <button
                  onClick={this.handleReload}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Refresh Page
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                If the problem persists, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 