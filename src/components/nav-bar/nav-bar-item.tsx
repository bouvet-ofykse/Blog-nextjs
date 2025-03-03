'use client';

import styles from "@/components/nav-bar/nav-bar.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface NavbarItemProps {
    name: string;
    path: string;
}

export default function NavbarItem({name, path}: NavbarItemProps) {

    const pathname = usePathname();

    const classes = pathname === path ? `${styles['nav-bar-item']} ${styles['nav-bar-item-active']}` : styles['nav-bar-item'];

    return (
        <li className={classes}>
            <Link href={path}>{name}</Link>
        </li>
    );

}