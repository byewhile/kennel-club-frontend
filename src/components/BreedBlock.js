import Link from "next/link";
import Image from "next/image";

export default function BreedBlock({ breedInfo }) {
    return (
        <Link href={`/breeds/${breedInfo.link}`} className="rounded-lg overflow-hidden shadow-md h-[300px] relative">
            <div className="relative h-100">
                <Image 
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/${breedInfo.image}`} 
                    alt={breedInfo.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
            </div>
        
            <div className="absolute bottom-3 left-3">
                <h3 className="text-white font-bold text-xl">{breedInfo.title}</h3>
            </div>
        </Link>
    )
}