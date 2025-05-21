export default function ConfirmBlock({ actionType, entityType, action, setIsShowConfirmBlock }) {
    const ACTION_CONFIG = {
        delete: {
            doText: "удалить",
            border_color: "border-red-400",
            text_color: "text-red-400",
            who: {
                users: "пользователя",
                dogs: "друга"
            }
        },
        make_admin: {
            doText: "сделать администратором",
            border_color: "border-yellow-400",
            text_color: "text-yellow-400",
            who: {
                users: "пользователя"
            }
        }
    }

    const config = ACTION_CONFIG[actionType];
    const who = config.who[entityType];

    return (
        <div className="fixed inset-0 z-10 backdrop-blur">
            <div className="min-h-full flex items-center justify-center p-4">
                <div className={`bg-white border-2 ${config.border_color} p-5 rounded-xl font-semibold`}>
                    <div className="text-lg lg:text-xl text-center">Вы точно хотите <span className={`${config.text_color}`}>{config.doText}</span> этого {who}</div>
                    <div className="flex justify-evenly mt-5">
                        <button className={`cursor-pointer ${config.text_color}`} onClick={action}>{config.doText.charAt(0).toUpperCase() + config.doText.slice(1)}</button>
                        <button className="cursor-pointer text-green" onClick={() => setIsShowConfirmBlock(false)}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    )
}