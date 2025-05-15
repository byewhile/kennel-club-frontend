import Link from "next/link";
import { FaUser, FaCrown, FaTrash  } from "react-icons/fa6";

export default function UserBlock({ user, handleUserAction }) {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 shadow rounded p-5">
            <div className="flex-1 w-full lg:w-auto">
                <div className="text-gray-500">ID</div>
                <div>{user.id}</div>
            </div>
                                    
            <div className="flex-2 w-full lg:w-auto">
                <div className="text-gray-500">Имя и фамилия</div>
                <div>{user.first_name} {user.last_name}</div>
            </div>
                                
            <div className="flex-2 w-full lg:w-auto">
                <div className="text-gray-500">Email</div>
                <div className="text-green underline"><a href={`mailto:${user.email}`}>{user.email}</a></div>
            </div>

            <div className="flex-2 w-full lg:w-auto">
                <div className="text-gray-500">Роль</div>
                <div>{user.role == "admin" ? "Администратор" : "Пользователь"}</div>
            </div>
                                
            <div className="flex lg:justify-end w-full lg:w-32">
                <div className="flex mt-3 font-medium">
                    <Link href={`/profile/${user.id}`} className="hover:text-green focus:text-green text-gray-300 p-2 rounded cursor-pointer transition" title="Перейти в профиль">
                        <FaUser />
                    </Link>

                    {user.role !== "admin" && (
                        <>
                            <button onClick={() => handleUserAction(user.id, "make_admin")} className="hover:text-yellow-400 focus:text-yellow-400 text-gray-300 p-2 rounded cursor-pointer transition" title="Сделать администратором">
                                <FaCrown />
                            </button>

                            <button onClick={() => handleUserAction(user.id, "delete")} className="hover:text-red-500 focus:text-red-500 text-gray-300 p-2 rounded cursor-pointer transition" title="Удалить пользователя">
                                <FaTrash />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}