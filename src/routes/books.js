const express = require('express');
const router = express.Router();

// Временное хранилище (вместо БД)
let books = [
  {
    id: '1',
    title: 'Война и мир',
    description: 'Роман-эпопея Льва Толстого',
    authors: 'Лев Толстой',
    favorite: 'true',
    fileCover: 'war-and-peace.jpg',
    fileName: 'war-and-peace.pdf',
  },
  {
    id: '2',
    title: 'Преступление и наказание',
    description: 'Роман Фёдора Достоевского',
    authors: 'Фёдор Достоевский',
    favorite: 'true',
    fileCover: 'crime-and-punishment.jpg',
    fileName: 'crime-and-punishment.pdf',
  },
];

// Получить все книги
router.get('/', (_, res) => {
  res.json(books);
});

// Получить книгу по ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((el) => el.id === id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Книга не найдена' });
  }
});

// Создать новую книгу
router.post('/', (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const newBook = {
    id: Date.now().toString(),
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Редактировать книгу по ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const index = books.findIndex((el) => el.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    };
    res.json(books[index]);
  } else {
    res.status(404).json({ error: 'Книга не найдена' });
  }
});

// Удалить книгу по ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((el) => el.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    res.json('ok');
  } else {
    res.status(404).json({ error: 'Книга не найдена' });
  }
});

module.exports = router;
