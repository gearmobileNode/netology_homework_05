const express = require('express');
const router = express.Router();

// Подключаем дочерние роутеры
const booksRouter = require('./books');
const userRouter = require('./user');

router.use('/books', booksRouter);
router.use('/user', userRouter);

module.exports = router;
