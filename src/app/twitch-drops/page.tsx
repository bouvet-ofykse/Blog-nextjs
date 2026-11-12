
import { getTwitchDrops } from "@/actions/sunkwi";
import GameLayout from "@/components/twitch-drops/game-layout/game-layout";

export const dynamic = "force-dynamic";

export default async function Page() {
    let games: Awaited<ReturnType<typeof getTwitchDrops>>;

    try {
        games = await getTwitchDrops();
    } catch (error) {
        console.error("Failed to load Twitch Drops:", error);
        return (
            <main>
                <h1>Error</h1>
                <p>Failed to load Twitch Drops. Please try again later.</p>
            </main>
        );
    }

    return (
        <main>
            <h1>🎮 Aktive Twitch Drops</h1>
            <p>
                Hold deg oppdatert med de nyeste aktive Twitch Drops på tvers av ulike spill — alt på ett sted. Denne siden
                er laget for å vise en oversikt over de Twitch-dropsene som er tilgjengelige akkurat nå
            </p>
            <p>
                Dataene for Twitch Drops hentes fra Sunkwi Twitch Drops API. Stor takk til bidragsyterne for å gjøre denne
                informasjonen tilgjengelig
            </p>

            <GameLayout games={games}/>
        </main>
    );
}