'use client';
import Image from "next/image";
import Cardback from '../../../public/memory-game/cardback.webp';
import {Card} from "@/types/card.type";
import styles from './single-card.module.css';
import React from "react";

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
        <>
            {cardFlipped && <Image priority src={card.img} alt='Card front' onClick={handleClick} className={styles['card-front']} width={80} height={80}/>}
            {!cardFlipped && <Image priority src={Cardback} alt='Card back' onClick={handleClick} className={styles['card-back']} width={128} height={128} />}
        </>
    );
}