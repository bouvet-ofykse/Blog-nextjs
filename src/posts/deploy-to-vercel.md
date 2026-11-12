---
title: 'Deploy en Next.js-applikasjon til Vercel'
description:
  En kort, guide for å deploye din Next.js-applikasjon til Vercel.
date: '2025-02-04'
author: 'Olav Fykse'
draft: false
image: '/blog/images/vercel.png'
tags:
  - CI/CD
  - Vercel
  - NextJS
  - React
---

Du har laget en helt fantastisk Next.js-applikasjon, men hva gjør vel det når det er bare du som kan bruke den? La oss ta en titt på hvordan denne kan publiseres på nettet, slik at alle kan få glede av den. Her er det mange veier til rom, men vi skal se på en av de enkleste og mest populære, hvertfall for hobbybruk: **Vercel**.

Vercel er en hostingplattform med innebygd støtte for Next.js (Skulle bare mangle si😅). Her er en kort, teknisk steg-for-steg-guide for å deploye en Next.js-applikasjon.

![image](/blog/images/git-vercel.png)


## Steg 1: Push prosjektet til Git

Start med å pushe Next.js-prosjektet til et GitHub-repository.

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

## Steg 2: Opprett et prosjekt på Vercel

1. Gå til [vercel.com](https://vercel.com).
2. Logg inn med GitHub-kontoen din.
3. Velg **Add New Project**.
4. Importer GitHub-repositoryet ditt.
5. Vercel oppdager automatisk at prosjektet bruker Next.js.

## Steg 3: Konfigurer miljøvariabler

Hvis applikasjonen bruker miljøvariabler, må disse legges inn under **Settings → Environment Variables** i Vercel.

Eksempel:

```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_API_URL=https://api.example.com
```

Husk at variabler med prefikset `NEXT_PUBLIC_` blir eksponert til klienten, putt derfor aldri sensitive verdier her.

## Steg 4: Deploy applikasjonen

Klikk på **Deploy** for å starte deploy-prosessen.

Vercel vil automatisk:

- Installere avhengigheter.
- Kjøre build-kommandoen (`next build`).
- Generere en produksjonsdeploy.
- Tilgjengeliggjøre applikasjonen via en URL.

## Steg 5: Automatiser fremtidige deploys

Når GitHub-repositoryet er koblet til Vercel, blir deploy-prosessen automatisert:

- Push til nye branches genererer Preview Deployments.
- Pull requests får egne preview-miljøer.
- Push til produksjonsbranchen (vanligvis `main`) trigger en ny produksjonsdeploy.

Du kan også deploye manuelt via Vercel CLI:

```bash
npm install -g vercel
vercel --prod
```

Next.js og Vercel fungerer sømløst sammen. Med Git-integrasjon får du automatiserte builds, preview-miljøer og produksjonsdeploys uten å måtte konfigurere egen server eller CI/CD-infrastruktur.