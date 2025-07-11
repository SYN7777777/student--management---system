import API from './axios';

// 1. Total number of students
export const fetchTotalStudents = async () => {
  const res = await API.get('/students/stats/total');
  return res.data.totalStudents;
};

// 2. Gender ratio
export const fetchGenderRatio = async () => {
  const token = localStorage.getItem('token');
  const res = await API.get('/students/stats/gender', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { male: number, female: number }
};

// 3. Students per class
export const fetchStudentsPerClass = async () => {
  const token = localStorage.getItem('token');
  const res = await API.get('/students/stats/by-class', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { "Class 1": 10, "Class 2": 20, ... }
};
// src/api/students.js
import axios from 'axios';

export const fetchStudents = async ({ page, search, className, token }) => {
  const res = await axios.get('/api/students', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      search,
      class: className,
    },
  });

  return res.data; // Should return { students: [], totalPages: x }
};

export const createStudentApi = async (formData) => {
  const token = localStorage.getItem('token');
  const res = await axios.post('/api/students', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
export const updateStudent = async ({ id, formData }) => {
  const token = localStorage.getItem('token');
  return axios.put(`/api/students/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`, // ✅ Include JWT
    },
  });
};

export const deleteStudent = async (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(`/api/students/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Include JWT
    },
  });
};
