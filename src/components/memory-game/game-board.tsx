'use client';

import SingleCard from "@/components/memory-game/single-card";
import {Card} from "@/types/card.type";
import {CARDS} from '@/lib/memory-cards'
import {useCallback, useEffect, useState} from "react";
import styles from './game-board.module.css';
import WinModal from "@/components/memory-game/win-modal";


export default function GameBoard() {

    const [cards, setCards] = useState<Card[]>([]);
    const [turns, setTurns] = useState<number>(0);
    const [matches, setMatches] = useState<number>(0);
    const [gameWon, setGameWon] = useState<boolean>(false);
    const [highscore, setHighScore] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<Card | undefined>(undefined);
    const [choiceTwo, setChoiceTwo] = useState<Card | undefined>(undefined);
    const [disabled, setDisabled] = useState(false);

    const shuffleCards = useCallback(() => {
        setCards([...CARDS].sort(() => Math.random() - 0.5));
    }, []);

    const resetTurn = useCallback(() => {
        setChoiceOne(undefined);
        setChoiceTwo(undefined);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }, []);

    useEffect(() => {
        shuffleCards();
        setTurns(0);
        setMatches(0);

        const savedScore = getCookie('HighScore');
        console.log('saved score', savedScore);
        if (savedScore) {

            setHighScore(parseInt(savedScore, 10));
        }
    }, [shuffleCards]);

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
                setMatches(previousMatches => previousMatches + 1);
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
    }, [choiceOne, choiceTwo, resetTurn])

    useEffect(() => {
        if (gameWon || cards.length === 0 || !cards.every(card => card.matched)) {
            return;
        }

        setGameWon(true);
        if (highscore === 0 || turns < highscore) {
            setHighScore(turns);
            setCookie('HighScore', turns.toString());
        }
    }, [cards, gameWon, highscore, turns]);

    function handleNewGameClick() {
        shuffleCards();
        setTurns(0);
        setMatches(0);
        setChoiceOne(undefined);
        setChoiceTwo(undefined);
        setDisabled(false);
        setGameWon(false);
    }

    return (
        <section className={styles.gameContainer} aria-label="Emoji-Memory">
            <div className={styles.gameHeader}>
                <span>
                    <span className={styles.statusDot} aria-hidden="true" />
                    SPILL / EMOJI-MEMORY
                </span>
            </div>
            <div className={styles.gameFrame}>
                <section className={styles.scoreboard} aria-label="Spillstatistikk">
                    <div className={styles.stats}>
                        <span className={styles.label}>Trekk</span>
                        <span className={styles.value}>{turns}</span>
                    </div>
                    <div className={styles.stats}>
                        <span className={styles.label}>Par</span>
                        <span className={styles.value}>{matches} / {CARDS.length / 2}</span>
                    </div>
                    <div className={styles.stats}>
                        <span className={styles.label}>Rekord</span>
                        <span className={styles.value}>{highscore || '–'}</span>
                    </div>
                    <button type="button" className={styles.button} onClick={handleNewGameClick}>Start på nytt</button>
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
            <div className={styles.gameFooter}>
                <span>PAR: {matches} / {CARDS.length / 2}</span>
                <span>STATUS: {gameWon ? "FULLFØRT" : cards.length === 0 ? "LASTER" : "SPILLER"}</span>
            </div>
            {gameWon && <WinModal show={gameWon} matches={matches} turns={turns} onRestart={handleNewGameClick} />}
        </section>
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