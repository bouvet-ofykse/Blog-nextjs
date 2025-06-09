---
title: 'Testinnlegg 2'
date: '2025-05-24'
author: 'Olav Fykse'
---

# Dummyinnlegg for testing

Next.js er et populært rammeverk for React som gjør det enklere å bygge moderne, raskt lastende webapplikasjoner. Det er utviklet av Vercel og har fått stor popularitet de siste årene på grunn av sine sterke funksjoner for server-side rendering, statisk generering og enkel integrasjon med API-er.

I denne artikkelen vil vi utforske de viktigste funksjonene og fordelene ved å bruke Next.js.


```tsx
export default function NavbarItem({name, path}: NavbarItemProps) {

const pathname = usePathname();

const classes = pathname === path ? `${styles['nav-bar-item']} ${styles['nav-bar-item-active']}` : styles['nav-bar-item'];

return (
    <li className={classes}>
        <Link href={path}>{name}</Link>
    </li>
);

}
```