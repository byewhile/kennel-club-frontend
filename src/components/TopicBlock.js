import { FaTrash  } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";

export default function TopicBlock({ topic, user_id, isAdmin, topics, setTopics }) {
    const deleteTopic = async (topic_id) => {
        const formData = new FormData();
        formData.append("topic_id", topic_id);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deleteTopic.php`, formData);
            setTopics(topics.filter(topic => topic.id !== topic_id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="rounded-lg shadow-md space-y-2 p-4">
            <div className="flex justify-between text-gray-400 font-medium">
                <Link className="hover:text-black transition" href={`/profile/${topic.user_id}`}>{topic.first_name} {topic.last_name}</Link>

                <div>
                    <span>{topic.date.split("-").reverse().join(".")}</span>
                                    
                    {((user_id == topic.user_id) || isAdmin) && (
                        <button onClick={() => deleteTopic(topic.id)} className="text-red-200 cursor-pointer ml-2 hover:text-red-500 focus:text-red-500 transition">
                            <FaTrash className="text-sm" title="Удалить обсуждение" />
                        </button>   
                    )}
                </div>
            </div>

            <Link className="block text-xl font-semibold" href={`/forum/${topic.id}`}>
                <span>{topic.title}</span>
            </Link>
        </div>
    )
}