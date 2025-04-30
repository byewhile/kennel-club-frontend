"use client"
 
import { useEffect, useState } from "react"
import { FaArrowsRotate } from "react-icons/fa6";
 
export default function CaptchaBlock() {
    const [captchaUrl, setCaptchaUrl] = useState(null);

    const createCaptcha = () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/createCaptcha.php?q=${Math.random()}`;
            setCaptchaUrl(url);
        } catch (err) {
            console.log(err);
        }
    }
 
    useEffect(() => {
        createCaptcha();
    }, []);
 
    return (
        <div>
            {captchaUrl && (
                <div className="flex items-center gap-2 text-xl select-none">
                    <img
                        src={captchaUrl}
                        alt="Captcha"
                        className="rounded-lg"
                    />
                    <FaArrowsRotate className="cursor-pointer" onClick={createCaptcha} />
                </div>
            )}
        </div>
    )
}