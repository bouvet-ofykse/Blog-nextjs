"use client"

import Image from "next/image";
import lightModeIcon from "@/content/icons/light-theme.svg";
import darkModeIcon from "@/content/icons/dark-theme.svg";
import {useEffect, useState} from "react";


export default function ThemeToggle() {

    const [activeTheme, setActiveTheme] = useState<string>('system');

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "system" || !savedTheme) {
            applySystemTheme();
            setActiveTheme("system");
        } else {
            applyTheme(savedTheme);
            setActiveTheme(savedTheme);
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = () => {
            if (!savedTheme || savedTheme === "system") {
                applySystemTheme();
            }
        };

        mediaQuery.addEventListener("change", handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
    }, []);

    const applyTheme = (theme: string) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleThemeChange = (newTheme: string) => {
        setActiveTheme(newTheme)
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'system') {
            applySystemTheme();
        } else {
            applyTheme(newTheme);
        }
    };

    const applySystemTheme = () => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemPrefersDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    if (activeTheme === 'dark') {
        return (
            <button onClick={() => handleThemeChange('light')} className='mx-4' title='Toggle dark mode'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#" viewBox="0 0 24 24" fill="none"
                     className='stroke-amber-400 hover:fill-amber-400'
                     stroke=""
                     strokeWidth="2">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>

            </button>
        )
    }

    return (
        <button onClick={() => handleThemeChange('dark')} className='mx-4' title='Toggle dark mode'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="" strokeWidth="2"
                 className='stroke-blue-950 hover:fill-blue-950'>
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
            {/*<img src={darkModeIcon.src} width={25} height={25} alt='Moon' className='stroke-amber-900'/>*/}
        </button>
    )
}



