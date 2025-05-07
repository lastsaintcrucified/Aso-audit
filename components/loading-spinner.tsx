export function LoadingSpinner({ className = "" }: { className?: string }) {
	return (
		<div className={`flex justify-center ${className}`}>
			<div
				className='animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full'
				aria-label='Loading'
			/>
		</div>
	);
}
