"use client"

import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter();

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
                    router.push(`/profile/${data.user_id}`);
                }
            } catch (err) {
                console.log(err);
            }
        }
        checkAuth();
    }, []);

    return (
        <LoadingSpinner />
    )
}