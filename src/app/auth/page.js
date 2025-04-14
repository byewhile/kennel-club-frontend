"use client"
 
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
 
export default function AuthPage() {
    const [loginForm, setLoginForm] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkSession.php`, {
                    withCredentials: true
                });

                if (res.data.authenticated) {
                    router.push("/profile");
                } else {
                    setIsLoading(false);
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
        <div className="flex flex-col items-center justify-center h-[75vh]">
            {loginForm ? <LoginForm /> : <RegisterForm />}
            <div className="flex flex-col items-center mt-3">
                {loginForm ? "Нет аккаунта?" : "Есть аккаунт?"}
                <button className="text-green font-bold cursor-pointer" onClick={() => setLoginForm(!loginForm)}>{loginForm ? "Зарегистрироваться" : "Войти"}</button>
            </div>
        </div>
    )
}