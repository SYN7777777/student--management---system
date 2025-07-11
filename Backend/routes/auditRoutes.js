import { Router } from 'express';
import { getAuditLogs } from '../controllers/auditController.js';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';

const router = Router();
router.get('/', authenticateJWT, isAdmin, getAuditLogs);   // admin‑only
export default router;
