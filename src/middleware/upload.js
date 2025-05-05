const multer = require('multer');
const path = require('path');

// Настройка хранилища для загружаемых файлов
const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, path.join(__dirname, '../public/books'));
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// Фильтр для проверки типа файла
const fileFilter = (_, file, cb) => {
  const allowedTypes = ['.pdf', '.epub', '.fb2'];
  const extname = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error('Разрешены только файлы книг (.pdf, .epub, .fb2)'), false);
  }
};

// Настройка multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // limit 10MB
  },
});

module.exports = upload;
