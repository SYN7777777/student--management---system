import express from 'express';
import multer from 'multer';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';
import { uploadExcel } from '../middleware/upload.js';

import { createStudent, deleteStudent, exportStudentsToExcel, getGenderRatio, getStudentById, getStudents, getStudentsByClass, getTotalStudents, importStudentsFromExcel, updateStudent } from '../controllers/studentControllers.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post(
  '/',
  authenticateJWT,
  isAdmin,
  upload.single('profilePhoto'),
  createStudent
)
router.post(
  '/import',
  authenticateJWT,
  isAdmin,
  uploadExcel.single('file'),
  importStudentsFromExcel
);
router.get(
  '/export',
  authenticateJWT,
  isAdmin, // only admin can export
  exportStudentsToExcel
);
router.get(
  '/',
  authenticateJWT, // both admin and teacher can access
  getStudents
);
router.get('/stats/total', authenticateJWT, getTotalStudents);
router.get('/stats/by-class', authenticateJWT, getStudentsByClass);
router.get('/stats/gender', authenticateJWT, getGenderRatio);


router.put(
  '/:id',
  authenticateJWT,
  isAdmin,
  upload.single('profilePhoto'), // optional, only if updating photo
  updateStudent
);
router.delete(
  '/:id',
  authenticateJWT,
  isAdmin,
  deleteStudent
);
// Get a single student by ID (admin & teacher)
router.get(
  '/:id',
  authenticateJWT,
  getStudentById
);




export default router;
