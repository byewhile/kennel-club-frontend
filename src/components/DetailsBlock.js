import Image from "next/image";
import { FaDog, FaWeightHanging  } from "react-icons/fa6";
import { MdHeight } from "react-icons/md";
import { GiComb } from "react-icons/gi";
import NothingBlock from "./NothingBlock";

export default function DetailsBlock({ details, about }) {
    if (!details) {
        return (
            <NothingBlock />
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-2">
            <div>
                <Image 
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/${details.image}`} 
                    alt={`${details.title}`}
                    width={600}
                    height={600}
                    loading="lazy"
                    className="rounded-lg overflow-hidden"
                />
            </div>
        
            <div>
                <div className="flex items-end justify-between mb-3">
                    <h2 className="text-green font-bold text-xl lg:text-3xl">{details.title}</h2>
                    {about == "news" && (
                        <span className="text-gray-400 font-medium">{details.date.split("-").reverse().join(".")}</span>
                    )}
                </div>
                
                {about == "news" ? (
                    <div className="text-lg text-gray-600 my-3">
                        <p>{details.description}</p>
                    </div>
                ) : (
                    <div>
                        <div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="flex items-center rounded-lg shadow-md px-5 py-10 gap-5">
                                    <div className="text-4xl text-green">
                                        <FaDog />
                                    </div>

                                    <div className="font-semibold">
                                        <div className="text-gray-500">Длительность жизни</div>
                                        <div>
                                            От <span>{details.description.age.from}</span> до <span>{details.description.age.to}</span> лет
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center rounded-lg shadow-md px-5 py-10 gap-5">
                                    <div className="text-4xl text-green">
                                        <GiComb />
                                    </div>

                                    <div className="font-semibold">
                                        <div className="text-gray-500">Шерсть</div>
                                        <div>{details.description.wool}</div>
                                    </div>
                                </div>

                                <div className="flex items-center rounded-lg shadow-md px-5 py-10 gap-5">
                                    <div className="text-4xl text-green">
                                        <MdHeight />
                                    </div>

                                    <div className="font-semibold">
                                        <div className="text-gray-500">Рост в холке, см</div>
                                        <div>
                                            От <span>{details.description.height.from}</span> до <span>{details.description.height.to}</span> см
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center rounded-lg shadow-md px-5 py-10 gap-5">
                                    <div className="text-4xl text-green">
                                        <FaWeightHanging />
                                    </div>

                                    <div className="font-semibold">
                                        <div className="text-gray-500">Вес, кг</div>
                                        <div>
                                            От <span>{details.description.weight.from}</span> до <span>{details.description.weight.to}</span> кг
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-lg text-gray-600 my-3">
                            <p>{details.description.text}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}