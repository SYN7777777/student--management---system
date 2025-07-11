import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export async function createTeacher(req, res) {
  try {

    
    console.log('REQ BODY:', req.body); //

    const { email, password } = req.body;

    // 1. Basic validation
   if (!email?.trim().endsWith('@gmail.com')) {
  return res.status(400).json({ message: 'Email must be a Gmail address.' });
}


    // 2. Check duplicate
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // 3. Hash password & generate teacherId
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacherId = 'TCHR-' + Math.random().toString(36).substr(2, 8).toUpperCase();

    // 4. Create user row
    const teacher = await User.create({
      email,
      password: hashedPassword,
      role: 'teacher',
      teacherId,
    });

    // 5. Response
    res.status(201).json({
      message: 'Teacher created successfully.',
      teacher: {
        email: teacher.email,
        teacherId: teacher.teacherId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
export const getAllTeachers = async (req, res) => {
  const teachers = await User.findAll({
    where: { role: 'teacher' },
    attributes: ['id', 'email', 'teacherId'],
  });
  res.json({ teachers });
};
