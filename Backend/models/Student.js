import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Student = sequelize.define('Student', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  class: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: false },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
  profilePhoto: { type: DataTypes.STRING }, // store file path or URL
}, {
  timestamps: true,
});

export default Student;
