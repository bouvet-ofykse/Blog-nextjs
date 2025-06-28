// components/twitch-drops/GameModal.tsx
import { useEffect } from "react";
import { Game } from "@/types/twitch-drops/game.type";
import styles from "./game-modal.module.css";
import Image from "next/image";

type Props = {
    game: Game | null;
    onClose: () => void;
};

export default function GameModal({ game, onClose }: Props) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    if (!game) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={styles.close}>×</button>
                <h2>{game.gameDisplayName}</h2>
                <img src={game.gameBoxArtURL} alt={game.gameDisplayName} className={styles.image} />

                {game.rewards?.length ? (
                    <div className={styles.rewards}>
                        <h3>Drops & Rewards</h3>
                        {game.rewards.map((reward) => (
                            <div key={reward.id} className={styles.reward}>
                                <p><strong>{reward.name}</strong></p>
                                {reward.timeBasedDrops.map((drop) => (
                                    <div key={drop.id} className={styles.drop}>
                                        <p></p>
                                        <p>🎁 <strong>{drop.name}</strong></p>
                                        <Image src={drop.benefitEdges[0].benefit.imageAssetURL} alt='Drop reward' width={160} height={160}/>
                                        <p>Requirement: Watch {drop.requiredMinutesWatched} minutes</p>
                                        <p>
                                            {new Date(drop.startAt).toLocaleDateString()}{' '}{new Date(drop.startAt).toLocaleTimeString()}{" - "}
                                            {new Date(drop.endAt).toLocaleDateString()}{' '}{new Date(drop.endAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No drops found.</p>
                )}
            </div>
        </div>
    );
}
