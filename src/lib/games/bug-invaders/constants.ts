export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const COLORS = {
    background: "#080d19",
    grid: "#18243a",
    player: "#38e8a5",
    enemy: "#b58aff",
    projectile: "#55d9ff",
    text: "#e8f0ff",
    muted: "#8291aa",
};

export const PLAYER_CONFIG = {
    width: 42,
    height: 30,
    speed: 360,
    bottomOffset: 45,
    startingLives: 3,
    invulnerabilityDuration: 1.5,
    blinkInterval: 0.1,
};

export const ENEMY_CONFIG = {
    rows: 3,
    columns: 8,
    width: 34,
    height: 26,
    horizontalGap: 20,
    verticalGap: 24,
};

export const ENEMY_PROJECTILE_CONFIG = {
    width: 6,
    height: 14,
    speed: 260,
    minShootInterval: 1.0,
    maxShootInterval: 2.0,
};

export const WAVE_CONFIG = {
    transitionDuration: 2.5,
    enemySpeedIncrease: 0.12,
    maxEnemySpeedMultiplier: 2.5,
};

export const ENEMY_TYPES = {
    basic: {
        health: 1,
        scoreValue: 10,
        speedMultiplier: 1,
        color: "#b58aff",
    },
    fast: {
        health: 1,
        scoreValue: 20,
        speedMultiplier: 1.8,
        color: "#55d9ff",
    },
    tank: {
        health: 3,
        scoreValue: 50,
        speedMultiplier: 0.7,
        color: "#6acc48",
    },
};