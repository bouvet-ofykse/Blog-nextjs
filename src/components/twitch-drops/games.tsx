'use client';

import {Game} from "@/types/twitch-drops/game.type";
import styles from "@/components/twitch-drops/games.module.css";
import GameCard from "@/components/twitch-drops/card/game-card";
import {useState} from "react";
import GameModal from "@/components/twitch-drops/game-modal/game-modal";

export default function Games({ games }: { games: Game[] }) {

    const [search, setSearch] = useState('');
    const [gamesShown, setGamesShown] = useState(games);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    function handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {

        const searchValue = event.target.value.toLowerCase();
        setSearch(searchValue);
        const filteredGames = games.filter((game) =>
            game.gameDisplayName.toLowerCase().includes(searchValue)
        );
        setGamesShown(filteredGames);
    }

    return (
        <>
            <input type='text' placeholder='Search..' onChange={handleSearchInput} className={styles.searchInput}/>
            <p>{search ? `Showing ${gamesShown.length} results for "${search}"` : 'Showing all games'}</p>
            <section className={styles.cardLayout}>
                {gamesShown.map((game: Game) => (
                    <div key={game.gameId} onClick={() => setSelectedGame(game)}>

                        <GameCard
                            title={game.gameDisplayName}
                            description={`Campaign ends in ${Math.round((new Date(game.endAt).getTime() - Date.now()) / (1000 * 60 * 60))} hours`}
                            rewards={`${game.rewards.length} reward(s) available`}
                            image={game.gameBoxArtURL}
                        />
                    </div>
                ))}
            </section>

            <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
        </>
    );
}