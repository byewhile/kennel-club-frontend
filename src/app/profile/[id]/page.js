"use client"

import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [userData, setUserData] = useState(null);
    const router = useRouter();
    const params = useParams();
    const userId = params.id;

    const getUserData = async (user_id) => {
        setIsOwnProfile(user_id == userId);

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getUserInfo.php?id=${userId}`, {
                withCredentials: true
            });

            if (res.data == null) {
                router.push("/profile");
            } else {
                setUserData(res.data[0]);
                setIsLoading(false);
            }
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
                
                if (!data.authenticated) {
                    router.push("/auth");
                } else {
                    getUserData(data.user_id);
                }
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
        <main className="container mx-auto px-12 pt-12">
            <div className="md:flex items-center justify-between text-green font-bold">
                <div className="flex flex-col mb-5">
                    <div className="flex gap-2 text-xl xl:text-3xl"> 
                        <FaUser /> <span>{userData.first_name} {userData.last_name}</span>
                    </div>

                    <div className="text-gray-400">Участник клуба с {userData.registration_date.split('-').reverse().join('.')}</div>
                </div>

                {isOwnProfile && (
                    <button className="py-2 px-8 rounded-2xl cursor-pointer border-2 border-green hover:bg-green hover:text-white transition" onClick={logout}>Выйти</button>
                )}
            </div>

            <div>
                test
            </div>
        </main>
    )
}