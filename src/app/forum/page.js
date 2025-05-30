"use client"

import ErrorBlock from "@/components/ErrorBlock";
import LoadingSpinner from "@/components/LoadingSpinner";
import NothingBlock from "@/components/NothingBlock";
import TopicBlock from "@/components/TopicBlock";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { MdForum } from "react-icons/md";

export default function ForumPage() {
    const [userId, setUserId] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState({
        title: "",
        text: ""
    });
    const limit = 300;

    const editor = useEditor({
        extensions: [
            StarterKit, 
            Underline,
            Placeholder.configure({
                placeholder: "Текст обсуждения",
                emptyEditorClass: "is-editor-empty"
            }),
            CharacterCount.configure({
                limit,
            }),
        ],
        content: newTopic.text,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setNewTopic({...newTopic, text: html});
        },
        editorProps: {
            attributes: {
                class: "h-full outline-none p-3 border-none overflow-y-auto focus:bg-gray-50 transition",
            },
        },
    });

    const isContentEmpty = () => {
        if (!editor) return true;
        return editor.isEmpty || !editor.getText().trim() || !newTopic.title.trim();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEmpty = isContentEmpty();

        if (!isEmpty) {
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
                setError("Не удалось подключиться к серверу!");
            }
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
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkSession.php`, {
                    withCredentials: true
                });
                const data = res.data;

                setUserId(data.user_id);
                setIsLogin(data.isLogin);
                setIsAdmin(data.isAdmin);
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
                                maxLength={64}
                                onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                                required
                            />

                            <div className="text-xl rounded-lg h-48 outline-none overflow-hidden">
                                <EditorContent
                                    editor={editor}
                                    data-placeholder="Текст обсуждения"
                                    maxLength={20}
                                    className="h-full"
                                />
                            </div>

                            <div className="flex gap-2 px-3">
                                <button
                                    type="button"
                                    onClick={() => editor?.chain().focus().toggleBold().run()}
                                    className={`p-2 w-10 rounded-xl cursor-pointer border ${editor?.isActive("bold") ? "border-black" : "border-white"}`}
                                    title="Жирный"
                                >
                                    <strong>Ж</strong>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                                    className={`p-2 w-10 rounded-xl cursor-pointer border ${editor?.isActive("italic") ? "border-black" : "border-white"}`}
                                    title="Курсив"
                                >
                                    <em>К</em>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                    className={`p-2 w-10 rounded-xl cursor-pointer border ${editor?.isActive("underline") ? "border-black" : "border-white"}`}
                                    title="Подчеркивание"
                                >
                                    <u>П</u>
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-white text-green hover:bg-green hover:text-white border-green border-2 font-semibold cursor-pointer py-2 px-4 rounded-lg transition">
                                    Создать обсуждение
                                </button>
                            </div>
                        </form>
                    ) : isLogin ? (
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