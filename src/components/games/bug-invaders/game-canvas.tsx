"use client";

import { useEffect, useRef } from "react";

import {
    GAME_WIDTH,
    GAME_HEIGHT,
} from "@/lib/games/bug-invaders/constants";

import { GameEngine } from "@/lib/games/bug-invaders/engine";
import { Input } from "@/lib/games/bug-invaders/input";
import { renderGame } from "@/lib/games/bug-invaders/renderer";

interface GameCanvasProps {
    active: boolean;
}

export default function GameCanvas({ active }: GameCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const activeRef = useRef(active);

    activeRef.current = active;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const input = new Input();
        const engine = new GameEngine(input);

        let animationId = 0;
        let previousTime = 0;
        let running = true;

        const loop = (timestamp: number) => {
            if (!running) return;

            const deltaTime = previousTime
                ? Math.min((timestamp - previousTime) / 1000, 0.05)
                : 0;

            previousTime = timestamp;

            if (activeRef.current) {
                engine.update(deltaTime);
            }

            renderGame(ctx, engine.data);

            animationId = requestAnimationFrame(loop);
        };

        animationId = requestAnimationFrame(loop);

        return () => {
            running = false;
            cancelAnimationFrame(animationId);
            input.destroy();
            engine.destroy();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="bugInvadersCanvas"
            aria-label="Bug Invaders game"
        />
    );
}