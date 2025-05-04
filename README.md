## Library App

### Запуск приложения

Запуск приложения в режиме разработки с автоматическим перезапуском:

```bash
npm run dev
```

Для тестирования API можно использовать Postman или curl. Ниже примеры запросов на curl:

### Авторизация пользователя

```bash
curl -X POST http://localhost:3000/api/user/login
```

### Получить все книги

```bash
curl http://localhost:3000/api/books
```

### Получить книгу по ID

```bash
curl http://localhost:3000/api/books/1
```

### Создать новую книгу

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "title": "Новая книга",
  "description": "Описание новой книги",
  "authors": "Автор книги",
  "favorite": "false",
  "fileCover": "new-book.jpg",
  "fileName": "new-book.pdf"
}' http://localhost:3000/api/books
```

### Редактировать книгу по ID

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
  "title": "Обновлённое название",
  "description": "Обновлённое описание",
  "authors": "Новый автор",
  "favorite": "true",
  "fileCover": "updated-cover.jpg",
  "fileName": "updated-file.pdf"
}' http://localhost:3000/api/books/1
```

### Удалить книгу по ID

```bash
curl -X DELETE http://localhost:3000/api/books/1
```