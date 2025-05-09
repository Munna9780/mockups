interface ViewSelectorProps {
  view: 'front' | 'back' | 'side'
  onChange: (view: 'front' | 'back' | 'side') => void
}

export default function ViewSelector({ view, onChange }: ViewSelectorProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onChange('front')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          view === 'front'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Front
      </button>
      <button
        onClick={() => onChange('back')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          view === 'back'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Back
      </button>
      <button
        onClick={() => onChange('side')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          view === 'side'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Side
      </button>
    </div>
  )
} 