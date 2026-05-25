<div align="center">
  <img src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=electron&logoColor=white" alt="Electron"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Minecraft-62B47A?style=for-the-badge&logo=minecraft&logoColor=white" alt="Minecraft"/>
  <br/><br/>
  <h1>⛏️ Minecraft Plugin Builder</h1>
  <p><strong>Визуальный конструктор плагинов для Minecraft (Bukkit/Paper)</strong></p>
  <p>Собирай плагины мышкой — без единой строчки кода!</p>
  <br/>
  <a href="https://github.com/vleasy/plugin-builder/releases">
    <img src="https://img.shields.io/github/v/release/vleasy/plugin-builder?style=for-the-badge&color=brightgreen" alt="Release"/>
  </a>
  <a href="https://github.com/vleasy/plugin-builder/releases">
    <img src="https://img.shields.io/badge/Скачать-Установщик-blue?style=for-the-badge" alt="Download"/>
  </a>
</div>

---

## 📋 О проекте

**Minecraft Plugin Builder** — это десктопное приложение, которое позволяет создавать плагины для Minecraft серверов (Bukkit / Paper) визуально, с помощью drag-and-drop блоков.

Просто перетаскивай блоки **Событие → Условие → Действие** и получай готовый Java или Kotlin код!

### ✨ Возможности

| | |
|---|---|
| 🧱 **Визуальный редактор** | Drag-and-drop интерфейс на основе React Flow |
| 🎯 **30+ событий** | Player Join, Block Break, Entity Death, Chat Message и другие |
| 🔍 **20+ условий** | Проверка прав, режима, предметов, биомов, здоровья и т.д. |
| ⚡ **40+ действий** | Выдача предметов, телепортация, взрывы, звуки, частицы, команды |
| 📦 **Генерация Java/Kotlin** | Готовый к компиляции код плагина |
| 💾 **Сохранение проектов** | Экспорт/импорт JSON схем |
| 🔄 **Undo/Redo** | Отмена и повтор действий |

---

## 🚀 Установка

### Вариант 1: Скачать установщик

1. Перейди на [страницу релизов](https://github.com/vleasy/plugin-builder/releases)
2. Скачай `Minecraft Plugin Builder Setup 1.0.0.exe`
3. Запусти и следуй инструкциям установщика

### Вариант 2: Собрать из исходников

```bash
git clone https://github.com/vleasy/plugin-builder.git
cd plugin-builder
npm install
npm run dev
```

---

## 🎮 Как пользоваться

### Основные блоки

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Событие    │───→│   Условие    │───→│  Действие    │
│  (Event)     │    │ (Condition)  │    │  (Action)    │
└──────────────┘    │   ✓ / ✗     │    └──────────────┘
                    └──────────────┘
```

1. **Событие (Trigger)** — начало цепочки. Например: игрок зашёл, сломал блок, умер
2. **Условие (Condition)** — проверка. Имеет два выхода: ✅ (true) и ❌ (false)
3. **Действие (Action)** — что произойдёт. Выдача предмета, сообщение, звук

### Примеры схем

#### 🏆 Награда за убийство крипера

```
Entity Death (Creeper) → Killer Is Player → Give Item (Gold Ingot, 3) → Send Message ("+3 золота")
```

#### 💥 Крипер без кратеров

```
Entity Explode → Entity Is Type (Creeper) → Cancel Event → Spawn Particles → Damage Event Entity (1)
```

#### 💎 Оповещение об алмазах

```
Player Move → Block Below Is (Diamond Ore, 1) → Block Below Is (Diamond Ore, 2) → Send Title → Play Sound
```

---

## 🛠️ Технологии

| | |
|---|---|
| **Язык** | TypeScript |
| **Фреймворк** | React 18 + Electron |
| **Граф редактор** | [@xyflow/react](https://www.xyflow.com/) (React Flow) |
| **Стейт-менеджмент** | Zustand |
| **Стили** | Tailwind CSS |
| **Иконки** | Lucide React |
| **Сборка** | Electron Vite + electron-builder |

---

## 📁 Структура проекта

```
src/
├── main/             # Electron main process
├── preload/          # Electron preload
└── renderer/         # React приложение
    └── src/
        ├── components/   # UI компоненты
        ├── data/         # Определения блоков (события, условия, действия)
        ├── edges/        # Визуальные соединения
        ├── generators/   # Генерация Java/Kotlin кода
        ├── nodes/        # Визуальные блоки
        ├── store/        # Zustand store
        └── types/        # TypeScript типы
```

---

## 🤝 Вклад в проект

Хочешь добавить новый блок или улучшить генерацию?

1. Форкни репозиторий
2. Добавь блок в `src/renderer/src/data/`
3. Добавь генерацию кода в `src/renderer/src/generators/`
4. Сделай Pull Request

---

## 📄 Лицензия

MIT
