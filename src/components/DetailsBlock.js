import Image from "next/image";

export default function DetailsBlock({ details }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-5">
            <div>
                <Image 
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/${details.image}`} 
                    alt={`${details.title}`}
                    width={700}
                    height={700}
                    loading="lazy"
                    className="rounded-lg overflow-hidden"
                />
            </div>
        
            <div>
                <h2 className="text-green font-bold text-xl lg:text-3xl my-5">{details.title}</h2>
                <div className="flex flex-col gap-5 text-lg text-gray-600 mb-4">
                    <p>{details.description}</p>
                </div>
            </div>
        </div>
    )
}