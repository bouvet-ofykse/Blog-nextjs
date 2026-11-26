import {
    GAME_WIDTH,
    GAME_HEIGHT,
    COLORS, PLAYER_CONFIG,
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

        ctx.fillStyle = index % 3 === 0
            ? "#ff718d"
            : COLORS.enemy;

        ctx.shadowColor = COLORS.enemy;
        ctx.shadowBlur = 8;

        const { x, y, width, height } = enemy;

        ctx.fillRect(x + 5, y, width - 10, height);
        ctx.fillRect(x, y + 6, width, height - 12);

        // Eyes
        ctx.fillStyle = COLORS.background;
        ctx.fillRect(x + 9, y + 8, 5, 5);
        ctx.fillRect(x + width - 14, y + 8, 5, 5);

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
    ctx.fillText(
        `BUGS: ${game.enemies.length}`,
        GAME_WIDTH - 24,
        32
    );

    ctx.strokeStyle = COLORS.grid;
    ctx.beginPath();
    ctx.moveTo(20, 48);
    ctx.lineTo(GAME_WIDTH - 20, 48);
    ctx.stroke();
}