"use client"

import { Suspense, useEffect, useState } from "react";
import { FaCrown, FaBan, FaUser } from "react-icons/fa6";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

function AdminContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [newBreed, setNewBreed] = useState({
        name: "",
        text: "",
        image: null
    });
    const [newNews, setNewNews] = useState({
        title: "",
        text: "",
        image: null
    });
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "news";

    const setActiveTab = (tab) => {
        const params = new URLSearchParams(searchParams);
        params.set("tab", tab);
        router.push(`${pathname}?${params}`);
    }

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUsers.php`);
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const checkAdmin = async (user_id) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkAdmin.php?id=${user_id}`, {
                withCredentials: true
            });
            const isAdmin = res.data;

            if (!isAdmin) {
                router.push("/");
            } else {
                fetchUsers();
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkSession.php`, {
                    withCredentials: true
                });
                const data = res.data;
                
                if (!data.authenticated) {
                    router.push("/");
                } else {
                    checkAdmin(data.user_id);
                }
            } catch (err) {
                console.log(err);
            }
        }
        checkAuth();
    }, []);

    const handleBreedSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", newBreed.name);
        formData.append("description", newBreed.description);
        formData.append("image", newBreed.image);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addBreed.php`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setNewBreed({ name: "", description: "", image: null });
        } catch (err) {
            console.log(err);
        }
    };

    const handleNewsSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", newNews.title);
        formData.append("content", newNews.content);
        formData.append("image", newNews.image);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addNews.php`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setNewNews({ title: "", content: "", image: null });
        } catch (err) {
            console.log(err);
        }
    };

    const handleUserAction = async (user_id, action) => {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("action", action);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/manageUser.php`, formData);
            fetchUsers();
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <main className="container mx-auto px-12 pt-12">
            <h2 className="text-green text-3xl font-bold mb-3">Админ панель</h2>
            
            <div className="flex gap-5 mb-6">
                <button className={`cursor-pointer text-green ${activeTab == "news" ? "font-bold" : ""}`} onClick={() => setActiveTab("news")}>
                    Новости клуба
                </button>
                <button className={`cursor-pointer text-green ${activeTab == "breeds" ? "font-bold" : ""}`} onClick={() => setActiveTab("breeds")}>
                    Породы собак
                </button>
                <button className={`cursor-pointer text-green ${activeTab == "users" ? "font-bold" : ""}`} onClick={() => setActiveTab("users")}>
                    Участники клуба
                </button>
            </div>

            {activeTab == "news" && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Добавить новость</h2>
                    <form onSubmit={handleNewsSubmit} className="mb-8">
                        <div className="mb-4">
                            <label className="block mb-2">Заголовок</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={newNews.title}
                                onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Содержание</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="4"
                                value={newNews.text}
                                onChange={(e) => setNewNews({...newNews, text: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Изображение</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewNews({...newNews, image: e.target.files[0]})}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Добавить новость
                        </button>
                    </form>
                </div>
            )}

            {activeTab == "breeds" && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Добавить новую породу</h2>
                    <form onSubmit={handleBreedSubmit} className="mb-8">
                        <div className="mb-4">
                            <label className="block mb-2">Название породы</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={newBreed.name}
                                onChange={(e) => setNewBreed({...newBreed, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Описание</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="4"
                                value={newBreed.text}
                                onChange={(e) => setNewBreed({...newBreed, text: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Изображение</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewBreed({...newBreed, image: e.target.files[0]})}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Добавить породу
                        </button>
                    </form>
                </div>
            )}

            {activeTab == "users" && (
                <div>
                    <h3 className="text-green text-xl font-bold">Участники клуба</h3>
                    <div className="space-y-3 my-3">
                        {users.map(user => (
                            <div key={user.id} className="flex flex-col lg:flex-row items-center justify-between gap-5 shadow rounded p-5">
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
                                    <div>{user.email}</div>
                                </div>

                                <div className="flex-2 w-full lg:w-auto">
                                    <div className="text-gray-500">Роль</div>
                                    <div>{user.role == "admin" ? "Администратор" : "Пользователь"}</div>
                                </div>
                                
                                <div className="flex lg:justify-end w-full lg:w-32">
                                    <div className="flex gap-2 mt-3 font-medium">
                                        <Link href={`/profile/${user.id}`} className="bg-green text-white p-2 rounded cursor-pointer transition" title="Перейти в профиль">
                                            <FaUser />
                                        </Link>

                                        {user.role !== "admin" && (
                                            <>
                                                <button onClick={() => handleUserAction(user.id, "make_admin")} className="bg-yellow-400 text-white p-2 rounded cursor-pointer transition" title="Сделать администратором">
                                                    <FaCrown />
                                                </button>

                                                <button onClick={() => handleUserAction(user.id, "delete")} className="bg-red-500 text-white p-2 rounded cursor-pointer transition" title="Удалить пользователя">
                                                    <FaBan />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}

export default function AdminPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <AdminContent />
        </Suspense>
    );
}