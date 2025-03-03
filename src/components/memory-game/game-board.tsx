'use client';

import SingleCard from "@/components/memory-game/single-card";
import {Card} from "@/types/card.type";
import {CARDS} from '@/lib/memory-cards'
import {useEffect, useState} from "react";
import styles from './game-board.module.css';

export default function GameBoard() {

    const unshuffeledCards: Card[] = CARDS;

    const [cards, setCards] = useState<Card[]>([]);
    const [turns, setTurns] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<Card | undefined>(undefined);
    const [choiceTwo, setChoiceTwo] = useState<Card | undefined>(undefined);
    const [disabled, setDisabled] = useState(false);

    function shuffleCards() {
        const shuffeledCards = unshuffeledCards.sort(() => Math.random() - 0.5)
        setCards(shuffeledCards);
    }

    useEffect(() => {
        shuffleCards();
        setTurns(0);
        setScore(0);
    }, []);

    const handleChoice = (card: Card) => {
        if (choiceOne) {
            setChoiceTwo(card)
        } else {
            setChoiceOne(card)
        }
    }

    useEffect(() => {
        if (choiceOne && choiceTwo && choiceOne?.id !== choiceTwo.id) {
            setDisabled(true);
            if (choiceOne.id === choiceTwo.matchId || choiceTwo.id === choiceOne.matchId) { // is match
                setScore(score + 1);
                setCards(prevCards => {
                    return prevCards.map((card) => {
                        if (card.img === choiceOne.img) {
                            return { ...card, matched: true}
                        } else {
                            return card;
                        }
                    })
                })
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
        if (cards.filter(card => card.matched).length === cards.length) { // Win condition
            // Handle winning the game
            handleNewGameClick();
        }
    }, [choiceOne, choiceTwo])

    function handleNewGameClick() {
        shuffleCards();
        setTurns(0);
        setScore(0);
        setChoiceOne(undefined);
        setChoiceTwo(undefined);
        setDisabled(false);
    }

    const resetTurn = () => {
        setChoiceOne(undefined);
        setChoiceTwo(undefined);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }

    return (
        <div>
            <section>
                <p>Turns: {turns}</p>
                <p>Score: {score}</p>
                <button onClick={handleNewGameClick}>New game</button>
            </section>
            <div className={styles['game-board']}>
                {cards.map((card) => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        cardFlipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />))}
            </div>
        </div>
    );
}