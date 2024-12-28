import React from 'react';

interface SpacingControlProps {
	spacing: {
		horizontal: number;
		vertical: number;
	};
	setSpacing: (spacing: {horizontal: number; vertical: number}) => void;
}

export const SpacingControl: React.FC<SpacingControlProps>=({spacing,setSpacing}) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-4">
				<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
					Horizontal
				</label>
				<div className="relative w-24 h-6 flex items-center">
					<input
						type="range"
						min="1"
						max="4"
						step="0.5"
						value={spacing.horizontal}
						onChange={(e) => setSpacing(prev => ({
							...prev,
							horizontal: parseFloat(e.target.value)
						}))}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                     accent-blue-600 dark:bg-gray-700 dark:accent-blue-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					/>
				</div>
				<span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3ch]">
					{spacing.horizontal.toFixed(1)}x
				</span>
			</div>
			<div className="flex items-center gap-4">
				<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
					Vertical
				</label>
				<div className="relative w-24 h-6 flex items-center">
					<input
						type="range"
						min="0.5"
						max="3"
						step="0.5"
						value={spacing.vertical}
						onChange={(e) => setSpacing((prev: any) => ({...prev,vertical: parseFloat(e.target.value)}))}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                     accent-blue-600 dark:bg-gray-700 dark:accent-blue-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					/>
				</div>
				<span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3ch]">
					{spacing.vertical.toFixed(1)}x
				</span>
			</div>
		</div>
	);
};