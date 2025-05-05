## Library App

### Запуск приложения

Запуск приложения в режиме разработки с автоматическим перезапуском:

```bash
npm run dev
```

Для тестирования API можно использовать Postman или curl. Ниже примеры запросов:

### Авторизация пользователя

```bash
POST /api/user/login
```

### Получить все книги

```bash
GET /api/books
```

### Получить книгу по ID

```bash
GET /api/books/:id
```

### Создать новую книгу

```bash
POST /api/books
```

### Редактировать книгу по ID

```bash
PUT /api/books/:id
```

### Удалить книгу по ID

```bash
DELETE /api/books/:id
```