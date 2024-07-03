# Uruchomienie projektu
## Wymagania
- [Node.js](https://nodejs.org/en/download/prebuilt-installer)
- [pnpm](https://pnpm.io/installation)
## Instalacja
Zainstaluj Node.js

Aby zainstalować pnpm globalnie:
```bash
npm install -g pnpm
```
Następnie aby zainstalować zależności projektu:
```bash
pnpm install
```
## Zmienne środowiskowe
Utwórz pliki .env i docker.env w głównym katalogu projektu oraz .env.local w paczce web na zmienne środowiskowe.
- **.env**
```
POSTGRES_HOST=<value>
POSTGRES_PORT=<value>
POSTGRES_USER=<value>
POSTGRES_PASSWORD=<value>
POSTGRES_DB=<value>
```
- **docker.env**
```
POSTGRES_USER=<value>
POSTGRES_PASSWORD=<value>
POSTGRES_DB=<value>
POSTGRES_DEFAULT_EMAIL=<value>
POSTGRES_DEFAULT_PASSWORD=<value>
```
- **.env.local**
```
VITE_CLERK_PUBLISHABLE_KEY=<value>
```
## Skrypty
- `turbo dev` - uruchamia środowisko deweloperskie
- `turbo type-check` - sprawdzanie typów
- `turbo build` - buduje projekt, przez budowaniem wykonuje sprawdzanie typów