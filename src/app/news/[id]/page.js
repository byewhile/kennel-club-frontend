"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import DetailsBlock from "@/components/DetailsBlock";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBlock from "@/components/ErrorBlock";

export default function OneNewsPage() {
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const { id } = useParams();

    const handleBack = () => {
        router.back();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getNews.php?id=${id}`);
                const data = res.data[0];
                setNews(data);
            } catch (err) {
                setError("Не удалось подключиться к серверу!");
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <main className="container mx-auto px-6 lg:px-12 py-10">
            <button onClick={handleBack} className="text-green bg-lime rounded-lg p-3 font-medium cursor-pointer"><FaArrowLeft /></button>

            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorBlock error={error} />
            ) : (
                <DetailsBlock details={news} about="news" />
            )}
        </main>
    )
}