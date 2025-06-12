'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './nav-bar.module.css';
import 'boxicons/css/boxicons.min.css';
import Image from "next/image";
import profilepic from '@/content/profile.png';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Archive', path: '/blog' },
    { name: 'Image analyzer', path: '/image-analysis' },
    { name: 'Emoji memory', path: '/memory-game' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    // On mount: read theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.body.classList.add('dark');
        } else if (savedTheme === 'light') {
            setDarkMode(false);
            document.body.classList.remove('dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
            document.body.classList.toggle('dark', prefersDark);
        }
        setMounted(true);
    }, []);

    // Update body class and localStorage when darkMode changes
    useEffect(() => {
        if (!mounted) return; // Skip initial run before mount
        document.body.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode, mounted]);

    // Close menu when path changes (optional)
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image src={profilepic} alt='Profile picture' width={70} height={70} className={styles.hero} />
                </Link>

                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className={styles.controls}>
                    <button
                        onClick={() => setDarkMode((prev) => !prev)}
                        aria-label="Toggle dark mode"
                        className={styles.themeToggle}
                    >
                        {darkMode &&
                        <i className={'bx bx-sun ' + styles.ThemeIconSun + ' ' + styles.icon }
                            aria-hidden="true"
                        /> }
                        {!darkMode &&
                        <i
                            className={'bx bx-moon ' + styles.ThemeIconMoon + ' '  + styles.icon}
                            aria-hidden="true"
                        />
                        }
                    </button>
                    <a
                        href="https://github.com/bouvet-ofykse"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className={styles.githubLink}
                    >
                        <i className="bx bxl-github" aria-hidden="true" />
                    </a>

                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        className={styles.hamburger}
                    >
                        ☰
                    </button>
                </div>
            </div>
        </header>
    );
}
