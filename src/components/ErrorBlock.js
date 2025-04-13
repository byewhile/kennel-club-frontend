export default function ErrorBlock({ error }) {
    return (
        <div className="flex justify-center items-center">
            <div className="text-red-500 text-lg font-bold">{error}</div>
        </div>
    )
}