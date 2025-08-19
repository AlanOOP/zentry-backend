import multer, { StorageEngine } from 'multer';
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import { dir } from 'console';

const storage : StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage });

export { upload };