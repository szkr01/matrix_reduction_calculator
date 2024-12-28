import React from 'react';

interface FontSizeControlProps {
  fontSize: number;
  setFontSize: (size: number) => void;
}

export const FontSizeControl: React.FC<FontSizeControlProps> = ({ fontSize, setFontSize }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <label className="text-sm font-medium text-gray-700">
        Font Size:
      </label>
      <input
        type="range"
        min="0.8"
        max="2"
        step="0.1"
        value={fontSize}
        onChange={(e) => setFontSize(parseFloat(e.target.value))}
        className="w-32"
      />
      <span className="text-sm text-gray-600">{fontSize.toFixed(1)}x</span>
    </div>
  );
};