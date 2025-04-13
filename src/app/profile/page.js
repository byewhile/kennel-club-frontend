"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter();

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
        const checkSession = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkSession.php`, {
                    withCredentials: true
                });

                if (!res.data.authenticated) {
                    router.push("/auth");
                }
            } catch (err) {
                console.log(err);
            }
        }
        checkSession();
    }, []);

    return (
        <div>
            <button onClick={logout}>Выйти</button>
        </div>
    )
}