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
        if (!disabled && !card.matched) {
            handleChoice(card);
        }
    }

    return(
        <button
            type="button"
            className={`${styles.card} ${cardFlipped ? styles.isFlipped : ''} ${card.matched ? styles.isMatched : ''}`}
            onClick={handleClick}
            disabled={disabled || card.matched}
            aria-label={cardFlipped ? 'Vendt kort' : 'Skjult kort'}
            aria-pressed={cardFlipped}
        >
            <span className={styles.cardInner}>
                <span className={`${styles.face} ${styles.front}`} aria-hidden="true">
                    <Image src={Cardback} alt="" fill sizes="(max-width: 600px) 30vw, (max-width: 900px) 22vw, 140px" />
                </span>
                <span className={`${styles.face} ${styles.back}`} aria-hidden="true">
                    <Image src={card.img} alt="" fill sizes="(max-width: 600px) 30vw, (max-width: 900px) 22vw, 140px" />
                </span>
            </span>
        </button>
    );
}