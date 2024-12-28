import React from "react";
import {Matrix} from "../utils/matrixOperations";
import {Fraction} from "../utils/Fraction";

interface MatrixInputProps {
	matrix: Matrix;
	setMatrix: (matrix: Matrix) => void;
	rows: number;
	cols: number;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({
	matrix,
	setMatrix,
	rows,
	cols,
}) => {
	const handleChange = (
		rowIndex: number,
		colIndex: number,
		value: string
	) => {
		const newMatrix = matrix.map((row, i) =>
			row.map((cell, j) => {
				if (i === rowIndex && j === colIndex) {
					const fractionMatch = value.match(
						/^(-?\d+)(?:\/(-?\d+))?$/
					);
					if (fractionMatch) {
						const numerator = parseInt(fractionMatch[1]);
						const denominator = fractionMatch[2]
							? parseInt(fractionMatch[2])
							: 1;
						return new Fraction(numerator, denominator);
					}
					return value;
				}
				return cell;
			})
		);
		setMatrix(newMatrix);
	};

	return (
		<div className="grid gap-2">
			{matrix.map((row, i) => (
				<div key={i} className="flex gap-2">
					{row.map((cell, j) => (
						<input
							key={`${i}-${j}`}
							type="text"
							value={cell.toString()}
							onChange={(e) => handleChange(i, j, e.target.value)}
							placeholder="0"
							className="w-20 h-12 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					))}
				</div>
			))}
		</div>
	);
};
