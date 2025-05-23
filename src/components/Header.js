"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaPaw, FaNewspaper, FaDog, FaInfoCircle, FaUser } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import axios from "axios";

export default function Header() {
    const [userId, setUserId] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkSession.php`, {
                    withCredentials: true
                });
                const data = res.data;

                setIsLogin(data.isLogin);
                setUserId(data.user_id);
            } catch (err) {
                console.log(err);
            }
        }
        checkAuth();
    }, []);

    const pages = [
        {
            title: "Новости",
            link: "/news",
            icon: <FaNewspaper />,
        },
        {
            title: "Собачьи породы",
            link: "/breeds",
            icon: <FaDog />,
        },
        {
            title: "Форум",
            link: "/forum",
            icon: <MdForum />,
        },
        {
            title: "О клубе",
            link: "/about",
            icon: <FaInfoCircle />,
        },
        {
            title: "Профиль",
            link: `/${isLogin ? "profile/" + userId : "auth"}`,
            icon: <FaUser />,
        },
    ];

    return (
        <header>
            <nav className="bg-lime text-green shadow-lg py-6">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center">
                            <FaPaw className="text-3xl mr-2" />
                            <h1 className="text-xl xl:text-3xl font-bold">Клуб собаководства</h1>
                        </Link>

                        <button className="lg:hidden" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <nav className="hidden lg:flex items-center gap-5">
                            {pages.map((page, index) => (
                                <Link href={page.link} key={index} className="flex gap-2 items-center font-medium hover:scale-105 focus:scale-105">
                                    {page.icon} <span>{page.title}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {openMobileMenu && 
                    <nav className="flex flex-col gap-6 mt-2 py-2">
                        {pages.map((page, index) => (
                            <Link href={page.link} key={index} className="flex gap-2 items-center" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                                {page.icon} <span>{page.title}</span>
                            </Link>
                        ))}
                    </nav>
                    }
                </div>
            </nav>
        </header>
    );
}