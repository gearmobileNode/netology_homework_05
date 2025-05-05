const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

app.use(express.json());

// Подключаем роуты
app.use('/api', routes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
