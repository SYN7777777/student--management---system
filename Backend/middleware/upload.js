import multer from 'multer';

const excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/excel');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const uploadExcel = multer({
  storage: excelStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      cb(null, true);
    } else {
      cb(new Error('Only .xlsx files are allowed!'), false);
    }
  }
});
