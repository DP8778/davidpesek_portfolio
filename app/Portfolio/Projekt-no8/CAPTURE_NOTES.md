# Digital Call: původ obrazových a stavových podkladů

## Aktuální snímky studie, 23. 10. 2026

- Zdroj: čistá pracovní kopie `DP8778/digital_call_module`, větev `feat/liquid-glass-redesign`, commit `7b1b344` („feat: add accessible kanban drag and drop“). Pro snímání byl spuštěn izolovaný lokální produkční build; kód aplikace ani její syntetický dataset se kvůli prezentaci neměnily.
- Chrome/Playwright měl pouze v prohlížeči řízený čas, pásmo `Europe/Prague`, světlý motiv a viewporty 1440 × 1000 / 375 × 812 px. Obrázky jsou přímé screenshoty UI nebo jeho autentické výřezy, nikoli grafické rekonstrukce.
- Ve 13:00 dne 12. 10. 2026 vznikly `story-queue-desktop.png`, mobilní výřezy `story-queue-anna-mobile.png` a `story-queue-petr-mobile.png`, snímek formuláře `story-schedule-mobile.png` a `story-detail-{desktop,mobile}.png`. Anna měla nejprve prošlý hovor z 11. 10. v 16:00 a jeden starší pokus s poznámkou „Preferuje kontakt po 15. hodině.“ Petr měl budoucí hovor ve 14:00. Makléř v modelovém průchodu změnil Annin termín na 15:30; tato operace nevytvořila pokus ani nezměnila stav `K provolání`.
- Ve stejném izolovaném prohlížeči se čas posunul na 15:35. Po modelovém pokusu makléř ve formuláři vybral `Nedovoláno` a vlastní další termín 13. 10. 2026 v 16:00. Formulář zachycují `story-outcome-{desktop,mobile}-{top,confirm}.png`, skutečné přijaté potvrzení `story-confirmation-{desktop,mobile}.png`. Přijatý výsledek přidal jeden nový pokus, změnil stav na `Volat později` a založil další hovor; celkem má Anna dva pokusy. Aplikace nevyvozuje vhodný čas z poznámky automaticky.
- Screenshoty byly oříznuty při samotném snímání pomocí prohlížeče pro čitelnost. Texty ani hodnoty v bitmapech nebyly dodatečně upravovány. Původní Kanban na stránce zůstává výslovně označeným schématem, nikoli autentickou obrazovkou.

## Starší předané podklady, 17. 10. 2026

- Zdroj: sousední pracovní kopie `DP8778/digital_call_module`, `artifacts/portfolio-handoff/evidence.md` a `capture-manifest.md`, přečtené 17. 10. 2026. Zdrojový projekt nebyl v tomto úkolu upravován.
- Předané snímky zachycují lokální produkční build větve `feat/liquid-glass-redesign` navazující na commit `6beb07ef78f6772324badb073f52586028c36dc5` **včetně necommitnuté opravy potvrzování operací**. Nejsou vydávány za obraz samotného commitu ani veřejného dema.
- Podle manifestu byly pořízeny v lokálním Chrome 155 se syntetickými daty, fixovaným časem 12. 10. 2026 13:00 Europe/Prague, ve světlém motivu a velikostech 1440 × 1000 / 375 × 812 px. Přeneseny byly beze změny pod názvy `handoff-queue-*`, `handoff-detail-*` a `handoff-outcome-*`.
- Fronta ukazuje 4 prošlé a 2 budoucí dnešní úkoly. Detail a výsledkový formulář ukazují Annu Novotnou před uložením nového výsledku; pouhé otevření detailu ani formuláře nevytvořilo pokus. Obrázky nezobrazují pozdější opravný průchod po vypršení doporučeného termínu.
- Podle `evidence.md` přijatý výsledek „Nedovoláno“ přidal právě jeden pokus (z 1 na 2), stav „Volat později“ a další hovor; odmítnutý prošlý termín nic nezapsal. Tyto hodnoty nejsou prezentovány jako UX metriky.
- Oprava potvrzování byla při pořízení snímků necommitnutá; později byla zahrnuta do commitu `b18dad5`. Odkazy na jeho kód a testy dokládají pravidla, ale snímky nejsou vydávány za obraz samotného commitu.
- Při nové kontrole 24. 10. 2026 veřejná adresa `digital-call-module.vercel.app` stále vracela starší titul „Obvolávání“. Nové lokální snímky proto na stránce zůstávají oddělené od odkazu na starší veřejné demo.
