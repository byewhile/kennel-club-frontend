"use client"

import ConfirmBlock from "@/components/ConfirmBlock";
import DogBlock from "@/components/DogBlock";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser, FaCrown, FaDoorOpen } from "react-icons/fa6";

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [isShowConfirmBlock, setIsShowConfirmBlock] = useState(false);
    const [dogToDelete, setDogToDelete] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userDogs, setUserDogs] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [newDog, setNewDog] = useState({
        name: "",
        gender: "",
        birthday: "",
        breed_id: "",
        image: null
    });
    const router = useRouter();
    const params = useParams();
    const userId = params.id;

    const getUserData = async (user_id) => {
        setIsOwnProfile(user_id == userId);

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUserInfo.php?id=${userId}`, {
                withCredentials: true
            });
            const data = res.data;

            if (data == null) {
                router.push("/profile");
                return;
            }

            setUserData(data[0]);
            getUserDogs();
        } catch (err) {
            console.log(err);
        }
    }

    const getUserDogs = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUserDogs.php?id=${userId}`, {
                withCredentials: true
            });
            const data = res.data;

            setUserDogs(data);
            getAllBreeds();
        } catch (err) {
            console.log(err);
        }
    }

    const getAllBreeds = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getBreeds.php`);
            const data = res.data;
            setBreeds(data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", newDog.name);
        formData.append("gender", newDog.gender);
        formData.append("birthday", newDog.birthday);
        formData.append("breed_id", newDog.breed_id);
        formData.append("image", newDog.image);
        
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addDog.php`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            setNewDog({ name: "", gender: "", birthday: "", breed_id: "", image: null});
            getUserDogs();
        } catch (err) {
            console.log(err);
        }
    }

    const deleteDog = async (dog_id) => {
        const formData = new FormData();
        formData.append("dog_id", dog_id);
    
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deleteDog.php`, formData);
            getUserDogs();
            setIsShowConfirmBlock(false);
        } catch (err) {
            console.log(err);
        }
    }

    const logout = async () => {
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout.php`, {
                withCredentials: true
            });
            window.location.reload();
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

                setIsAdmin(data.isAdmin);
                getUserData(data.user_id);
            } catch (err) {
                console.log(err);
            }
        }
        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <main className="container mx-auto px-6 lg:px-12 py-10">
            {isShowConfirmBlock && (
                <ConfirmBlock
                    actionType="delete"
                    entityType="dogs"
                    action={() => deleteDog(dogToDelete)}
                    setIsShowConfirmBlock={setIsShowConfirmBlock}
                />
            )}

            <div className="md:flex justify-between text-green font-bold">
                <div className="flex flex-col mb-5">
                    <div className="flex gap-2 text-xl xl:text-2xl"> 
                        <FaUser /> <span>{userData.first_name} {userData.last_name}</span>
                    </div>

                    <div className="text-gray-400">Участник клуба с {userData.registration_date.split('-').reverse().join('.')}</div>
                </div>

                {isOwnProfile && (
                    <div className="space-y-2 space-x-2">
                        {isAdmin && (
                            <Link href="/admin" title="Админ-панель" className="inline-block py-2 px-4 rounded-2xl cursor-pointer border-2 border-green text-green hover:bg-green hover:text-white transition">
                                <FaCrown className="inline" />
                            </Link>
                        )}
                        
                        <button title="Выйти из профиля" className="py-2 px-4 rounded-2xl cursor-pointer border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition" onClick={logout}>
                            <FaDoorOpen className="inline" /> 
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 my-5">
                {isOwnProfile && (
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {newDog.image ? (
                            <label htmlFor="image" className="cursor-pointer">
                                <Image
                                    src={URL.createObjectURL(newDog.image)}
                                    alt="Предпросмотр"
                                    width={300}
                                    height={300}
                                    className="rounded-lg"
                                />
                            </label>
                        ) : (
                            <label htmlFor="image" className="lg:w-[300px] lg:h-[300px] flex justify-center items-center rounded-lg p-5 cursor-pointer font-medium  transition border-2 border-dashed hover:bg-gray-50 border-gray-300">
                                <span className="text-gray-300 font-semibold text-center">Выберите фото<br />(300x300)</span>
                            </label>
                        )}

                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={(e) => setNewDog({...newDog, image: e.target.files[0]})}
                            className="hidden"
                            id="image"
                            required
                        />

                        <div>
                            <div className="text-gray-300">Кличка:</div>
                            <input 
                                type="text"
                                className="text-green border-green border-b-1 outline-none font-semibold focus:bg-gray-50 transition"
                                value={newDog.name}
                                onChange={(e) => setNewDog({...newDog, name: e.target.value})}
                                required
                            />
                        </div>

                        <div>
                            <div className="text-gray-300">Пол:</div>
                            <select name="gender" className="text-green border-b-1 outline-none font-semibold focus:bg-gray-50 transition" value={newDog.gender} onChange={(e) => setNewDog({...newDog, gender: e.target.value})} required>
                                <option value="">---</option>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>
                        </div>

                        <div>
                            <div className="text-gray-300">Дата рождения:</div>
                            <input 
                                type="date"
                                className="text-green border-b-1 outline-none font-semibold focus:bg-gray-50 transition"
                                value={newDog.birthday}
                                onChange={(e) => setNewDog({...newDog, birthday: e.target.value})}
                                max={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        <div>
                            <div className="text-gray-300">Порода:</div>
                            <select name="breed" className="text-green border-b-1 outline-none font-semibold focus:bg-gray-50 transition" value={newDog.breed_id} onChange={(e) => setNewDog({...newDog, breed_id: e.target.value})} required>
                                <option value="">---</option>
                                {breeds.map((breed) => (
                                    <option key={breed.id} value={breed.id}>{breed.title}</option>
                                ))}
                            </select>
                        </div>

                        <button className="w-48 bg-green text-white font-semibold cursor-pointer py-2 rounded-lg mt-4">
                            Добавить друга
                        </button>
                    </form>
                )}

                {userDogs && (
                    <>
                    {userDogs.map((dog) => (
                        <DogBlock key={dog.id} dog={dog} isOwnProfile={isOwnProfile} setDogToDelete={setDogToDelete} setIsShowConfirmBlock={setIsShowConfirmBlock} />
                    ))}
                    </>
                )}
            </div>
        </main>
    )
}