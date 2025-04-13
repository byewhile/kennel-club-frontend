"use client"
 
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";
 
export default function AuthPage() {
    const [loginForm, setLoginForm] = useState(true);
 
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