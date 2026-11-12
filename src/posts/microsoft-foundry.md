---
title: 'Bygg din egen AI-agent med Microsoft Foundry'
description:
  En guide for å bygge din egen AI-agent med Microsoft Foundry.
date: '2026-11-12'
author: 'Olav Fykse'
draft: false
image: '/blog/images/azure-foundry.png'
tags:
  - AI
  - Agent
  - Microsoft Foundry
---


De siste årene har store språkmodeller (LLM-er) blitt en stadig større del av utviklerhverdagen. Vi bruker dem til alt fra kodegenerering og feilsøking til dokumentasjon og analyse.

Men hva om vi kunne gå et steg videre?

I stedet for å bare sende en tekst til en språkmodell og få et svar tilbake, kan vi bygge en agent som selv vurderer hvordan en oppgave skal løses, bruker tilgjengelige verktøy og henter informasjon fra eksterne systemer.

I denne artikkelen skal vi se på hvordan vi kan bygge vår egen AI-agent med **Microsoft Foundry** (tidligere Azure AI Foundry).

Vi skal lage en enkel utviklerassistent som kan svare på tekniske spørsmål og hente oppdatert informasjon fra nettet, databaser og verktøy tilkoblet via MCP.

## Agent versus språkmodell

En vanlig språkmodell mottar en prompt og genererer et svar basert på informasjonen den har tilgjengelig.

En AI-agent kan gjøre mer. Den kan blant annet:

- Følge instruksjoner over flere steg.
- Vurdere hvilke verktøy den trenger, og ta disse i bruk.
- Hente informasjon fra eksterne kilder.
- Kalle API-er og funksjoner.
- Bruke resultatene til å formulere et svar.

Det er nettopp kombinasjonen av en språkmodell, instruksjoner og verktøy som gjør agenter interessante.

## 1. Opprett et Foundry-prosjekt

