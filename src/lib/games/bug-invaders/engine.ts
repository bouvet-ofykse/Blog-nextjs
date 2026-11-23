import {
    GAME_WIDTH,
    GAME_HEIGHT,
    PLAYER_CONFIG,
    ENEMY_CONFIG,
} from "./constants";
import { checkProjectileEnemyCollision } from "./collision";

import type { GameData, Enemy, Projectile } from "./types";
import { Input } from "./input";

export function createGame(): GameData {
    const player = {
        x: GAME_WIDTH / 2 - PLAYER_CONFIG.width / 2,
        y: GAME_HEIGHT - PLAYER_CONFIG.bottomOffset - PLAYER_CONFIG.height,
        width: PLAYER_CONFIG.width,
        height: PLAYER_CONFIG.height,
        speed: PLAYER_CONFIG.speed,
    };

    const enemies: Enemy[] = [];

    const totalWidth =
        ENEMY_CONFIG.columns * ENEMY_CONFIG.width +
        (ENEMY_CONFIG.columns - 1) * ENEMY_CONFIG.horizontalGap;

    const startX = (GAME_WIDTH - totalWidth) / 2;

    for (let row = 0; row < ENEMY_CONFIG.rows; row++) {
        for (let col = 0; col < ENEMY_CONFIG.columns; col++) {
            enemies.push({
                x: startX + col * (
                    ENEMY_CONFIG.width + ENEMY_CONFIG.horizontalGap
                ),
                y: 100 + row * (
                    ENEMY_CONFIG.height + ENEMY_CONFIG.verticalGap
                ),
                width: ENEMY_CONFIG.width,
                height: ENEMY_CONFIG.height,
            });
        }
    }

    return {
        player,
        enemies,
        projectiles: [],
        score: 0,
        state: "playing",
    };
}

export class GameEngine {
    data: GameData;
    private input: Input;
    private enemyDirection = 1;
    private enemySpeed = 35;
    private shootCooldown = 0;

    constructor(input: Input) {
        this.input = input;
        this.data = createGame();
    }

    update(deltaTime: number) {
        const { player, projectiles, enemies } = this.data;

        // Player movement
        if (
            this.input.isPressed("arrowleft") ||
            this.input.isPressed("a")
        ) {
            player.x -= player.speed * deltaTime;
        }

        if (
            this.input.isPressed("arrowright") ||
            this.input.isPressed("d")
        ) {
            player.x += player.speed * deltaTime;
        }

        player.x = Math.max(
            0,
            Math.min(GAME_WIDTH - player.width, player.x)
        );

        // Shooting
        this.shootCooldown -= deltaTime;

        if (
            this.input.isPressed(" ") &&
            this.shootCooldown <= 0
        ) {
            this.shoot();
            this.shootCooldown = 0.25;
        }

        // Projectile movement
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const projectile = projectiles[i];

            projectile.y -= projectile.speed * deltaTime;

            if (projectile.y + projectile.height < 0) {
                projectiles.splice(i, 1);
            }
        }

        // Enemy movement
        let shouldMoveDown = false;

        for (const enemy of enemies) {
            enemy.x += this.enemyDirection * this.enemySpeed * deltaTime;

            if (
                enemy.x <= 10 ||
                enemy.x + enemy.width >= GAME_WIDTH - 10
            ) {
                shouldMoveDown = true;
            }
        }

        if (shouldMoveDown) {
            this.enemyDirection *= -1;

            for (const enemy of enemies) {
                enemy.y += 15;
            }
        }
        this.checkCollisions()
    }

    private shoot() {
        const player = this.data.player;

        const projectile: Projectile = {
            x: player.x + player.width / 2 - 3,
            y: player.y,
            width: 6,
            height: 16,
            speed: 550,
        };

        this.data.projectiles.push(projectile);
    }



    private updatePlayer(deltaTime: number) {
        const { player } = this.data;
        const pointerX = this.input.getPointerPosition();

        if (pointerX !== null) {
            const targetX = Math.max(
                0,
                Math.min(
                    GAME_WIDTH - player.width,
                    pointerX - player.width / 2
                )
            );

            // Smooth movement towards the finger
            const smoothing = 1 - Math.exp(-18 * deltaTime);

            player.x += (targetX - player.x) * smoothing;

            return;
        }

        // Keyboard movement
        if (
            this.input.isPressed("arrowleft") ||
            this.input.isPressed("a")
        ) {
            player.x -= player.speed * deltaTime;
        }

        if (
            this.input.isPressed("arrowright") ||
            this.input.isPressed("d")
        ) {
            player.x += player.speed * deltaTime;
        }

        player.x = Math.max(
            0,
            Math.min(GAME_WIDTH - player.width, player.x)
        );
    }


    private checkCollisions() {
        const result = checkProjectileEnemyCollision(
            this.data.projectiles,
            this.data.enemies
        );

        this.data.projectiles = result.remainingProjectiles;
        this.data.enemies = result.remainingEnemies;
        this.data.score += result.score;
    }

    destroy() {
        // Reserved for future cleanup.
    }
}