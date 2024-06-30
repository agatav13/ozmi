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
## Skrypty
- `turbo dev` - uruchamia środowisko deweloperskie
- `turbo type-check` - sprawdzanie typów
- `turbo build` - buduje projekt, przez budowaniem wykonuje sprawdzanie typów