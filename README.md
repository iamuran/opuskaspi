# Мои документы — учебный проект

Личное хранилище **копий** документов (удостоверение, паспорт РК, диплом, справки).
Каждая копия помечена водяным знаком «Копия · не является документом».

Стек: React 19, Vite 7, Tailwind 3, TypeScript, Capacitor 7 (iOS).

## Запуск в браузере
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Сборка под iOS (нужен Mac с Xcode)
```bash
npm run ios:add      # один раз — создаёт папку ios/
npm run ios:sync     # после каждого изменения кода
npm run ios:open     # открывает проект в Xcode
```
В Xcode: Signing & Capabilities → выберите свою команду (Apple ID) → Run на устройстве/симуляторе.

В `ios/App/App/Info.plist` добавьте описания доступа:
- `NSCameraUsageDescription` — «Для съёмки документа»
- `NSPhotoLibraryUsageDescription` — «Для выбора фото документа»

## Структура
```
src/lib/documents.ts      типы документов и поля реквизитов
src/lib/storage.ts        сохранение в localStorage, сжатие фото
src/components/           экраны и компоненты
```
Данные хранятся только на устройстве (localStorage).
