export default function DesignerLoading() {
  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Loading designer...</p>
      </div>
    </div>
  )
} 