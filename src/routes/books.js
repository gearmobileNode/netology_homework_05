const path = require('node:path');
const fs = require('node:fs');

const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const arrayOfBooks = require('../data/books');

// Временное хранилище (вместо БД)
let books = arrayOfBooks;

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

// Создать новую книгу с загрузкой файла
router.post('/', upload.single('fileBook'), (req, res) => {
  try {
    const { title, description, authors, favorite, fileCover } = req.body;

    if (!title || !description || !authors) {
      return res.status(400).json({ error: 'Не заполнены обязательные поля' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Файл книги не был загружен' });
    }

    const newBook = {
      id: Date.now().toString(),
      title,
      description,
      authors,
      favorite: favorite === 'true',
      fileCover,
      fileName: req.file.originalname,
      fileBook: `/books/${req.file.filename}`, // -> путь к загруженному файлу
    };

    books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Редактировать книгу по ID (с возможностью обновления файла)
router.put('/:id', upload.single('fileBook'), (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover } = req.body;
  const index = books.findIndex((el) => el.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  const updatedBook = {
    ...books[index],
    title,
    description,
    authors,
    favorite: favorite === 'true',
    fileCover,
  };

  if (req.file) {
    updatedBook.fileName = req.file.originalname;
    updatedBook.fileBook = `/books/${req.file.filename}`;
  }

  books[index] = updatedBook;
  res.json(updatedBook);
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

// Скачивание файла книги по ID
router.get('/:id/download', (req, res) => {
  const { id } = req.params;
  const book = books.find((el) => el.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  if (!book.fileBook) {
    return res.status(404).json({ error: 'Файл книги не найден' });
  }

  const filePath = path.join(__dirname, '../public', book.fileBook);

  // Проверяем существует ли файл
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Файл не найден на сервере' });
  }

  // Отправляем файл для скачивания
  res.download(filePath, book.fileName, (err) => {
    if (err) {
      console.error('Ошибка при скачивании файла:', err);
      res.status(500).json({ error: 'Ошибка при скачивании файла' });
    }
  });
});

module.exports = router;
