import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import auditRoutes from './routes/auditRoutes.js'


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/students', studentRoutes);
app.use('/api/audit-logs', auditRoutes);


const PORT = process.env.PORT || 5000;

// Sync Sequelize models, then start the server
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database sync error:', err);
  });

