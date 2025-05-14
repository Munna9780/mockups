import { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';

export default function Designer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
      });
      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, []);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (canvas) {
      canvas.setBackgroundColor(color, () => canvas.renderAll());
    }
  };

  const handleDesignUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        fabric.Image.fromURL(dataUrl, (img) => {
          img.scaleToWidth(200);
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Design Your Mockup</h2>
          <div className="flex gap-6">
            <div className="flex-1">
              <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
            </div>
            <div className="w-80 space-y-6">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Color Options</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['#ffffff', '#000000', '#ff0000', '#000080', '#228B22'].map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? 'border-primary' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Upload Design</h3>
                <input type="file" accept="image/*" onChange={handleDesignUpload} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 