export type GameState = "menu" | "playing" | "paused";

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

export interface GameData {
    player: Player;
    enemies: Enemy[];
    projectiles: Projectile[];
    score: number;
    state: GameState;
}