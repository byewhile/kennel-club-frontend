"use client"

import axios from "axios";
import { useState } from "react";
import ErrorBlock from "./ErrorBlock";
import { FaPaw } from "react-icons/fa";
import CaptchaBlock from "./CaptchaBlock";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("captcha", captcha);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login.php`, formData, {
                withCredentials: true
            });
            console.log(res.data);
            
            if (res.data.authenticated) {
                window.location.reload();
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError(err);
        }
        setEmail("");
        setPassword("");
        setCaptcha("");
    }

    return (
        <form className="min-w-sm lg:min-w-md mx-auto mt-16 p-8 text-green rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-6">
                <FaPaw className="text-4xl" />
                <h2 className="text-2xl font-bold">Вход</h2>
    
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full font-medium px-4 py-2 border border-green rounded-lg outline-none placeholder-green"
                    required
                />
      
                <input 
                    type="password"
                    placeholder="Пароль" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full font-medium px-4 py-2 border border-green rounded-lg outline-none placeholder-green"
                    required
                />

                <div className="flex flex-col justify-between lg:flex-row w-full gap-6">
                    <CaptchaBlock />

                    <input 
                        type="text" 
                        placeholder="Код с картинки"
                        value={captcha} 
                        onChange={(e) => setCaptcha(e.target.value)}
                        className="font-medium px-4 py-2 border border-green rounded-lg outline-none placeholder-green"
                        required
                    />
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