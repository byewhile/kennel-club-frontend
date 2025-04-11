"use client"

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaArrowLeft } from 'react-icons/fa';
import DetailsBlock from "@/components/DetailsBlock";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBlock from "@/components/ErrorBlock";

export default function OneNewsPage() {
    const [breeds, setBreeds] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { slug } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getBreeds.php?link=${slug}`);
                setBreeds(res.data[0]);
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
            <Link href="/breeds" className="text-green bg-lime rounded-lg p-3 font-medium"><FaArrowLeft className="inline mr-2" /> Все породы</Link>

            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorBlock error={error} />
            ) : (
                <DetailsBlock details={breeds} />
            )}
        </main>
    )
}