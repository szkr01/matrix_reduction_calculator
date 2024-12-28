import {Fraction} from './Fraction';
export type Matrix=Fraction[][];

export const createEmptyMatrix=(rows: number,cols: number): Matrix => {
	return Array(rows).fill(0).map(() =>
		Array(cols).fill(0).map(() => new Fraction(0))
	);
};

export const cloneMatrix=(matrix: Matrix): Matrix => {
	return matrix.map(row =>
		row.map(cell => new Fraction(cell.numerator,cell.denominator))
	);
};

export const swapRows=(matrix: Matrix,row1: number,row2: number): Matrix => {
	const newMatrix=cloneMatrix(matrix);
	[newMatrix[row1],newMatrix[row2]]=[newMatrix[row2],newMatrix[row1]];
	return newMatrix;
};

export const multiplyRow=(matrix: Matrix,row: number,scalar: Fraction): Matrix => {
	const newMatrix=cloneMatrix(matrix);
	newMatrix[row]=newMatrix[row].map(value => value.multiply(scalar));
	return newMatrix;
};

export const addMultipleOfRow=(
	matrix: Matrix,
	targetRow: number,
	sourceRow: number,
	scalar: Fraction
): Matrix => {
	const newMatrix=cloneMatrix(matrix);
	newMatrix[targetRow]=newMatrix[targetRow].map(
		(value,col) => value.add(matrix[sourceRow][col].multiply(scalar))
	);
	return newMatrix;
};

export const MatrixCheck=(matrix: Matrix): boolean => {
	let flag=true
	matrix.map((row) => row.map((cell) => {
		if (!(cell instanceof Fraction))flag = false;
	}));
	return flag;
};

export const gaussianElimination=(matrix: Matrix): {steps: Matrix[],descriptions: string[]} => {
	if(!MatrixCheck(matrix))return {steps: [matrix], descriptions: ["Invalid matrix"]};

	const steps: Matrix[]=[cloneMatrix(matrix)];
	const descriptions: string[]=['Initial matrix'];
	const rows=matrix.length;
	const cols=matrix[0].length;
	let currentMatrix=cloneMatrix(matrix);

	for(let pivot=0;pivot<Math.min(rows,cols);pivot++) {
		// Find the pivot element
		let maxRow=pivot;
		for(let i=pivot+1;i<rows;i++) {
			if(currentMatrix[i][pivot].abs().numerator*currentMatrix[maxRow][pivot].denominator>
				currentMatrix[maxRow][pivot].abs().numerator*currentMatrix[i][pivot].denominator) {
				maxRow=i;
			}
		}

		// Swap rows if necessary
		if(maxRow!==pivot) {
			currentMatrix=swapRows(currentMatrix,pivot,maxRow);
			steps.push(cloneMatrix(currentMatrix));
			descriptions.push(`Swap rows ${pivot+1} and ${maxRow+1}`);
		}

		// Make pivot element 1
		if(currentMatrix[pivot][pivot].numerator!==0) {
			const scalar=new Fraction(
				currentMatrix[pivot][pivot].denominator,
				currentMatrix[pivot][pivot].numerator
			);
			if(scalar.numerator!==scalar.denominator) {
				currentMatrix=multiplyRow(currentMatrix,pivot,scalar);
				steps.push(cloneMatrix(currentMatrix));
				descriptions.push(`Multiply row ${pivot+1} by ${scalar.toString()}`);
			}

			// Eliminate column entries
			for(let i=0;i<rows;i++) {
				if(i!==pivot&&currentMatrix[i][pivot].numerator!==0) {
					const scalar=currentMatrix[i][pivot].negate();
					currentMatrix=addMultipleOfRow(currentMatrix,i,pivot,scalar);
					steps.push(cloneMatrix(currentMatrix));
					descriptions.push(
						`Add ${scalar.toString()} times row ${pivot+1} to row ${i+1}`
					);
				}
			}
		}
	}

	return {steps,descriptions};
};