export default function ErrorBlock({ error }) {
    return (
        <div className="flex justify-center items-center text-center mt-5">
            <div className="text-red-500 text-lg font-bold">{error}</div>
        </div>
    )
}