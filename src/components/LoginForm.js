"use client"

import axios from "axios";
import { useState } from "react";
import { FaPaw } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import ErrorBlock from "./ErrorBlock";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login.php`, formData, {
                withCredentials: true
            });
            const data = res.data;
            
            if (data.isLogin) {
                window.location.reload();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Не удалось подключиться к серверу!");
        }
    }

    return (
        <form className="w-full lg:w-auto lg:min-w-md mx-auto mt-32 lg:mt-16 p-4 lg:p-8 text-green rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-5">
                <FaPaw className="text-4xl" />
                <h2 className="text-2xl font-bold">Вход</h2>
    
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full font-medium px-4 py-2 border ${error ? "border-red-500" : "border-green"} rounded-lg outline-none placeholder-green`}
                    required
                />
      
                <div className={`flex items-center w-full font-medium px-4 py-2 border ${error ? "border-red-500" : "border-green"} rounded-lg`}>
                    <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Пароль"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full outline-none placeholder-green"
                        required
                    />
                
                    {showPassword ? (
                        <FaEyeSlash className="text-xl cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                    ) : (
                        <FaEye className="text-xl cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                    )}
                </div>

                <input 
                    type="submit" 
                    value="Войти" 
                    className="w-full bg-lim text-white bg-green font-bold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
                />
                {error && <ErrorBlock error={error} />}
            </div>
        </form>
    );
}