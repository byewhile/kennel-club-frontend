const ACTION_CONFIG = {
    delete: {
        doText: "удалить",
        color: "red-400",
        who: {
            users: "пользователя",
            friends: "друга"
        }
    },
    make_admin: {
        doText: "сделать администратором",
        color: "yellow-400",
        who: {
            users: "пользователя"
        }
    }
}

export default function ConfirmBlock({ actionType, entityType, action, setIsShowConfirmBlock }) {
    const config = ACTION_CONFIG[actionType];
    const who = config.who[entityType];

    return (
        <div className="fixed inset-0 z-10 backdrop-blur">
            <div className="min-h-full flex items-center justify-center p-4">
                <div className={`bg-white border-2 border-${config.color} p-5 rounded-xl font-semibold`}>
                    <div className="text-lg lg:text-xl text-center">Вы точно хотите <span className={`text-${config.color}`}>{config.doText}</span> этого {who}</div>
                    <div className="flex justify-evenly mt-5">
                        <button className={`cursor-pointer text-${config.color}`} onClick={action}>{config.doText.charAt(0).toUpperCase() + config.doText.slice(1)}</button>
                        <button className="cursor-pointer text-green" onClick={() => setIsShowConfirmBlock(false)}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    )
}