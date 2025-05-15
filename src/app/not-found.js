import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <main className="container mx-auto text-green px-12 pt-12 mt-32">
        <div>
            <div className="font-semibold text-8xl">404</div>
            <div className="text-2xl mb-6">Страница не найдена</div>
        </div>
        
        <Link className="text-lg lg:text-xl px-6 py-3 rounded-2xl border-2 border-green hover:bg-green hover:text-white transition" href="/">
            <FaArrowLeft className="inline mr-2 mb-1" /> Вернуться на главную
        </Link>
    </main>
  );
}