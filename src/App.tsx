import React, {useState} from "react";
import {Calculator} from "lucide-react";
import {MatrixInput} from "./components/MatrixInput";
import {MatrixDisplay} from "./components/MatrixDisplay";
import {FontSizeControl} from "./components/FontSizeControl";
import {
	Matrix,
	createEmptyMatrix,
	gaussianElimination,
} from "./utils/matrixOperations";

function App() {
	const [rows, setRows] = useState(3);
	const [cols, setCols] = useState(3);
	const [matrix, setMatrix] = useState<Matrix>(() =>
		createEmptyMatrix(rows, cols)
	);
	const [reduction, setReduction] = useState<{
		steps: Matrix[];
		descriptions: string[];
	} | null>(null);
	const [fontSize, setFontSize] = useState(1);

	const handleDimensionChange = (newRows: number, newCols: number) => {
		setRows(newRows);
		setCols(newCols);
		setMatrix(createEmptyMatrix(newRows, newCols));
		setReduction(null);
	};

	const handleReduce = () => {
		console.log(matrix);
		const result = gaussianElimination(matrix);
		setReduction(result);
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-4xl mx-auto px-4">
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-2 mb-4">
						<Calculator className="w-8 h-8 text-blue-600" />
						<h1 className="text-3xl font-bold text-gray-800">
							Matrix Reduction Calculator
						</h1>
					</div>
					<p className="text-gray-600">
						Enter a matrix and see the step-by-step reduction
						process
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6 mb-8">
					<div className="flex gap-4 mb-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Rows
							</label>
							<input
								type="number"
								min="1"
								max="10"
								value={rows}
								onChange={(e) =>
									handleDimensionChange(
										Number(e.target.value),
										cols
									)
								}
								className="w-20 h-10 border rounded px-2"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Columns
							</label>
							<input
								type="number"
								min="1"
								max="10"
								value={cols}
								onChange={(e) =>
									handleDimensionChange(
										rows,
										Number(e.target.value)
									)
								}
								className="w-20 h-10 border rounded px-2"
							/>
						</div>
					</div>

					<div className="mb-6">
						<h2 className="text-lg font-semibold mb-4">
							Input Matrix
						</h2>
						<MatrixInput
							matrix={matrix}
							setMatrix={setMatrix}
							rows={rows}
							cols={cols}
						/>
					</div>

					<button
						onClick={handleReduce}
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
						Reduce Matrix
					</button>
				</div>

				{reduction && (
					<div className="bg-white rounded-lg shadow-md p-6">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-semibold">
								Reduction Steps
							</h2>
							<FontSizeControl
								fontSize={fontSize}
								setFontSize={setFontSize}
							/>
						</div>
						<div className="space-y-8">
							{reduction.steps.map((step, index) => (
								<MatrixDisplay
									key={index}
									matrix={step}
									description={reduction.descriptions[index]}
									fontSize={fontSize}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
