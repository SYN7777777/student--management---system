import axios from 'axios';
import API from './axios';

export const fetchTeachers = async (token) => {
  const res = await API.get('/user/teacher', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.teachers;
};

export const createTeacherApi = async ({ email, password, token }) => {
  const res = await API.post(
    '/user/teacher',
    { email, password }, // ✅ send correct keys
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.teacher;
};
