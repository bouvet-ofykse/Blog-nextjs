'use client';

import SingleCard from "@/components/memory-game/single-card";
import {Card} from "@/types/card.type";
import {CARDS} from '@/lib/memory-cards'
import {useEffect, useState} from "react";

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
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
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
        <div id='gameBoard'>
            <section
                className='w-2/3 mx-auto mb-6 flex flex-row justify-between bg-gray-300 dark:bg-gray-700  p-4 rounded-lg items-center'>
                <p className='text-gray-800 dark:text-gray-200'>Turns: {turns}</p>
                <p className='text-gray-800 dark:text-gray-200'>Score: {score}</p>
                <button onClick={handleNewGameClick} className=' border-gray-600 border-2 bg-white p-2 dark:bg-gray-400 dark:text-gray-800 dark:border-none rounded-lg'>New game</button>
            </section>
            <div className='w-2/3 mx-auto grid grid-cols-6 grid-rows-4 justify-between'>
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