# The-Odin-Project---Todo-List

#### Task Eigenschaften:

- id
- title
- description
- dueDate
- priority (high, medium, low)
- done (togglen)

#### Projekt Eigenschaften

- id
- Name
- Todos (Array)

---

### Ansichten

#### HOME

- Alle Projekte werden gruppiert angezeigt
- Struktur: Projektname → alle Todos des Projekts → nächstes Projekt
- Fortschrittsbalken gilt für alle Todos insgesamt

#### HOME

- Nur Todos deren dueDate === heute (projektübergreifend)
- Struktur: Projektname → heutige Todos des Projekts
- Fortschrittsbalken gilt für alle heutigen Todos

#### Projekt-Ansicht z.B. Gym

- Nur Todos dieses Projekts
- Button zum löschen des Projekts mit allen Tasks endgültig (Modal Hinweis)
- Fortschrittsbalken gilt für Todos dieses Projekts

---

### UI-Komponenten

#### Sidebar (links)

- HOME mit Todo-Zähler
- TODAY mit Todo-Zähler
- PROJECTS-Bereich: jedes Projekt mit Zähler
- ➕ Button unten → öffnet Modal

#### Todo-Zeile (rechts)

- Checkbox → Toggle done → sofort Storage.save()
- Titel + Fälligkeitsdatum
- „view"-Button → klappt Zeile auf
- „delete"-Button → Todo löschen → Storage.save()

#### Aufgeklappte Todo-Zeile

- Alle Felder editierbar (title, description, dueDate, priority)
- „Speichern"-Button → Storage.save()

#### Fortschrittsbalken

- Unten im Hauptbereich
- Text: „X von Y Tasks abgeschlossen"
- Visueller Balken proportional zu done / total

#### ➕ Modal – zwei Modi

- Neuen Task erstellen: title, description, dueDate, priority + Dropdown zur Projektzuweisung
- Neues Projekt erstellen: nur ein Name
