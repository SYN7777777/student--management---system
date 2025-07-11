import bcrypt from 'bcryptjs';
import sequelize from './config/database.js';
import User from './models/User.js';

async function seedAdmin() {
  await sequelize.sync();

  const existingAdmin = await User.findOne({ where: { role: 'admin' } });
  if (existingAdmin) {
    console.log('❌ Admin user already exists');
    process.exit();
  }

  const hashedPassword = await bcrypt.hash('Pass1234', 10);

  await User.create({
    email: 'adminSMS@gmail.com',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log('✅ Admin user created with email: adminSMS@gmail.com and password: Pass1234');
  process.exit();
}

seedAdmin();
