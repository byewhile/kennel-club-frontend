"use client"

import BreedBlock from "@/components/BreedBlock";
import ErrorBlock from "@/components/ErrorBlock";
import LoadingSpinner from "@/components/LoadingSpinner";
import NothingBlock from "@/components/NothingBlock";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaDog, FaSearch } from "react-icons/fa";

export default function BreedsPage() {
    const [breeds, setBreeds] = useState([]);
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getBreeds.php`);
                const data = res.data;
                setBreeds(data);
            } catch (err) {
                setError("Не удалось подключиться к серверу!");
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        searchTerm ? setFilteredBreeds(breeds.filter(breed => breed.title.toLowerCase().startsWith(searchTerm.toLowerCase()))) : setFilteredBreeds(breeds);
    }, [breeds, searchTerm]);

    return (
        <main className="container mx-auto px-6 lg:px-12 py-10">
            <div className="lg:flex justify-between text-green">
                <h2 className="flex gap-2 items-center text-xl lg:text-2xl font-bold"><FaDog /> Породы собак нашего клуба</h2>

                <div className="flex items-center p-2 border border-green rounded-lg gap-2 my-2 lg:my-0">
                    <FaSearch />
                    <input
                        type="text"
                        name="search"
                        placeholder="Название породы"
                        className="font-medium outline-none placeholder-green w-full lg:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorBlock error={error} />
            ) : breeds.length === 0 ? (
                <NothingBlock />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 my-3">
                    {filteredBreeds.map((breed, index) => (
                        <BreedBlock breedInfo={breed} key={index} />
                    ))}
                </div>
            )}
        </main>
    )
}