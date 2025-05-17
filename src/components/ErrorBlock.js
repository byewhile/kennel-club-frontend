export default function ErrorBlock({ error }) {
    return (
        <div className="flex justify-center items-center text-center">
            <div className="text-red-500 text-lg font-semibold">{error}</div>
        </div>
    )
}