'use client';

import styles from './card.module.css';
import React from 'react';
import Image from "next/image";

type CardProps = {
    title: string;
    description: string;
    rewards?: string;
    image?: string;
};

const GameCard: React.FC<CardProps> = ({ title, description, image, rewards }) => {

    return (
        <div className={styles.card}>
            {image && <Image src={image} alt={title} className={styles.image} width={120} height={160}/>}
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.rewards}>{rewards}</p>
                <p className={styles.description}>{description}</p>

            </div>
        </div>
    );
};

export default GameCard;
