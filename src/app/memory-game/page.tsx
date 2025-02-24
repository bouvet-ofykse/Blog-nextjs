import GameBoard from "@/components/memory-game/game-board";

export default function MemoryGamePage() {

    return(
        <main className='flex flex-col gap-5'>
            <GameBoard />
        </main>
    );
}