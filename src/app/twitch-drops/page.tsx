
import { getTwitchDrops } from "@/actions/sunkwi";
import GamesLayout from "@/components/twitch-drops/games";

export default async function Page() {

    try {
        const games = await getTwitchDrops();
        console.log('games', games);
    } catch (error) {
        console.log('error', error);
        return (
            <main>
                <h1>Error</h1>
                <p>Failed to load Twitch Drops. Please try again later.</p>
            </main>
        );
    }
    const games = await getTwitchDrops();

    return (
        <main>
            <h1>🎮 Active Twitch Drops</h1>
            <p>
                Stay up to date with the latest active Twitch Drops across various games — all in one place. This page
                shows currently live drops that you can claim by watching Twitch streams.
            </p>
            <p>
                Drop data is powered by the Sunkwi Twitch Drops API. Big thanks to the contributors for making this
                information available.
            </p>
            <p>
                🚧 This page is still under development, so expect some changes and improvements in the future.
            </p>

            <GamesLayout games={games}/>
        </main>
    );
}