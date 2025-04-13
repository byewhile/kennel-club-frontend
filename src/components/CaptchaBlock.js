"use client"

import axios from "axios";
import { useEffect, useState } from "react"

export default function CaptchaBlock() {
    const [captchaUrl, setCaptchaUrl] = useState(null);

    useEffect(() => {
        const createCaptcha = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/createCodeForCaptcha.php`, {
                    withCredentials: true
                });
                const code = res.data.code;

                const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/createCaptcha.php?code=${code}`;
                setCaptchaUrl(url);
            } catch (err) {
                console.log(err);
            } finally {
                
            }
        }
        createCaptcha();
    }, []);

    return (
        <div>
            {captchaUrl && (
                <img
                    src={captchaUrl}
                    alt="Captcha"
                />
            )}
        </div>
    )
}