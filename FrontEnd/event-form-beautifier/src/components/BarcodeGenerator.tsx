
import React, { useEffect, useRef } from 'react';

interface BarcodeGeneratorProps {
  value: string;
}

const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({ value }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      generateBarcode(value);
    }
  }, [value]);

  const generateBarcode = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple barcode generation using Code 128 pattern
    const barWidth = 3;
    const barHeight = 80;
    const spacing = 2;
    
    canvas.width = (code.length * (barWidth + spacing)) + 40;
    canvas.height = barHeight + 40;
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    ctx.fillStyle = '#000000';
    let x = 20;
    
    for (let i = 0; i < code.length; i++) {
      const digit = parseInt(code[i]);
      const height = barHeight - (digit * 8); // Vary height based on digit
      
      ctx.fillRect(x, 20, barWidth, height);
      x += barWidth + spacing;
    }
    
    // Draw the code below the barcode
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(code, canvas.width / 2, canvas.height - 10);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <canvas 
        ref={canvasRef}
        className="border border-gray-300 rounded"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default BarcodeGenerator;
