"use client"

import { Suspense, useEffect, useState } from "react";
import { FaDog, FaWeightHanging  } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdHeight } from "react-icons/md";
import { GiComb } from "react-icons/gi";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import slugify from "slugify";
import UserBlock from "@/components/UserBlock";

function AdminContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newBreed, setNewBreed] = useState({
        name: "",
        age: ["", ""],
        wool: "Не линяет",
        height: ["", ""],
        weight: ["", ""],
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
            const data = res.data;
            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        searchTerm ? setFilteredUsers(users.filter(user => user.id.startsWith(searchTerm))) : setFilteredUsers(users);
    }, [users, searchTerm]);

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

    const handleNewsSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", newNews.title);
        formData.append("text", newNews.text);
        formData.append("image", newNews.image);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addNews.php`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setNewNews({ title: "", text: "", image: null });
        } catch (err) {
            console.log(err);
        }
    }

    const handleBreedSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", newBreed.name);
        formData.append("age[]", newBreed.age[0]);
        formData.append("age[]", newBreed.age[1]);
        formData.append("wool", newBreed.wool);
        formData.append("height[]", newBreed.height[0]);
        formData.append("height[]", newBreed.height[1]);
        formData.append("weight[]", newBreed.weight[0]);
        formData.append("weight[]", newBreed.weight[1]);
        formData.append("text", newBreed.text);
        formData.append("image", newBreed.image);
        formData.append("link", slugify(newBreed.name, { lower: true }));

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addBreed.php`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setNewBreed({ name: "", age: ["", ""], wool: "Не линяет", height: ["", ""], weight: ["", ""], text: "", image: null });
        } catch (err) {
            console.log(err);
        }
    }

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
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <main className="container mx-auto px-6 lg:px-12 py-10">
            <h2 className="text-xl lg:text-3xl text-green font-bold mb-3">Админ панель</h2>
            
            <div className="flex flex-col items-start lg:flex-row gap-3 mb-6">
                <button className={`cursor-pointer text-green ${activeTab == "news" ? "font-bold" : "font-semibold"}`} onClick={() => setActiveTab("news")}>
                    Форма новости
                </button>
                <button className={`cursor-pointer text-green ${activeTab == "breeds" ? "font-bold" : "font-semibold"}`} onClick={() => setActiveTab("breeds")}>
                    Форма породы
                </button>
                <button className={`cursor-pointer text-green ${activeTab == "users" ? "font-bold" : "font-semibold"}`} onClick={() => setActiveTab("users")}>
                    Управление пользователями
                </button>
            </div>

            {activeTab == "news" && (
                <div>
                    <h3 className="text-green text-xl font-bold">Форма новости</h3>
                    <form onSubmit={handleNewsSubmit} className="flex flex-col lg:flex-row mt-4 gap-5">
                        {newNews.image ? (
                            <label htmlFor="image" className="cursor-pointer">
                                <Image
                                    src={URL.createObjectURL(newNews.image)}
                                    alt="Предпросмотр"
                                    width={600}
                                    height={600}
                                    className="rounded-lg overflow-hidden"
                                />
                            </label>
                        ) : (
                            <label htmlFor="image" className="lg:w-[600px] lg:h-[600px] flex justify-center items-center rounded-lg p-5 cursor-pointer font-medium  transition border-2 border-dashed hover:bg-gray-50 border-gray-300">
                                <span className="text-gray-300 font-semibold text-center">Выберите фото<br />(600x600)</span>
                            </label>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewNews({...newNews, image: e.target.files[0]})}
                            className="hidden"
                            id="image"
                            required
                        />
                        
                        <div className="lg:w-1/2">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-lg text-green font-bold text-xl lg:text-3xl outline-none focus:bg-gray-50 transition"
                                    value={newNews.title}
                                    onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                                    placeholder="Заголовок новости"
                                    required
                                />
                            </div>
          
                            <div className="text-lg text-gray-600 mb-3">
                                <textarea
                                    className="w-full p-3 rounded-lg h-128 outline-none focus:bg-gray-50 transition resize-none"
                                    value={newNews.text}
                                    onChange={(e) => setNewNews({...newNews, text: e.target.value})}
                                    placeholder="Текст новости"
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green text-white font-semibold cursor-pointer py-3 px-6 rounded-lg">
                                    Опубликовать новость
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {activeTab == "breeds" && (
                <div>
                    <h3 className="text-green text-xl font-bold">Форма породы</h3>
                    <form onSubmit={handleBreedSubmit} className="flex flex-col lg:flex-row mt-4 gap-5">
                        {newBreed.image ? (
                            <label htmlFor="image" className="cursor-pointer">
                                <Image
                                    src={URL.createObjectURL(newBreed.image)}
                                    alt="Предпросмотр"
                                    width={600}
                                    height={600}
                                    className="rounded-lg overflow-hidden"
                                />
                            </label>
                        ) : (
                            <label htmlFor="image" className="lg:w-[600px] lg:h-[600px] flex justify-center items-center rounded-lg p-5 cursor-pointer font-medium  transition border-2 border-dashed hover:bg-gray-50 border-gray-300">
                                <span className="text-gray-300 font-semibold text-center">Выберите фото<br />(600x600)</span>
                            </label>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewBreed({...newBreed, image: e.target.files[0]})}
                            className="hidden"
                            id="image"
                            required
                        />
                    
                        <div className="lg:w-1/2">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-lg text-green font-bold text-xl lg:text-3xl outline-none focus:bg-gray-50 transition"
                                    value={newBreed.name}
                                    onChange={(e) => setNewBreed({...newBreed, name: e.target.value})}
                                    placeholder="Название породы"
                                    required
                                />
                            </div>

                            <div className="xl:grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="flex items-center rounded-lg shadow-md px-5 py-10 gap-5">
                                    <div className="text-4xl text-green">
                                        <FaDog />
                                    </div>

                                    <div className="font-semibold">
                                        <div className="text-gray-500">Длительность жизни</div>
                                        <div>
                                            От <input 
                                                    type="text" 
                                                    name="age[]" 
                                                    className="w-8 outline-none border-b-2 focus:bg-gray-50 transition text-center"
                                                    value={newBreed.age[0]}
                                                    onChange={(e) => setNewBreed({...newBreed, age: [e.target.value, newBreed.age[1]]})}
                                                    required
                                                /> 
                                            до <input
                                                    type="text" 
                                                    name="age[]" 
                                                    className="w-8 outline-none border-b-2 focus:bg-gray-50 transition text-center"
                                                    value={newBreed.age[1]}
                                                    onChange={(e) => setNewBreed({...newBreed, age: [newBreed.age[0], e.target.value]})}
                                                    required
                                                /> 
                                            лет
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center rounded-lg shadow-md px-5 py-10 gap-5">
                                    <div className="text-4xl text-green">
                                        <GiComb />
                                    </div>

                                    <div className="font-semibold">
                                        <div className="text-gray-500">Шерсть</div>
                                        <div>
                                            <select name="wool" className="outline-none border-b-2 focus:bg-gray-50 transition" value={newBreed.wool} onChange={(e) => setNewBreed({...newBreed, wool: e.target.value})}>
                                                <option value="Не линяет">Не линяет</option>
                                                <option value="Мало линяет">Мало линяет</option>
                                                <option value="Линяет">Линяет</option>
                                                <option value="Сильно линяет">Сильно линяет</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center rounded-lg shadow-md px-5 py-10 gap-5">
                                    <div className="text-4xl text-green">
                                        <MdHeight />
                                    </div>

                                    <div className="font-semibold">
                                        <div className="text-gray-500">Рост в холке, см</div>
                                        <div>
                                            От <input 
                                                    type="text" 
                                                    name="height[]" 
                                                    className="w-8 outline-none border-b-2 focus:bg-gray-50 transition text-center"
                                                    value={newBreed.height[0]}
                                                    onChange={(e) => setNewBreed({...newBreed, height: [e.target.value, newBreed.height[1]]})}
                                                    required
                                                /> 
                                            до <input 
                                                    type="text" 
                                                    name="height[]" 
                                                    className="w-8 outline-none border-b-2 focus:bg-gray-50 transition text-center"
                                                    value={newBreed.height[1]}
                                                    onChange={(e) => setNewBreed({...newBreed, height: [newBreed.height[0], e.target.value]})}
                                                    required
                                                /> 
                                            см
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center rounded-lg shadow-md px-5 py-10 gap-5">
                                    <div className="text-4xl text-green">
                                        <FaWeightHanging />
                                    </div>

                                    <div className="font-semibold">
                                        <div className="text-gray-500">Вес, кг</div>
                                        <div>
                                            От <input 
                                                    type="text" 
                                                    name="weight[]"
                                                    className="w-8 outline-none border-b-2 focus:bg-gray-50 transition text-center"
                                                    value={newBreed.weight[0]}
                                                    onChange={(e) => setNewBreed({...newBreed, weight: [e.target.value, newBreed.weight[1]]})}
                                                    required
                                                /> 
                                            до <input 
                                                    type="text" 
                                                    name="weight[]" 
                                                    className="w-8 outline-none border-b-2 focus:bg-gray-50 transition text-center"
                                                    value={newBreed.weight[1]}
                                                    onChange={(e) => setNewBreed({...newBreed, weight: [newBreed.weight[0], e.target.value]})}
                                                    required
                                                /> 
                                            кг
                                        </div>
                                    </div>
                                </div>
                            </div>
      
                            <div className="text-lg text-gray-600 my-3">
                                <textarea
                                    className="w-full p-3 rounded-lg h-64 outline-none focus:bg-gray-50 transition resize-none"
                                    value={newBreed.text}
                                    onChange={(e) => setNewBreed({...newBreed, text: e.target.value})}
                                    placeholder="Описание породы"
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green text-white font-semibold cursor-pointer py-3 px-6 rounded-lg">
                                    Добавить породу
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {activeTab == "users" && (
                <div>
                    <div className="lg:flex justify-between text-green">
                        <h3 className="text-xl font-bold">Участники клуба</h3>

                        <div className="flex items-center p-2 border border-green rounded-lg gap-2 my-2 lg:my-0">
                            <FaSearch />
                            <input
                                type="text"
                                name="search"
                                placeholder="ID пользователя"
                                className="font-medium outline-none placeholder-green w-full lg:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-3 my-3">
                        {filteredUsers.map((user) => (
                            <UserBlock key={user.id} user={user} handleUserAction={handleUserAction} />
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