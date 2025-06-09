'use client';

import SingleCard from "@/components/memory-game/single-card";
import {Card} from "@/types/card.type";
import {CARDS} from '@/lib/memory-cards'
import {useEffect, useState} from "react";
import styles from './game-board.module.css';
import WinModal from "@/components/memory-game/win-modal";

export default function GameBoard() {

    const unshuffeledCards: Card[] = CARDS;

    const [cards, setCards] = useState<Card[]>([]);
    const [turns, setTurns] = useState<number>(0);
    const [matches, setMatches] = useState<number>(0);
    const [gameWon, setGameWon] = useState<boolean>(false);
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
        setMatches(0);
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
                setMatches(matches + 1);
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
        if (cards.filter(card => card.matched).length === cards.length && cards.length !== 0) { // Win condition
            // Handle winning the game
            setGameWon(true);
            console.log('game won');
            console.log('matched:', cards.filter(card => card.matched).length);
            console.log('all:', cards.length);
            // handleNewGameClick();
        }
    }, [choiceOne, choiceTwo])

    function handleNewGameClick() {
        shuffleCards();
        setTurns(0);
        setMatches(0);
        setChoiceOne(undefined);
        setChoiceTwo(undefined);
        setDisabled(false);
        setGameWon(false);
    }

    const resetTurn = () => {
        setChoiceOne(undefined);
        setChoiceTwo(undefined);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }

    return (
        <div>
            <section className={styles.scoreboard}>
                <p>Turns: {turns}</p>
                <p>Matches: {matches}</p>
                <button className={styles.button} onClick={handleNewGameClick}>New game</button>
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
            {gameWon && <WinModal show={gameWon} matches={matches} turns={turns} onRestart={handleNewGameClick} />}
        </div>
    );
}