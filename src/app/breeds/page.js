"use client"

import BreedBlock from "@/components/BreedBlock";
import ErrorBlock from "@/components/ErrorBlock";
import LoadingSpinner from "@/components/LoadingSpinner";
import NothingBlock from "@/components/NothingBlock";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BreedsPage() {
    const [breeds, setBreeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getBreeds.php`);
                setBreeds(res.data);
            } catch (err) {
                setError("Не удалось подключиться к серверу!");
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <main className="container mx-auto px-12 py-10">
            <h2 className="text-xl lg:text-3xl text-green font-bold mb-3">Породы собак нашего клуба</h2>

            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorBlock error={error} />
            ) : breeds.length === 0 ? (
                <NothingBlock />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {breeds.map((breed, index) => (
                        <BreedBlock breedInfo={breed} key={index} />
                    ))}
                </div>
            )}
        </main>
    )
}