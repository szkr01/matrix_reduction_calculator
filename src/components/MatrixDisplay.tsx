import React from 'react';
import { Matrix } from '../utils/matrixOperations';
import { InlineMath } from 'react-katex';
import { formatRowOperation, formatFraction } from '../utils/texFormatter';
import 'katex/dist/katex.min.css';

interface MatrixDisplayProps {
  matrix: Matrix;
  description?: string;
  fontSize?: number;
}

export const MatrixDisplay: React.FC<MatrixDisplayProps> = ({ 
  matrix, 
  description,
  fontSize = 1 
}) => {
  const matrixTeX = `\\begin{pmatrix}
    ${matrix.map(row => 
      row.map(cell => formatFraction(cell)).join(' & ')
    ).join(' \\\\ ')}
  \\end{pmatrix}`;

  const style = {
    fontSize: `${fontSize}em`
  };

  return (
    <div className="flex flex-col items-center mb-8">
      {description && (
        <p className="text-gray-600 mb-2" style={style}>
          <InlineMath math={formatRowOperation(description)} />
        </p>
      )}
      <div className="border-l-2 border-r-2 border-gray-400 px-8 py-4" style={style}>
        <InlineMath math={matrixTeX} />
      </div>
    </div>
  );
};