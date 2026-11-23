import type { Enemy, Projectile } from "./types";

export function intersects(
    a: {
        x: number;
        y: number;
        width: number;
        height: number;
    },
    b: {
        x: number;
        y: number;
        width: number;
        height: number;
    }
): boolean {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

export function checkProjectileEnemyCollision(
    projectiles: Projectile[],
    enemies: Enemy[]
): {
    remainingProjectiles: Projectile[];
    remainingEnemies: Enemy[];
    score: number;
} {
    const remainingProjectiles = [...projectiles];
    const remainingEnemies = [...enemies];

    let score = 0;

    for (let p = remainingProjectiles.length - 1; p >= 0; p--) {
        const projectile = remainingProjectiles[p];

        const enemyIndex = remainingEnemies.findIndex((enemy) =>
            intersects(projectile, enemy)
        );

        if (enemyIndex !== -1) {
            remainingProjectiles.splice(p, 1);
            remainingEnemies.splice(enemyIndex, 1);

            score += 10;
        }
    }

    return {
        remainingProjectiles,
        remainingEnemies,
        score,
    };
}