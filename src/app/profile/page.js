"use client"

import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    // const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkSession.php`, {
                    withCredentials: true
                });

                if (!res.data.authenticated) {
                    router.push("/auth");
                } else {
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        checkAuth();
    }, []);

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

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }
 
    return (
        <div>
            <button onClick={logout}>Выйти</button>
        </div>
    )
}