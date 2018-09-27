# ProjektM
## Jak spustit na localhostu
* [Nainstalovat nodeJs LTS](https://nodejs.org/en/)
* globalne nainstalovat angular cli | cmd => ```npm install -g @angular/cli```
* stahnout zip, nebo instalovat [git](https://git-scm.com/downloads) a naklonovat repo
* cmd otevrit slozku ```cd projektm``` 
* instalovat dependence projektu ```npm install``` 
* otevrit slozku clientske aplikace ```cd client```
* spustit projekt ```ng serve```
* Otev��t localhost:4200 pokud neni v konzoli napsano jinak

## Popis
Na rootu slozky je server vytvoreny v node express, prozat�m ned�l� nic ne� �e se star� o requesty a zobrazuje klientskou aplikaci. Pozd�ji bude zpracov�vat a ukl�dat data od klienta. Aplikace je ve slo�ce client a obsahuje celou viditelnou ��st. Pro debug spu�t�n� nen� server v�bec pot�eba, je nastaven aby zobrazoval vybuildovanou klientskou aplikaci.
