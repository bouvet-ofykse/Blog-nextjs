// components/twitch-drops/GameModal.tsx
import { useEffect } from "react";
import { Game } from "@/types/twitch-drops/game.type";
import styles from "./game-modal.module.css";
import Image from "next/image";
import Link from "next/link";

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
                <div className={styles.modalHeader}>
                    <Image src={game.gameBoxArtURL} alt={game.gameDisplayName} width={120} height={160} />
                    <div className={styles.headerDetails}>
                        <h2>{game.gameDisplayName}</h2>
                        <h3>{game.rewards[0].name}</h3>

                        <p className={styles.campaignEnd}>
                            Campaign ends in {Math.round((new Date(game.endAt).getTime() - Date.now()) / (1000 * 60 * 60))} hours
                        </p>
                        <p>{game.rewards[0].description}</p>
                        <p><Link href={game.rewards[0].detailsURL} target='_blank'>Check out the full details 🔗</Link><br/>
                        <Link href={game.rewards[0].accountLinkURL} target='_blank'>Link account 🔗</Link></p>

                    </div>
                </div>

                {game.rewards?.length ? (
                    <div className={styles.rewards}>
                        <h3>Drops & Rewards</h3>
                        {game.rewards.map((reward) => (
                            <div key={reward.id} className={styles.reward}>
                                {reward.timeBasedDrops.map((drop) => (
                                    <div key={drop.id} className={styles.drop}>

                                        <div className={styles.dropWrapper}>
                                            <Image src={drop.benefitEdges[0].benefit.imageAssetURL} alt='Drop reward' width={75} height={75}/>
                                            <div className={styles.rewardDetails}>
                                                <p><strong>{drop.name}</strong></p>
                                                <p className={styles.dropDetails}>
                                                    Watch {drop.requiredMinutesWatched} minutes.
                                                </p>
                                            </div>

                                        </div>
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
