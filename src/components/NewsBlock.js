import Link from "next/link";
import Image from "next/image";

export default function NewsBlock({ newsInfo }) {
    let description = newsInfo.description;
    description = description.split(".");
    description = description[0];

    return (
        <Link href={`/news/${newsInfo.id}`} className="rounded-lg overflow-hidden shadow-md h-[600px]">
            <div className="relative h-100">
                <Image 
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/${newsInfo.image}`} 
                    alt={newsInfo.id}
                    fill
                    className="object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-6">
                <div className="flex items-end justify-between gap-3 mb-3">
                    <h3 className="text-green font-bold text-xl">{newsInfo.title}</h3>
                    <span className="text-gray-400 font-medium">{newsInfo.date.split("-").reverse().join(".")}</span>
                </div>
                <p>{description}...</p>
            </div>
        </Link>
    )
}