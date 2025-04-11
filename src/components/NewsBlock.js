import Link from "next/link";
import Image from "next/image";

export default function NewsBlock({ newsInfo }) {
    console.log(newsInfo.image);
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className="relative h-100">
                <Image 
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/${newsInfo.image}`} 
                    alt={newsInfo.id}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
            </div>

            <div className="p-6">
                <h3 className="text-green font-bold text-xl mb-3">{newsInfo.title}</h3>
                <p>{newsInfo.description}</p>
            </div>
              
            <div className="p-6">
                <Link href={`/news/${newsInfo.id}`} className="text-green bg-lime rounded-lg p-3 font-medium">Подробнее</Link>
            </div>
        </div>
    )
}