Gå til [Microsoft Foundry](https://ai.azure.com/) og logg inn med Azure-kontoen din.

Opprett et nytt prosjekt, eller velg et eksisterende prosjekt.

Vi trenger også en deployet språkmodell som agenten skal bruke. Velg en GPT-modell fra modellkatalogen og opprett en deployment. I skrivende stund er gpt-6-luna et godt sted å starte, siden den er svært god og samtidig relativt rimelig.

Når modellen er klar, har vi det vi trenger for å opprette vår første agent.

## 2. Opprett en agent

Naviger til Agents i Foundry og opprett en ny agent.

Vi skal lage en enkel utviklerassistent med navnet `developer-assistant`.

Velg modellen vi nettopp deployet.

Det viktigste feltet er **Instructions**. Her definerer vi hvilken rolle agenten skal ha, og hvordan den skal oppføre seg. Disse instruksjonene kalles også en systemmelding (*system message*).

Vi kan for eksempel bruke følgende instruksjoner:

```text
You are an experienced software developer
and technical assistant.

Your responsibilities are:

- Help developers solve technical problems.
- Explain programming concepts clearly.
- Provide practical code examples.
- Prefer maintainable and well-structured solutions.
- Use available tools when appropriate.

Respond in Norwegian unless the user
explicitly requests another language.
```

Instruksjonene fungerer som agentens overordnede rammer. Vi trenger dermed ikke sende med hele instruksjonssettet på nytt for hver forespørsel.

## 3. Gi agenten tilgang til verktøy

En språkmodell har ikke automatisk tilgang til oppdatert informasjon eller eksterne systemer.

Ved å koble verktøy til agenten kan vi utvide funksjonaliteten.

Foundry støtter blant annet:

- **Web Search:** Søker etter oppdatert informasjon på nettet.
- **File Search:** Søker i dokumenter og filer.
- **Code Interpreter:** Kjører kode og analyserer data.
- **Function Calling:** Lar agenten kalle egne funksjoner og API-er.
- **MCP:** Kobler agenten til eksterne verktøy gjennom Model Context Protocol.

En god start kan være å gi agenten tilgang til nettsøk. Da kan den hente oppdatert informasjon når den trenger det, og er ikke begrenset til informasjonen som var tilgjengelig da modellen ble trent.

Vi kan for eksempel spørre:

> Hva er den nyeste LTS-versjonen av .NET, og hvilke nyheter kom med denne versjonen?

Da kan agenten bruke søkeverktøyet til å hente informasjon i stedet for bare å basere seg på kunnskapen den allerede har.

Det er agenten selv som vurderer om verktøyet er relevant for den aktuelle forespørselen, men vi kan også spesifisere i instruksjonene at den skal bruke verktøyet når det er tilgjengelig.

## 4. Test agenten

Før vi integrerer agenten i egen kode, kan vi teste den direkte i Foundry Playground.

Prøv for eksempel følgende spørsmål:

```text
Forklar forskjellen mellom et interface
og en abstract class i C#.
```

Dette tester agentens generelle kunnskap.

Deretter kan vi prøve:

```text
Hva er den nyeste LTS-versjonen av .NET?
Hvilke viktige endringer inneholder den?
```

Her bør agenten kunne benytte Web Search for å hente oppdatert informasjon.

I Playground kan vi også bruke sporingsfunksjonen (*tracing*) til å undersøke hvordan agenten løser oppgavene, og hvilke verktøy den benytter underveis.

## 5. Integrer agenten i en .NET-applikasjon

En agent er ikke spesielt nyttig dersom den bare kan brukes inne i Foundry-portalen.

Heldigvis kan vi også integrere den i våre egne applikasjoner.

Microsoft tilbyr SDK-er for blant annet .NET, slik at vi kan kommunisere med agenten programmatisk.

Her er et enkelt eksempel på hvordan vi kan opprette en samtale og sende en forespørsel med C#:

```csharp
using Azure.AI.Projects;
using Azure.Identity;

var endpoint = Environment.GetEnvironmentVariable(
    "FOUNDRY_PROJECT_ENDPOINT"
);

var projectClient = new AIProjectClient(
    endpoint: new Uri(endpoint!),
    tokenProvider: new DefaultAzureCredential()
);

var conversation = projectClient
    .ProjectOpenAIClient
    .GetProjectConversationsClient()
    .CreateProjectConversation();

var responsesClient = projectClient
    .ProjectOpenAIClient
    .GetProjectResponsesClientForAgent(
        defaultAgent: "developer-assistant",
        defaultConversationId: conversation.Id
    );

var response = responsesClient.CreateResponse(
    "Forklar dependency injection i .NET."
);

Console.WriteLine(response.GetOutputText());
```

Her oppretter vi en klient mot Foundry-prosjektet, starter en samtale og kobler den til agenten vi tidligere opprettet.

Når vi sender en forespørsel, benytter agenten instruksjonene og verktøyene vi har konfigurert i Foundry.

`DefaultAzureCredential` håndterer autentisering mot Azure. Ved lokal utvikling kan vi eksempelvis bruke Azure CLI:

```bash
az login
```

Husk å installere nødvendige NuGet-pakker og bruke en SDK-versjon som støtter det aktuelle Foundry-oppsettet.

## 6. Hva har vi bygget?

Vi har nå laget en enkel AI-agent som:

- Har en definert rolle og et sett med instruksjoner.
- Benytter en deployet språkmodell.
- Kan bruke eksterne verktøy.
- Kan hente oppdatert informasjon.
- Kan integreres i egne .NET-applikasjoner.

Men mulighetene stopper ikke der.

Vi kunne for eksempel gitt agenten tilgang til egne REST-API-er, interne dokumenter eller databaser. Vi kunne også bygget én eller flere agenter som utfører operasjoner sekvensielt eller parallelt for å løse mer komplekse oppgaver.

Det er også viktig å vurdere sikkerheten rundt en slik AI-agent. Hvilke verktøy og data skal den ha tilgang til, og hvordan skal vi håndtere sensitiv informasjon? Skal forespørsler og svar modereres? Hvordan skal vi håndtere *jailbreaking* og *prompt injection*? Dette er spørsmål vi bør vurdere før vi tar i bruk en agent i produksjon. Foundry har verktøy som kan hjelpe oss med å håndtere mange av disse utfordringene.

---

*Videre lesning:*

- [Microsoft Foundry – Agent Service](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview)
- [Create a prompt agent](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/prompt-agent)
- [Function calling](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/function-calling)