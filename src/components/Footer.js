import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h4 className="text-lime-300 font-bold text-xl mb-4"><Link href="/">Клуб собаководства</Link></h4>
            <p className="mb-4">Мы объединяем любителей собак для общения, обучения и совместных мероприятий с питомцами</p>
          </div>

          <nav className="lg:col-span-1">
            <h5 className="text-lime-300 font-bold text-lg mb-4">Навигация</h5>
            <ul className="space-y-2 text-white">
              <li>
                <Link href="/" className="hover:underline">Главная</Link>
              </li>
              <li>
                <Link href="/news" className="hover:underline">Новости</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">О клубе</Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-1">
            <h5 className="text-lime-300 font-bold text-lg mb-4">Контакты</h5>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-lime-300 mt-1 mr-2" />
                <Link href="https://yandex.ru/maps/213/moscow/?indoorLevel=1&ll=37.531355%2C55.790574&mode=whatshere&whatshere%5Bpoint%5D=37.531081%2C55.790742&whatshere%5Bzoom%5D=18.35&z=17.35" target="blank" className="hover:underline">г. Москва, ул. Собачья, 15</Link>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-lime-300 mt-1 mr-2" />
                <Link href="tel:71234567890" className="hover:underline">+7 (123) 456-78-90</Link>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-lime-300 mt-1 mr-2" />
                <Link href="mailto:info@dogclub.ru" className="hover:underline">info@dogclub.ru</Link>
              </li>
              <li className="flex items-start">
                <FaClock className="text-lime-300 mt-1 mr-2" />
                <span>Пн-Пт: 10:00 - 20:00</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h5 className="text-lime-300 font-bold text-lg mb-4">Зарегистрируйтесь</h5>
            <p className="mb-4">И будьте в курсе всех событий и акций клуба</p>
            <Link href="/auth" className="inline-block bg-lime text-green x-6 p-3 rounded-lg font-medium">Зарегистрироваться</Link>
          </div>
        </div>

        <hr className="my-8" />

        <div className="text-center lg:text-left">
          <p>&copy; 2025 Клуб собаководства. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}