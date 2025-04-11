export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-100">
            <div className="animate-spin rounded-full h-15 w-15 border-t-3 border-green" />
        </div>
    )
}