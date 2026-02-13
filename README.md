# ❤️ Nasza Historia - Aplikacja Walentynkowa ❤️

To wyjątkowa, spersonalizowana aplikacja internetowa stworzona jako prezent walentynkowy. Jest to interaktywna "kartka", która prowadzi ukochaną osobę przez serię romantycznych etapów, odblokowywanych ważną dla Was datą.

## 🌹 O co chodzi?

Aplikacja to cyfrowa podróż przez Wasze wspomnienia i uczucia. Została zaprojektowana tak, aby budować napięcie i emocje:

1.  **Sekretne wejście**: Aplikacja jest zabezpieczona "bramką". Aby wejść, trzeba podać datę, która zmieniła wszystko (np. data rozpoczęcia związku).
2.  **Multimedialne wspomnienie**: Po odblokowaniu, wyświetlane jest wideo (np. kompilacja wspólnych chwil) z podkładem muzycznym.
3.  **List miłosny**: Na końcu pojawia się animowany list, pisany "na żywo" na ekranie, wyrażający to, co czujesz.

## ✨ Główne Funkcje

*   **📅 Date Gate (Bramka Daty)**:
    *   Blokada ekranu wymagająca podania konkretnej daty (`2025-07-12`).
    *   Romantyczne komunikaty błędów i sukcesu.
    *   Animowane przejścia po wpisaniu poprawnej daty.

*   **📱 Landscape Lock**:
    *   Wymusza tryb poziomy na urządzeniach mobilnych dla lepszego odbioru wideo i listu.

*   **🎬 Cinema Mode**:
    *   Odtwarzacz wideo na pełnym ekranie.
    *   Automatyczne wyciszanie (fade-out) dźwięku i obrazu pod koniec filmu.
    *   Możliwość pominięcia wideo.

*   **💌 Interaktywny List**:
    *   Efekt maszyny do pisania (tekst pojawia się litera po literze).
    *   Piękne animowane wejście całego tekstu po zakończeniu pisania.
    *   Możliwość przewijania długiego tekstu.
    *   Przycisk resetu, aby przeżyć to jeszcze raz.

*   **💖 Efekty Wizualne**:
    *   Pływające serduszka w tle (`FloatingHearts`).
    *   Płynne animacje przejść (wykorzystując bibliotekę **GSAP**).
    *   Nowoczesny, "szklany" design (Glassmorphism).

## 🛠️ Technologie

Projekt został zbudowany przy użyciu nowoczesnych technologii webowych:
*   **React** (TypeScript)
*   **Vite** (Szybki build tool)
*   **Tailwind CSS** (Stylowanie)
*   **GSAP** (Zaawansowane animacje)
*   **Shadcn/ui** (Komponenty interfejsu)

## ⚙️ Konfiguracja i Personalizacja

Chcesz dostosować aplikację dla kogoś innego lub zmienić szczegóły? Oto gdzie szukać:

### 1. Zmiana Daty (Hasła)
Edytuj plik: `src/components/DateGate.tsx`
Znajdź linię:
```typescript
const CORRECT_DATE = "2025-07-12"; // Zmień na Waszą datę (RRRR-MM-DD)
```

### 2. Zmiana Wideo
Podmień plik wideo w folderze: `public/videos/WITH_SONG.mp4`
*   Upewnij się, że nazwa pliku to `WITH_SONG.mp4` LUB zaktualizuj ścieżkę w `src/components/Cinema.tsx`.

### 3. Edycja Listu Miłosnego
Edytuj plik: `src/components/LoveLetter.tsx`
Zmień zawartość tablicy `LETTER_LINES`:
```typescript
const LETTER_LINES = [
  "Kochanie,",
  "Twój nowy tekst tutaj...",
  // ...
];
```

## 🚀 Jak uruchomić?

1.  Zainstaluj zależności:
    ```bash
    npm install
    ```
2.  Uruchom wersję deweloperską:
    ```bash
    npm run dev
    ```
3.  Otwórz link wyświetlony w terminalu (zazwyczaj `http://localhost:8080`).

---
*Stworzone z miłością. ❤️*
