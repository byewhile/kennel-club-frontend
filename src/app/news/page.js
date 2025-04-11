"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import NewsBlock from "@/components/NewsBlock";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBlock from "@/components/ErrorBlock";
import NothingBlock from "@/components/NothingBlock";

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);

    const newsPerPage = 3;
    const numOfPages = Array.from({ length: Math.ceil(news.length / newsPerPage) });

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    useEffect(() => {
        const savedPage = localStorage.getItem("numOfPage");
        setCurrentPage(savedPage ? parseInt(savedPage) : 1);
    }, []);

    useEffect(() => {
        if (currentPage !== null) {
            localStorage.setItem("numOfPage", currentPage.toString());
            window.scrollTo(0, 0);
        }
    }, [currentPage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getNews.php`);
                setNews(res.data);
            } catch (err) {
                setError("Не удалось подключиться к серверу!");
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <main className="container mx-auto px-10 py-10">
            <h2 className="text-xl lg:text-3xl text-green font-bold mb-3">Новости клуба</h2>
            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorBlock error={error} />
            ) : news.length === 0 ? (
                <NothingBlock />
            ) : (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {currentNews.map((news, index) => (
                        <NewsBlock newsInfo={news} key={index} />
                    ))}
                </div>

                {news.length > newsPerPage && (
                    <div className="flex justify-center mt-5">
                        <nav className="flex">
                            {numOfPages.map((_, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => setCurrentPage(index + 1)} 
                                    className={`px-4 py-2 rounded-lg cursor-pointer ${currentPage === index + 1 ? 'bg-green text-white' : 'bg-white text-green'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
                </>
            )}
        </main>
    )
}