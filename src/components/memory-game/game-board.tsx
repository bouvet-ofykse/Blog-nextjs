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
    const [highscore, setHighScore] = useState<number>(0);
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

        const savedScore = getCookie('HighScore');
        console.log('saved score', savedScore);
        if (savedScore) {

            setHighScore(parseInt(savedScore, 10));
        }
    }, []);

    useEffect(() => {
        const preloadImages = async () => {
            const promises = CARDS.map((card) => {
                const img = new Image();
                img.src = card.img;
                return new Promise((res) => {
                    img.onload = res;
                });
            });
            await Promise.all(promises);
        };

        preloadImages();
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

            if (highscore === 0 || turns < highscore) {
                setHighScore(turns);
                setCookie('HighScore', turns.toString());
            }

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
                <p className={styles.stats}>Turns: {turns}</p>
                <p className={styles.stats}>Matches: {matches}</p>
                <p className={styles.stats}>Highscore: {highscore}</p>
                <button className={styles.button} onClick={handleNewGameClick}>Restart</button>
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

function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, current) => {
        const [key, value] = current.split('=');
        acc[key] = value;
        return acc;
    }, {});

    return cookies[name] ? decodeURIComponent(cookies[name]) : null;
}
function setCookie(name: string, value: string, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}