"use client"

import Image from "next/image";
import lightModeIcon from "@/content/icons/light-theme.svg";
import darkModeIcon from "@/content/icons/dark-theme.svg";
import {useState} from "react";


export default function DarkModeToggle() {


    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark')
    }


    const icon = <Image src={lightModeIcon.src} width={25} height={25} alt='Sun' className='hover:text-yellow-500'/>
    // const icon = <Image src={darkModeIcon.src} width={25} height={25} alt='Moon' className='hover:text-blue-950'/>

    return (
        <button onClick={toggleTheme}>
            {icon}
        </button>

    )
}



