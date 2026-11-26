const HIGH_SCORE_KEY = "bug-invaders-highscore";


export function getHighScore(): number {
    if (typeof window === "undefined") return 0;

    return Number(
        localStorage.getItem(HIGH_SCORE_KEY) ?? 0
    );
}

export function saveHighScore(score: number): number {
    const currentHighScore = getHighScore();

    if (score > currentHighScore) {
        localStorage.setItem(
            HIGH_SCORE_KEY,
            score.toString()
        );

        return score;
    }

    return currentHighScore;
}