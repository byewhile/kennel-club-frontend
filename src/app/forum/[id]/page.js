"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaTrash  } from "react-icons/fa6";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBlock from "@/components/ErrorBlock";
import Link from "next/link";
import MessageBlock from "@/components/MessageBlock";

export default function TopicPage() {
    const [userId, setUserId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [topic, setTopic] = useState(null);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const { id } = useParams();

    const handleBack = () => {
        router.back();
    }

    const deleteTopic = async (topic_id) => {
        const formData = new FormData();
        formData.append("topic_id", topic_id);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deleteTopic.php`, formData);
            handleBack();
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("msg_text", newMessage);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addMessage.php?id=${id}`, formData, {
                withCredentials: true
            });
            setNewMessage("");
            getMessages();
        } catch (err) {
            setError("Не удалось подключиться к серверу!");
        }
    }

    const getMessages = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getMessages.php?id=${id}`);
            const data = res.data;
            setMessages(data);
        } catch (err) {
            setError("Не удалось подключиться к серверу!");
        } finally {
            setIsLoading(false);
        }
    }

    const getTopic = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getTopics.php?id=${id}`);
            const data = res.data[0];

            if (data == null) {
                router.push("/forum");
            } else {
                setTopic(data);
                getMessages(); 
            }
        } catch (err) {
            setError("Не удалось подключиться к серверу!");
        }
    }

    const checkAuth = async () => {
        try {
            let res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkSession.php`, {
                withCredentials: true
            });
            const data = res.data;

            setUserId(data.user_id);
            setAuthenticated(data.authenticated);
            
            res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkAdmin.php?id=${data.user_id}`, {
                withCredentials: true
            });
            const isAdmin = res.data;

            setIsAdmin(isAdmin);
            getTopic();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <main className="container mx-auto px-6 lg:px-12 py-10">
            <button onClick={handleBack} className="text-green bg-lime rounded-lg p-3 font-medium cursor-pointer"><FaArrowLeft /></button>

            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorBlock error={error} />
            ) : (
                <div className="space-y-2 mt-4 gap-5">
                    <div className="p-4 space-y-2">
                        <div className="flex justify-between text-gray-400 font-medium">
                            <Link className="hover:text-black transition" href={`/profile/${topic.user_id}`}>{topic.first_name} {topic.last_name}</Link>

                            <div>
                                <span>{topic.date.split("-").reverse().join(".")}</span>

                                {((userId == topic.user_id) || isAdmin) && (
                                    <button onClick={() => deleteTopic(topic.id)} className="text-red-200 cursor-pointer ml-2 hover:text-red-500 focus:text-red-500 transition">
                                        <FaTrash className="text-sm" title="Удалить обсуждение" />
                                    </button>   
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-2xl font-semibold">{topic.title}</span>
                            <span className="text-lg">{topic.topic_text}</span>
                        </div>
                    </div>

                    {messages.map((message) => (
                        <MessageBlock key={message.id} message={message} user_id={userId} isAdmin={isAdmin} messages={messages} setMessages={setMessages} />
                    ))}

                    {authenticated ? (
                        <form onSubmit={handleSubmit} className="rounded-lg shadow-md space-y-2 p-4">
                            <textarea
                                className="text-lg w-full p-3 rounded-lg h-32 outline-none focus:bg-gray-50 transition resize-none"
                                placeholder="Ваше сообщение..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                required
                            />

                            <div className="flex justify-end">
                                <button type="submit" className="bg-white text-green hover:bg-green hover:text-white border-green border-2 font-semibold cursor-pointer py-2 px-4 rounded-lg transition">
                                    Отправить сообщение
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-lg text-center border-green border-2 border-dashed p-5">
                            <Link href="/auth" className="text-green">Войдите/зарегистрируйтесь</Link> для возможности отправить сообщение
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}