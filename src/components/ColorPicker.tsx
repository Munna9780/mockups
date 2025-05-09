interface ColorOption {
  name: string
  value: string
}

interface ColorPickerProps {
  colors: ColorOption[]
  selectedColor: string
  onChange: (color: string) => void
}

export default function ColorPicker({ colors, selectedColor, onChange }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => onChange(color.value)}
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
  )
} 