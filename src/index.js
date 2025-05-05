const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Отдача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем роуты
const routes = require('./routes');
app.use('/api', routes);

// Создаем папку для загрузок, если ее нет
const fs = require('fs');
const uploadDir = path.join(__dirname, 'public/books');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
