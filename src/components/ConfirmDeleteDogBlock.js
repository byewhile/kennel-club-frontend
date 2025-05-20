export default function ConfirmBlock({ action, setIsShowConfirmBlock }) {
    return (
        <div className="h-full w-full top-0 left-0 absolute z-100 backdrop-blur">
            <div className="h-full flex items-center justify-center">
                <div className="bg-white border-2 border-red-400 p-5 rounded-xl font-semibold">
                    <div className="text-lg lg:text-xl">Вы точно хотите <span className="text-red-400">удалить</span> этого друга?</div>
                    <div className="flex justify-evenly mt-5">
                        <button className="cursor-pointer text-red-400" onClick={action}>Удалить</button>
                        <button className="cursor-pointer text-green" onClick={() => setIsShowConfirmBlock(prev => !prev)}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    )
}