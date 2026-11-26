import {
    GAME_WIDTH,
    GAME_HEIGHT,
    COLORS, PLAYER_CONFIG, ENEMY_TYPES
} from "./constants";

import type { GameData } from "./types";

export function renderGame(
    ctx: CanvasRenderingContext2D,
    game: GameData
) {
    // Background
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    drawGrid(ctx);
    drawStars(ctx);
    drawPlayer(ctx, game);
    drawEnemies(ctx, game);
    drawEnemyProjectiles(ctx, game);
    drawProjectiles(ctx, game);
    drawParticles(ctx, game);
    drawWaveTransition(ctx, game);
    drawHUD(ctx, game);
}

function drawGrid(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.35;

    for (let x = 0; x < GAME_WIDTH; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, GAME_HEIGHT);
        ctx.stroke();
    }

    for (let y = 0; y < GAME_HEIGHT; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(GAME_WIDTH, y);
        ctx.stroke();
    }

    ctx.globalAlpha = 1;
}

function drawStars(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#526581";

    for (let i = 0; i < 55; i++) {
        const x = (i * 137.5) % GAME_WIDTH;
        const y = (i * 79.3) % GAME_HEIGHT;

        ctx.fillRect(x, y, 2, 2);
    }
}

function drawPlayer(
    ctx: CanvasRenderingContext2D,
    game: GameData
) {
    const { x, y, width, height } = game.player;

    // Blink while invulnerable
    if (game.invulnerabilityTimer > 0) {
        const blinkInterval = PLAYER_CONFIG.blinkInterval;

        const blinkPhase = Math.floor(
            game.invulnerabilityTimer / blinkInterval
        );

        if (blinkPhase % 2 === 0) {
            return;
        }
    }

    ctx.save();

    ctx.shadowColor = COLORS.player;
    ctx.shadowBlur = 15;
    ctx.fillStyle = COLORS.player;

    ctx.beginPath();
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + width / 2, y + height - 8);
    ctx.lineTo(x, y + height);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function drawEnemies(
    ctx: CanvasRenderingContext2D,
    game: GameData
) {
    game.enemies.forEach((enemy, index) => {
        ctx.save();

        const color = {
            basic: index % 3 === 0 ? "#ff718d" : COLORS.enemy,
            fast: ENEMY_TYPES.fast.color,
            tank: ENEMY_TYPES.tank.color,
        }[enemy.type];

        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = enemy.type === "tank" ? 12 : 8;

        const { x, y, width, height } = enemy;

        // Original enemy shape
        ctx.fillRect(x + 5, y, width - 10, height);
        ctx.fillRect(x, y + 6, width, height - 12);

        // Eyes
        ctx.fillStyle = COLORS.background;
        ctx.fillRect(x + 9, y + 8, 5, 5);
        ctx.fillRect(x + width - 14, y + 8, 5, 5);

        // Tank health indicator
        if (enemy.type === "tank") {
            ctx.shadowBlur = 0;

            const healthPercentage =
                enemy.health / enemy.maxHealth;

            ctx.fillStyle = "#333344";
            ctx.fillRect(x, y - 6, width, 3);

            if (healthPercentage > 0.7) {
                ctx.fillStyle = "#38e8a5";
            } else if (healthPercentage > 0.5) {
                ctx.fillStyle = "#c79724";
            } else {
                ctx.fillStyle = "#ff718d";
            }
            ctx.fillRect(
                x,
                y - 6,
                width * healthPercentage,
                3
            );
        }

        ctx.restore();
    });
}

function drawEnemyProjectiles(
    ctx: CanvasRenderingContext2D,
    game: GameData
) {
    ctx.save();

    ctx.fillStyle = "#ff718d";
    ctx.shadowColor = "#ff718d";
    ctx.shadowBlur = 12;

    game.enemyProjectiles.forEach((projectile) => {
        ctx.fillRect(
            projectile.x,
            projectile.y,
            projectile.width,
            projectile.height
        );
    });

    ctx.restore();
}

function drawProjectiles(
    ctx: CanvasRenderingContext2D,
    game: GameData
) {
    ctx.save();

    ctx.fillStyle = COLORS.projectile;
    ctx.shadowColor = COLORS.projectile;
    ctx.shadowBlur = 12;

    game.projectiles.forEach((projectile) => {
        ctx.fillRect(
            projectile.x,
            projectile.y,
            projectile.width,
            projectile.height
        );
    });

    ctx.restore();
}

function drawParticles(
    ctx: CanvasRenderingContext2D,
    game: GameData
) {
    ctx.save();

    game.particles.forEach((particle) => {
        const opacity = Math.max(
            0,
            particle.life / particle.maxLife
        );

        ctx.globalAlpha = opacity;
        ctx.fillStyle = particle.color;

        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.size * opacity,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });

    ctx.restore();
}

function drawWaveTransition(
    ctx: CanvasRenderingContext2D,
    game: GameData
) {
    if (game.waveTransitionTimer <= 0) {
        return;
    }

    ctx.save();

    ctx.fillStyle = "rgba(8, 13, 25, 0.65)";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.shadowColor = "#55d9ff";
    ctx.shadowBlur = 20;

    ctx.fillStyle = "#55d9ff";
    ctx.font = "bold 42px monospace";
    ctx.fillText(`WAVE ${game.wave}`, GAME_WIDTH / 2, GAME_HEIGHT / 2);

    ctx.shadowBlur = 0;
    ctx.fillStyle = COLORS.muted;
    ctx.font = "16px monospace";
    ctx.fillText(
        "GET READY",
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 + 45
    );

    ctx.restore();
}

function drawHUD(
    ctx: CanvasRenderingContext2D,
    game: GameData
) {
    ctx.fillStyle = COLORS.text;
    ctx.font = "bold 15px monospace";

    ctx.textAlign = "left";
    ctx.fillStyle = COLORS.text;
    ctx.font = "16px monospace";

    ctx.fillText(`LIVES: ${game.lives}`, 20, 30);


    ctx.textAlign = "center";
    ctx.fillStyle = COLORS.player;
    ctx.fillText(
        `SCORE: ${game.score.toString().padStart(5, "0")}`,
        GAME_WIDTH / 2,
        32
    );

    ctx.textAlign = "right";
    ctx.fillStyle = COLORS.muted;
    ctx.fillText(`WAVE ${game.wave}`, GAME_WIDTH - 20, 30);

    ctx.strokeStyle = COLORS.grid;
    ctx.beginPath();
    ctx.moveTo(20, 48);
    ctx.lineTo(GAME_WIDTH - 20, 48);
    ctx.stroke();
}