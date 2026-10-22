# refraim-website

Webbplatsen för **Refraim AB**. Fem sidor, helt statisk: ren HTML, ett litet skript och bilder. Det finns inget byggsteg, inga beroenden, inga cookies och ingen spårning.

| Sida | Adress | Fil |
|---|---|---|
| Startsida (vägvisaren) | `/` | `index.html` |
| AI-gapet | `/ai-gapet` | `ai-gapet.html` |
| Anbud till kommuner | `/anbud` | `anbud.html` |
| Lokala nyheter | `/lokala-nyheter` | `lokala-nyheter.html` |
| Minglemingle | `/minglemingle` | `minglemingle.html` |
| Sidan finns inte | – | `404.html` |

```
.
├── index.html, ai-gapet.html, anbud.html, lokala-nyheter.html, minglemingle.html, 404.html
├── assets/
│   ├── site.js        # gissa-gapet-reglagen och formulären
│   └── img/           # porträtt, Minglemingle-bilder, delningsbild
├── favicon.svg
├── robots.txt, sitemap.xml
└── vercel.json        # snygga adresser utan .html, säkerhetsrubriker, cache
```

## Förhandsgranska lokalt

```bash
npx serve .
```

Öppna sedan http://localhost:3000. `serve` hanterar adresser utan `.html` på samma sätt som Vercel.

---

## Publicera på Vercel

Det här steget tar ungefär fem minuter och **ändrar ingenting hos one.com**. Webbplatsen hamnar först på en egen adress som slutar på `.vercel.app`.

1. Logga in på [vercel.com](https://vercel.com) med ditt GitHub-konto.
2. Klicka **Add New… → Project**.
3. Välj repositoryt **refraim-website** och klicka **Import**. Ser du det inte, klicka **Adjust GitHub App Permissions** och ge Vercel åtkomst till repot.
4. Ställ in projektet så här:

   | Inställning | Värde |
   |---|---|
   | Framework Preset | **Other** |
   | Root Directory | `./` |
   | Build Command | *lämna tomt* |
   | Output Directory | *lämna tomt* (eller `.`) |
   | Install Command | *lämna tomt* |

5. Klicka **Deploy**.
6. Öppna adressen du får, till exempel `refraim-website.vercel.app`, och gå igenom kontrollistan nedan.

Varje gång något ändras i `main` publicerar Vercel en ny version automatiskt. Ändringar i andra grenar blir förhandsversioner med egna länkar.

### Kontrollista efter första publiceringen

- [ ] Alla fem sidor öppnas via menyn, och länkarna fungerar utan `.html` i adressen.
- [ ] Reglagen på `/ai-gapet` rör sig och gapet räknas om.
- [ ] Alla tre formulären öppnar ett ifyllt mejl till tobias@refraim.se.
- [ ] Spotify-, Minglemingle- och LinkedIn-länkarna öppnar rätt sida.
- [ ] Sidan ser rätt ut på mobilen.
- [ ] En adress som inte finns, till exempel `/test`, visar 404-sidan.

---

## Koppla domänen refraim.se – ett separat steg som du gör själv

Det här görs **inte** automatiskt. Gör det först när `.vercel.app`-adressen är kontrollerad.

> **Viktigt – e-posten hos one.com:** Byt **inte** namnservrar till Vercel, och ta inte bort eller ändra några **MX-, TXT- (SPF/DKIM/DMARC) eller autodiscover-poster**. De styr e-posten till tobias@refraim.se. Det enda som ska ändras är posterna för själva webbplatsen, nedan.

1. Gå till Vercel: **Project → Settings → Domains**. Lägg till `refraim.se` och `www.refraim.se`, och välj att den ena ska skicka vidare till den andra.
2. Vercel visar exakt vilka poster som behövs. Normalt är det två:

   | Typ | Namn | Värde |
   |---|---|---|
   | A | `@` (refraim.se) | det IP-nummer Vercel visar, oftast `76.76.21.21` |
   | CNAME | `www` | det värde Vercel visar, oftast `cname.vercel-dns.com` |

3. Logga in hos one.com och gå till **DNS-inställningar** för refraim.se. **Ändra bara** A-posten för `@` och CNAME-posten för `www`. Rör ingenting annat.
4. Vänta tills Vercel visar **Valid Configuration**. Det tar oftast några minuter, men kan ta upp till ett dygn. SSL-certifikatet skapas automatiskt.
5. Kontrollera att e-posten fortfarande fungerar: skicka ett mejl **till** och **från** tobias@refraim.se.

**Om något går fel med webbplatsen:** sätt tillbaka de gamla värdena för A och CNAME hos one.com. Skriv upp dem innan du ändrar.

---

## Formulären

Formulären på `/ai-gapet`, `/anbud` och `/lokala-nyheter` öppnar besökarens e-postprogram med ett ifyllt mejl till **tobias@refraim.se**. Inget lagras på webbplatsen, och därför behövs ingen server och ingen cookie-banner.

Nackdelen är att det kräver att besökaren har ett e-postprogram. Vill du att formulären skickas direkt från sidan, koppla in en formulärtjänst som [Formspree](https://formspree.io):

1. Skapa ett formulär hos tjänsten och kopiera adressen, till exempel `https://formspree.io/f/abcd1234`.
2. Ge varje `<form>` i HTML-filerna `action="DEN-ADRESSEN" method="POST"`, och ge varje fält ett `name`, till exempel `name="epost"`.
3. Ta bort attributet `data-mail-subject` från formuläret. Då hanterar `site.js` det inte längre.

Börjar formulären spara personuppgifter hos en tredje part behöver webbplatsen en integritetspolicy som beskriver det.

## Att fylla i

- **Organisationsnummer och ort** finns inte med på sidorna än. Lägg till dem i sidfoten (`<footer>`) på varje sida och i rutan "Vem står bakom" på startsidan.
- **Domänen** är förutsatt att vara `https://refraim.se` i `canonical`, `og:url`, `sitemap.xml` och `robots.txt`. Blir det en annan adress, sök och ersätt `https://refraim.se` i hela projektet.

## Ändra innehåll

All text ligger direkt i HTML-filerna. Färger och typsnitt anges i varje element:

| Vad | Värde |
|---|---|
| Typsnitt, rubriker och brödtext | Schibsted Grotesk (Google Fonts) |
| Typsnitt, etiketter | IBM Plex Mono (Google Fonts) |
| Text | `#16191D` |
| Bakgrund | `#FBFBF9` |
| Blå accent | `#23466F` |
| Orange accent | `#D08A2E` |

Bilderna från Minglemingle kommer från minglemingle.se. Byts de ut där bör de bytas även här.
