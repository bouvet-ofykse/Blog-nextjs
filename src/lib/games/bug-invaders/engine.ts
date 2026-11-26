import {
    GAME_WIDTH,
    GAME_HEIGHT,
    PLAYER_CONFIG,
    ENEMY_CONFIG, ENEMY_PROJECTILE_CONFIG
} from "./constants";
import {checkPlayerCollision, checkProjectileEnemyCollision} from "./collision";

import type {GameData, Enemy, Projectile, EnemyProjectile} from "./types";
import { Input } from "./input";

export function createGame(): GameData {
    const player = {
        x: GAME_WIDTH / 2 - PLAYER_CONFIG.width / 2,
        y: GAME_HEIGHT - PLAYER_CONFIG.bottomOffset - PLAYER_CONFIG.height,
        width: PLAYER_CONFIG.width,
        height: PLAYER_CONFIG.height,
        speed: PLAYER_CONFIG.speed,
        invulnerabilityTimer: 0,
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
        enemyProjectiles: [],
        particles: [],
        lives: PLAYER_CONFIG.startingLives,
        score: 0,
        state: "playing",
        invulnerabilityTimer: 0,
    };
}

export class GameEngine {
    data: GameData;
    private input: Input;
    private enemyDirection = 1;
    private enemySpeed = 35;
    private shootCooldown = 0;
    private enemyShootCooldown = 1.5;

    constructor(input: Input) {
        this.input = input;
        this.data = createGame();
    }

    update(deltaTime: number) {

        if (this.data.state !== "playing") {
            return;
        }

        this.updateParticles(deltaTime);

        // Update player invulnerability
        if (this.data.invulnerabilityTimer > 0) {
            this.data.invulnerabilityTimer = Math.max(
                0,
                this.data.invulnerabilityTimer - deltaTime
            );
        }

        const { player, projectiles, enemies } = this.data;

        // Player movement
        this.updatePlayer(deltaTime);

        // Shooting
        this.shootCooldown -= deltaTime;

        const keyboardShooting = this.input.isPressed(" ");
        const mobileShooting = this.input.getPointerPosition() !== null;

        if (
            (keyboardShooting || mobileShooting) &&
            this.shootCooldown <= 0
        ) {
            this.shoot();
            this.shootCooldown = 0.25;
        }

        // Enemy shooting
        this.enemyShootCooldown -= deltaTime;

        if (
            enemies.length > 0 &&
            this.enemyShootCooldown <= 0
        ) {
            this.shootEnemy();

            const {
                minShootInterval,
                maxShootInterval,
            } = ENEMY_PROJECTILE_CONFIG;

            this.enemyShootCooldown =
                minShootInterval +
                Math.random() * (maxShootInterval - minShootInterval);
        }

        // Enemy projectile movement
        const enemyProjectiles = this.data.enemyProjectiles;

        for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
            const projectile = enemyProjectiles[i];

            projectile.y += projectile.speed * deltaTime;

            if (projectile.y > GAME_HEIGHT) {
                enemyProjectiles.splice(i, 1);
            }
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
        this.checkCollisions();
        this.checkPlayerCollisions();
    }

    private shootEnemy() {
        const enemies = this.data.enemies;

        if (enemies.length === 0) {
            return;
        }

        // Velg en tilfeldig fiende
        const enemy = enemies[
            Math.floor(Math.random() * enemies.length)
            ];

        const projectile: EnemyProjectile = {
            x: enemy.x + enemy.width / 2 - ENEMY_PROJECTILE_CONFIG.width / 2,
            y: enemy.y + enemy.height,
            width: ENEMY_PROJECTILE_CONFIG.width,
            height: ENEMY_PROJECTILE_CONFIG.height,
            speed: ENEMY_PROJECTILE_CONFIG.speed,
        };

        this.data.enemyProjectiles.push(projectile);
    }


    private createExplosion(
        x: number,
        y: number,
        colors: string[] = [
            "#ff718d",
            "#ff9f43",
            "#ffd166",
            "#ffffff",
        ],
        particleCount = 18
    ) {
        for (let i = 0; i < particleCount; i++) {
            const angle =
                (Math.PI * 2 * i) / particleCount +
                (Math.random() - 0.5) * 0.4;

            const speed = 80 + Math.random() * 180;
            const life = 0.25 + Math.random() * 0.35;

            this.data.particles.push({
                x,
                y,
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
                size: 2 + Math.random() * 4,
                life,
                maxLife: life,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
    }

    isPlayerInvulnerable(): boolean {
        return this.data.invulnerabilityTimer > 0;
    }

    private checkPlayerCollisions() {
        const result = checkPlayerCollision(
            this.data.player,
            this.data.enemyProjectiles
        );

        this.data.enemyProjectiles = result.remainingProjectiles;

        if (result.hit) {
            this.damagePlayer();
        }
    }

    private damagePlayer() {
        if (this.data.state !== "playing") {
            return;
        }

        if (this.data.invulnerabilityTimer > 0) {
            return;
        }

        const player = this.data.player;

        // Create explosion at the center of the player
        this.createExplosion(
            player.x + player.width / 2,
            player.y + player.height / 2
        );

        this.data.lives -= 1;

        if (this.data.lives <= 0) {
            this.data.lives = 0;
            this.data.state = "gameover";
            return;
        }

        this.data.invulnerabilityTimer =
            PLAYER_CONFIG.invulnerabilityDuration;
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

        for (const enemy of result.hitEnemies) {
            this.createExplosion(
                enemy.x + enemy.width / 2,
                enemy.y + enemy.height / 2,
                ["#b58aff", "#55d9ff", "#ffffff"],
                10
            );
        }
    }

    private updateParticles(deltaTime: number) {
        const particles = this.data.particles;

        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];

            particle.x += particle.velocityX * deltaTime;
            particle.y += particle.velocityY * deltaTime;

            particle.life -= deltaTime;

            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    destroy() {
        // Reserved for future cleanup.
    }
}