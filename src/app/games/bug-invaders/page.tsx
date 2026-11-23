import Game from "@/components/games/bug-invaders/game";

export const metadata = {
    title: "Bug Invaders | ofykse.no",
    description: "Defend your application against invading bugs.",
};

export default function BugInvadersPage() {
    return (
        <main>
            <div style={{
                maxWidth: "900px",
                margin: "60px auto 20px",
                padding: "0 20px",
            }}>
                <p style={{
                    color: "#38e8a5",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    letterSpacing: "2px",
                }}>
                    OFYKSE.NO / ARCADE
                </p>

                <h1>Bug Invaders</h1>

                <p>
                    Your application is under attack.
                    How long can you survive?
                </p>
            </div>

            <Game />
        </main>
    );
}