import Student from "../models/Student.js";
import ExcelJS from 'exceljs';
import { Op } from "sequelize";
import AuditLog from "../models/AuditLog.js";

export async function createStudent(req, res) {
  try {
    const { name, email, class: studentClass, gender, dateOfBirth } = req.body;
     console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    let profilePhoto = null;
    if (req.file) {
      profilePhoto = req.file.filename;
    }
       const existing = await Student.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "A student with this email already exists." });
    }
    const student = await Student.create({
      name,
      email,
      class: studentClass,
      gender,
      dateOfBirth,
      profilePhoto,
    });

    // AUDIT LOG
    await AuditLog.create({
      userId: req.user.id,
      action: 'add',
      studentId: student.id,
      changes: { after: student.toJSON() },
    });

    res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    
  console.error(error); 
    res.status(400).json({ message: error.message });
  }
}
// controllers/studentController.js
export async function getStudents(req, res) {
  const { search, class: className, gender, page = 1, limit = 5 } = req.query;
  const where = {};
  if (search) where.name = { [Op.iLike]: `%${search}%` };
  if (className) where.class = className;
  if (gender) where.gender = gender;

  const students = await Student.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
  });
  res.json({
    students: students.rows,
    total: students.count,
    page: parseInt(page),
    pages: Math.ceil(students.count / limit),
  });
}
export async function getTotalStudents(req, res) {
  try {
    const total = await Student.count();
    res.json({ totalStudents: total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.profilePhoto = req.file.filename;
    }

    const before = await Student.findByPk(id);
    if (!before) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const [updated] = await Student.update(updates, { where: { id } });
    if (updated) {
      const after = await Student.findByPk(id);

      // AUDIT LOG
      await AuditLog.create({
        userId: req.user.id,
        action: 'edit',
        studentId: id,
        changes: { before: before.toJSON(), after: after.toJSON() },
      });

      return res.json({ message: 'Student updated', student: after });
    }
    res.status(404).json({ message: 'Student not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const before = await Student.findByPk(id);
    if (!before) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const deleted = await Student.destroy({ where: { id } });
    if (deleted) {
      // AUDIT LOG
      await AuditLog.create({
        userId: req.user.id,
        action: 'delete',
        studentId: id,
        changes: { before: before.toJSON() },
      });

      return res.json({ message: 'Student deleted' });
    }
    res.status(404).json({ message: 'Student not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export async function getStudentById(req, res) {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function exportStudentsToExcel(req, res) {
  try {
    const students = await Student.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    // Define columns
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Class', key: 'class', width: 15 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Date of Birth', key: 'dateOfBirth', width: 15 },
      { header: 'Profile Photo', key: 'profilePhoto', width: 40 },
      { header: 'Created At', key: 'createdAt', width: 20 },
      { header: 'Updated At', key: 'updatedAt', width: 20 },
    ];

    // Add rows
    students.forEach(student => {
      worksheet.addRow({
        id: student.id,
        name: student.name,
        email: student.email,
        class: student.class,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,
        profilePhoto: student.profilePhoto,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      });
    });

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=students.xlsx'
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export async function importStudentsFromExcel(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet('Students') || workbook.worksheets[0];

    const results = [];
    const errors = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      const [id, name, email, studentClass, gender, dateOfBirth, profilePhoto] = row.values.slice(1);

      // Validate required fields
      if (!name || !email || !studentClass || !gender || !dateOfBirth) {
        errors.push({ row: rowNumber, error: 'Missing required fields' });
        return;
      }

      results.push({ name, email, class: studentClass, gender, dateOfBirth, profilePhoto });
    });

    // Check for duplicates (by email)
    const existingEmails = (await Student.findAll({ where: { email: results.map(r => r.email) } })).map(s => s.email);
    const filteredResults = results.filter(r => !existingEmails.includes(r.email));

    // Bulk create
    const created = await Student.bulkCreate(filteredResults, { ignoreDuplicates: true });

    res.json({
      message: 'Import completed',
      imported: created.length,
      skipped: results.length - created.length,
      errors
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// Controller: getStudentsByClass
export async function getStudentsByClass(req, res) {
  try {
    const students = await Student.findAll();

    const classCounts = {};
    students.forEach((student) => {
      const cls = student.class;
      if (cls) {
        classCounts[cls] = (classCounts[cls] || 0) + 1;
      }
    });

    res.json(classCounts); // example: { "Class 1": 10, "Class 2": 5 }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getGenderRatio(req, res) {
  try {
    const male = await Student.count({ where: { gender: 'male' } });
    const female = await Student.count({ where: { gender: 'female' } });
    res.json({ male, female });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

