import {Fraction} from "./Fraction";

export const formatRowOperation=(operation: string): string => {
	if(operation==="Initial matrix") {
		return "";
	}

	const swapMatch=operation.match(/Swap rows (\d+) and (\d+)/);
	if(swapMatch) {
		const [_,row1,row2]=swapMatch;
		return `[${row1}] \\leftrightarrow [${row2}]`;
	}

	const multiplyMatch=operation.match(
		/Multiply row (\d+) by (-?\d+)(?:\/(-?\d+))?/
	);
	if(multiplyMatch) {
		const [_,row,numerator,denominator]=multiplyMatch;
		const fraction=format_ndumerator(numerator,denominator);
		return `[${row}] := ${fraction}[${row}]`;
	}

	const addMatch=operation.match(
		/Add (-?\d+)(?:\/(-?\d+))? times row (\d+) to row (\d+)/
	);
	if(addMatch) {
		const [_,numerator,denominator,sourceRow,targetRow]=addMatch;
		const fraction=format_ndumerator(numerator,denominator);
		return `[${targetRow}] := [${targetRow}] + (${fraction})[${sourceRow}]`;
	}

	return operation;
};

export const format_ndumerator=(
	numerator: string,
	denominator: string
): string => {
	const n: number=parseInt(numerator);
	const d: number=parseInt(denominator);

	if ((d === 1) || denominator === undefined) {
		return numerator;
	}
	if(n<0) {
		return `-\\frac{${-n}}{${d}}`;
	}
	return `\\frac{${n}}{${d}}`;
};

export const formatFraction=(fraction: Fraction): string => {
	if(fraction.denominator===1) {
		return fraction.numerator.toString();
	}
	if(fraction.numerator<0) {
		return `-\\frac{${-fraction.numerator}}{${fraction.denominator}}`;
	}
	return `\\frac{${fraction.numerator}}{${fraction.denominator}}`;
};
