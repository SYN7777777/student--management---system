// controllers/auditController.js
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';

export async function getAuditLogs(req, res) {
  try {
    const logs = await AuditLog.findAll({
      order: [['timestamp', 'DESC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'role'],
        required: false // <-- Don't skip logs even if user is missing
      }]
    });

    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
