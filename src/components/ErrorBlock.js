export default function ErrorBlock({ error }) {
    return (
        <div className="flex justify-center items-center h-100">
            <div className="text-red-500 text-xl font-bold">{error}</div>
        </div>
    )
}