import { FaTrash  } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";

export default function MessageBlock({ message, user_id, isAdmin, messages, setMessages }) {
    const deleteMessage = async (message_id) => {
        const formData = new FormData();
        formData.append("message_id", message_id);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deleteMessage.php`, formData);
            setMessages(messages.filter(message => message.id !== message_id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="rounded-lg shadow-md space-y-2 p-4">
            <div className="flex justify-between items-center text-gray-400 font-medium">
                <Link className="hover:text-black focus:text-black transition" href={`/profile/${message.user_id}`}>{message.first_name} {message.last_name}</Link>

                <div>
                    <span>{message.date.split("-").reverse().join(".")}</span>
                    
                    {((user_id == message.user_id) || isAdmin) && (
                        <button onClick={() => deleteMessage(message.id)} className="text-red-200 cursor-pointer ml-2 hover:text-red-500 focus:text-red-500 transition">
                            <FaTrash className="text-sm" title="Удалить сообщение" />
                        </button>   
                    )}
                </div>
            </div>
            
            <span className="text-lg">{message.msg_text}</span>
        </div>
    )
}