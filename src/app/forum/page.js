"use client"

import ErrorBlock from "@/components/ErrorBlock";
import LoadingSpinner from "@/components/LoadingSpinner";
import NothingBlock from "@/components/NothingBlock";
import TopicBlock from "@/components/TopicBlock";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react"
import { MdForum } from "react-icons/md";

export default function ForumPage() {
    const [userId, setUserId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState({
        title: "",
        text: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", newTopic.title);
        formData.append("text", newTopic.text);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addTopic.php`, formData, {
                withCredentials: true
            });
            setIsOpenForm(false);
            setNewTopic({title: "", text: ""});
            getTopics();
        } catch (err) {
            setIsLoading(false);
            setError("Не удалось подключиться к серверу!");
        }
    }

    const getTopics = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getTopics.php`);
            const data = res.data;
            setTopics(data);
        } catch (err) {
            setError("Не удалось подключиться к серверу!");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
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
                getTopics();
            } catch (err) {
                setIsLoading(false);
                setError("Не удалось подключиться к серверу!");
            }
        }
        checkAuth();
    }, []);
    
    return (
        <main className="container mx-auto px-6 lg:px-12 py-10">
            <h2 className="flex gap-2 items-center text-xl lg:text-2xl text-green font-bold"><MdForum /> Форум</h2>

            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorBlock error={error} />
            ) : (
                <div className="my-4 space-y-4">
                    {isOpenForm ? (
                        <form onSubmit={handleSubmit} className="rounded-lg shadow-md space-y-2 p-4">
                            <input 
                                type="text"
                                placeholder="Тема обсуждения"
                                className="text-xl lg:text-3xl w-full p-3 rounded-lg text-green font-bold outline-none focus:bg-gray-50 transition"
                                value={newTopic.title}
                                onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                                required
                            />

                            <textarea 
                                className="text-xl w-full p-3 rounded-lg h-32 outline-none focus:bg-gray-50 transition resize-none"
                                placeholder="Текст обсуждения"
                                value={newTopic.text}
                                onChange={(e) => setNewTopic({...newTopic, text: e.target.value})}
                                required
                            />

                            <div className="flex justify-end">
                                <button type="submit" className="bg-white text-green hover:bg-green hover:text-white border-green border-2 font-semibold cursor-pointer py-2 px-4 rounded-lg transition">
                                    Создать обсуждение
                                </button>
                            </div>
                        </form>
                    ) : authenticated ? (
                        <button onClick={() => setIsOpenForm(!isOpenForm)} className="w-full bg-white text-green hover:bg-green hover:text-white border-green border-2 border-dashed font-semibold cursor-pointer p-5 rounded-lg transition">
                            Создать обсуждение
                        </button>
                    ) : (
                        <div className="text-lg text-center border-green border-2 border-dashed p-5">
                            <Link href="/auth" className="text-green">Войдите/зарегистрируйтесь</Link> для возможности создавать новые обсуждения
                        </div>
                    )}

                    {topics.length === 0 ? (
                        <NothingBlock />
                    ) : (
                        <>
                            {topics.map((topic) => (
                                <TopicBlock key={topic.id} topic={topic} user_id={userId} isAdmin={isAdmin} topics={topics} setTopics={setTopics} />
                            ))}
                        </>
                    )}
                </div>
            )}
        </main>
    )
}