import Image from "next/image";
import Link from "next/link";

export default function DogBlock({ dog, isOwnProfile, deleteDog }) {
    const dogAge = calculateAge(dog.birthday);

    function calculateAge(birthday) {
        const today = new Date();
        const birth = new Date(birthday);
        
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff == 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age; 
    }

    return (
        <div className="space-y-2">
            <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/${dog.image}`}
                alt={`${dog.breed}`}
                width={300}
                height={300}
                className="rounded-lg"
                loading="lazy"
            />

            <div>
                <div className="text-gray-300">Кличка:</div>
                <div className="text-green font-semibold">{dog.name}</div>
            </div>
        
            <div>
                <div className="text-gray-300">Пол:</div>
                <div className="text-green font-semibold">{dog.gender == "male" ? "Мужской" : "Женский"}</div>
            </div>
        
            <div>
                <div className="text-gray-300">Дата рождения:</div>
                <div className="text-green font-semibold">
                    {dog.birthday.split("-").reverse().join(".")}
                    <span> ({`${dogAge}`} {dogAge > 4 || dogAge == 0 ? "лет" : dogAge == 1 ? "год" : "года" })</span>
                </div>
            </div>
        
            <div>
                <div className="text-gray-300">Порода:</div>
                <Link className="text-green font-semibold underline" href={`/breeds/${dog.link}`}>{dog.breed}</Link>
            </div>

            {isOwnProfile && (
                <button className="w-48 bg-red-500 text-white font-semibold cursor-pointer py-2 rounded-lg mt-4" onClick={() => deleteDog(dog.id)}>
                    Удалить друга
                </button>
            )}
        </div>
    )
}