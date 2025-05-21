export default function ConfirmDeleteDogBlock({ action, setIsShowConfirmBlock }) {
    return (
        <div className="fixed inset-0 z-10 backdrop-blur">
            <div className="min-h-full flex items-center justify-center p-4">
                <div className="bg-white border-2 border-red-400 p-5 rounded-xl font-semibold">
                    <div className="text-lg lg:text-xl text-center">Вы точно хотите <span className="text-red-400">удалить</span> этого друга?</div>
                    <div className="flex justify-evenly mt-5">
                        <button className="cursor-pointer text-red-400" onClick={action}>Удалить</button>
                        <button className="cursor-pointer text-green" onClick={() => setIsShowConfirmBlock(false)}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    )
}