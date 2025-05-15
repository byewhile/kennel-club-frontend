import Image from "next/image"

export const metadata = {
    title: "О нас | Клуб собаководства",
    description: "О нас | Клуб собаководства",
}

export default function AboutPage() {
    return (
        <main className="container mx-auto px-6 lg:px-12 py-10">
            <h2 className="text-xl lg:text-3xl text-green font-bold mb-5">О клубе</h2>
            <p className="text-xl text-gray-600">Сегодня клуб объединяет более 500 членов и остается центром собаководства в регионе, воспитывая ответственных владельцев и помогая собакам обрести любящие семьи.<br /><em>"От маленькой инициативы – к большому делу!"</em></p>

            <div className="space-y-4 my-10">
                <div className="xl:flex gap-4">
                    <Image 
                        src="/about-image1.jpg" 
                        alt="Cобака" 
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />

                    <details open className="w-full">
                        <summary className="cursor-pointer rounded-lg p-4 text-lg font-bold bg-green text-white">1999 – Основание клуба собаководства</summary>
                        <p className="py-2 text-lg text-gray-600">В 1999 году группа энтузиастов-кинологов из небольшого города решила объединиться, чтобы развивать культуру ответственного собаководства. Первыми членами стали всего 10 человек, но их любовь к собакам и желание делиться знаниями быстро привлекли внимание местных жителей.</p>
                    </details>
                </div>
                
                <div className="xl:flex gap-4">
                    <details open className="w-full">
                        <summary className="cursor-pointer rounded-lg p-4 text-lg font-bold bg-green text-white">2000–2005 – Первые выставки и тренировки</summary>
                        <p className="py-2 text-lg text-gray-600">Уже в 2000 году клуб провел свою первую выставку собак, в которой приняли участие около 30 питомцев. Это событие стало ежегодной традицией. В 2002 году открылась школа дрессировки, где владельцы могли обучить своих питомцев базовым командам и подготовить их к соревнованиям.</p>
                        <p className="py-2 text-lg text-gray-600"> В 2004 году клуб вступил в Российскую Кинологическую Федерацию (РКФ), что позволило клубу проводить официальные мероприятия и выдавать сертификаты.</p>
                    </details>

                    <Image 
                        src="/about-image2.jpg" 
                        alt="Cобака" 
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />
                </div>

                <div className="xl:flex gap-4">
                    <Image 
                        src="/about-image3.jpg" 
                        alt="Cобака" 
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />

                    <details open className="w-full">
                        <summary className="cursor-pointer rounded-lg p-4 text-lg font-bold bg-green text-white">2006–2015 - Расширение деятельности</summary>
                        <ul className="py-2 text-lg text-gray-600 list-disc list-inside">
                            <li>2008 год – клуб организовал первые соревнования по аджилити, что привлекло новых участников.</li>
                            <li>2010 год – открылся приют для бездомных собак при поддержке клуба. Волонтеры помогали находить животным новых хозяев.</li>
                            <li>2013 год – мы провели городской фестиваль "Собаки – наши друзья" с показательными выступлениями, лекциями и благотворительным сбором.</li>
                        </ul>
                    </details>
                </div>

                <div className="xl:flex gap-4">
                    <details open className="cursor-pointer w-full">
                        <summary className="cursor-pointer rounded-lg p-4 text-lg font-bold bg-green text-white">2016–2025 - Современный этап</summary>
                        <ul className="py-2 text-lg text-gray-600 list-disc list-inside">
                            <li>Проводятся выездные семинары с известными кинологами.</li>
                            <li>Организована группа по поисково-спасательной службе (ПСС).</li>
                            <li>В 2020 году, несмотря на пандемию, клуб перешел в онлайн-формат: вебинары, виртуальные выставки, консультации.</li>
                            <li>В 2023 году клуб отметил 25-летие масштабной выставкой с участием более 200 собак.</li>
                        </ul>
                    </details>

                    <Image 
                        src="/about-image4.jpg" 
                        alt="Cобака" 
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </main>
    )
}