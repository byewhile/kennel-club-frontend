"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPaw, FaUsers, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import NewsBlock from "@/components/NewsBlock";
import NothingBlock from "@/components/NothingBlock";
import ErrorBlock from "@/components/ErrorBlock";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HomePage() {
  const [lastNews, setLastNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getNews.php?lastNews=true`);
        const data = res.data;
        setLastNews(data);
      } catch (err) {
        setError("Не удалось подключиться к серверу!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <main className="bg-green text-white pt-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8">
                <span className="block">Клуб для тебя и твоего</span>
                <span className="text-lime">лучшего друга</span>
              </h2>

              <p className="text-xl mb-8">Мы предлагаем возможность познакомиться с единомышленниками и сблизиться со своей собакой</p>
              <Link href="/about" className="bg-lime text-green px-6 py-3 rounded-lg text-lg font-medium">О нас <FaArrowRight className="inline ml-2" /></Link>
            </div>

            <div>
              <Image 
                src="/main-image.jpg" 
                alt="Счастливая собака" 
                width={600}
                height={400}
                className="pt-3"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl text-center mb-12">Последние новости клуба</h2>
              {isLoading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorBlock error={error} />
              ) : lastNews.length === 0 ? (
                <NothingBlock />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {lastNews.map((news, index) => (
                    <NewsBlock newsInfo={news} key={index} />
                  ))}
                </div>
              )}
          
          <div className="text-center mt-12">
            <Link href="/news" className="bg-lime text-green px-6 py-3 rounded-lg text-lg font-medium">Все новости</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <h3 className="text-3xl text-center mb-12">Почему стоит присоединиться</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-lg bg-green text-white">
              <FaPaw className="text-4xl text-lime mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-lime mb-4">Профессиональные тренеры</h4>
              <p>Опытные кинологи помогут вам в воспитании и дрессировке вашего питомца</p>
            </div>
            
            <div className="p-8 rounded-lg bg-green text-white">
              <FaUsers className="text-4xl text-lime mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-lime mb-4">Сообщество</h4>
              <p>Общайтесь с единомышленниками и делитесь опытом</p>
            </div>
            
            <div className="p-8 rounded-lg bg-green text-white">
              <FaCalendarAlt className="text-4xl text-lime mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-lime mb-4">Мероприятия</h4>
              <p>Участвуйте в выставках, соревнованиях и других интересных событиях</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
