import express from 'express';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';
import { createTeacher, getAllTeachers } from '../controllers/userControllers.js';

const router = express.Router();


router.post('/teacher',authenticateJWT, isAdmin, createTeacher);
router.get('/teacher',authenticateJWT, isAdmin, getAllTeachers);



export default router;
