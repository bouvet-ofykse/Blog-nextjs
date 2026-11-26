export type GameState = "menu" | "playing" | "paused" | "gameover";

export interface Player {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

export interface Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Projectile {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

export interface EnemyProjectile {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

export interface GameData {
    player: Player;
    enemies: Enemy[];
    projectiles: Projectile[];
    enemyProjectiles: EnemyProjectile[];
    particles: Particle[];
    score: number;
    lives: number;
    state: GameState;
    invulnerabilityTimer: number;
    wave: number;
    waveTransitionTimer: number;
}

export interface Particle {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    size: number;
    life: number;
    maxLife: number;
    color: string;
}