"use client"

import { useEffect, useState } from "react"

export default function CaptchaBlock() {
    const [captchaUrl, setCaptchaUrl] = useState(null);

    useEffect(() => {
        const createCaptcha = () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/createCaptcha.php`;
                setCaptchaUrl(url);
            } catch (err) {
                console.log(err);
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