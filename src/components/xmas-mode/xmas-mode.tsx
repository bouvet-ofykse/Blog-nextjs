'use client';

import { useEffect, useState } from 'react';
import styles from './xmas-mode.module.css';

const snowflakes = Array.from({ length: 28 }, (_, index) => ({
    left: `${(index * 37) % 100}%`,
    delay: `${-((index * 13) % 18)}s`,
    duration: `${12 + ((index * 7) % 12)}s`,
    size: `${2 + ((index * 5) % 3)}px`,
}));

export function isChristmasMode(date: Date) {
    return date.getMonth() === 11;
}

export default function XmasMode() {
    const [christmasMode, setChristmasMode] = useState(false);

    useEffect(() => {
        const updateChristmasMode = () => {
            setChristmasMode(isChristmasMode(new Date()));
        };

        updateChristmasMode();
        const interval = window.setInterval(updateChristmasMode, 60_000);
        return () => window.clearInterval(interval);
    }, []);

    if (!christmasMode) return null;

    return (
        <>
            <div className={styles.christmasLights} aria-hidden="true">
                {Array.from({ length: 32 }, (_, index) => (
                    <span
                        key={index}
                        className={styles.light}
                        style={{ animationDelay: `${(index % 5) * 0.3}s` }}
                    />
                ))}
            </div>
            <div className={styles.snowfall} aria-hidden="true">
                {snowflakes.map((flake, index) => (
                    <span
                        key={index}
                        className={styles.snowflake}
                        style={{
                            left: flake.left,
                            animationDelay: flake.delay,
                            animationDuration: flake.duration,
                            width: flake.size,
                            height: flake.size,
                        }}
                    />
                ))}
            </div>
        </>
    );
}
