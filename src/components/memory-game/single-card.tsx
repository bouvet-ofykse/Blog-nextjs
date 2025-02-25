'use client';
import Image from "next/image";
import Cardback from '../../../public/memory-game/cardback.webp';
import {Card} from "@/types/card.type";


interface SingleCardProps {
    card: Card;
    handleChoice: (card: Card) => void;
    cardFlipped: boolean;
    disabled: boolean;
}

export default function SingleCard({ card, handleChoice, cardFlipped, disabled }: SingleCardProps) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }

    return(
        <div className='w-100 h-100 mx-auto my-4 rounded-lg'>
            {cardFlipped && <Image src={card.img} alt='Card front' onClick={handleClick} className='rounded-md accent-gray-300 bg-gray-300 dark:bg-gray-200 p-6 cursor-pointer' width={128} height={128}/>}
            {!cardFlipped && <Image src={Cardback} alt='Card back' onClick={handleClick} className='rounded-md cursor-pointer' width={128} height={128} />}
        </div>
    );
}