// models/AuditLog.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const AuditLog = sequelize.define('AuditLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false }, // 'add', 'edit', 'delete'
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  changes: { type: DataTypes.JSONB }, // Before/after state
});

// ✅ Aliased association for eager loading
AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(AuditLog, { foreignKey: 'userId', as: 'logs' });

export default AuditLog;
