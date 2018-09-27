# ProjektM
## Jak spustit na localhostu
* [Nainstalovat nodeJs LTS](https://nodejs.org/en/)
* globalne nainstalovat angular cli | cmd => ```npm install -g @angular/cli```
* stahnout zip, nebo instalovat [git](https://git-scm.com/downloads) a naklonovat repo
* cmd otevrit slozku ```cd projektm``` 
* instalovat dependence projektu ```npm install``` 
* otevrit slozku clientske aplikace ```cd client```
* spustit projekt ```ng serve```
* Otevøít localhost:4200 pokud neni v konzoli napsano jinak

## Popis
Na rootu slozky je server vytvoreny v node express, prozatím nedìlá nic než že se stará o requesty a zobrazuje klientskou aplikaci. Pozdìji bude zpracovávat a ukládat data od klienta. Aplikace je ve složce client a obsahuje celou viditelnou èást. Pro debug spuštìní není server vùbec potøeba, je nastaven aby zobrazoval vybuildovanou klientskou aplikaci.
