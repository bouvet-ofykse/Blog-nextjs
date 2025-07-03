'use client';

import {Game} from "@/types/twitch-drops/game.type";
import styles from "@/components/twitch-drops/game-layout/game-layout.module.css";
import GameCard from "@/components/twitch-drops/card/game-card";
import {useState} from "react";
import GameModal from "@/components/twitch-drops/game-modal/game-modal";

export default function GameLayout({ games }: { games: Game[] }) {

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

    function formatTimeLeft(milliseconds: number): string {

        const minutes = Math.round(milliseconds / (1000 * 60));
        const hours = Math.round(minutes / 60);
        const remainderMinutes = minutes % 60;
        const days = Math.floor(hours / 24);

        if (minutes < 60) {
            return `${minutes} minutes`
        }
        if (days >= 2) {
            return `> ${days} days`
        }
        return `${hours}h ${remainderMinutes}m`;
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
                            description={`Ends in ${formatTimeLeft((new Date(game.endAt).getTime() - Date.now()))}`}
                            rewards={`${game.rewards[0].timeBasedDrops.length} ${game.rewards[0].timeBasedDrops.length === 1 ? 'reward' : 'rewards'} available`}
                            image={game.gameBoxArtURL}
                        />
                    </div>
                ))}
            </section>

            <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
        </>
    );
}