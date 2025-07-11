// src/components/students/StudentFormModal.jsx
import { useState, useEffect } from 'react';

const initialForm = {
  name: '',
  email: '',
  class: '',
  gender: 'male',
  dateOfBirth: '',
  profilePhoto: null,
};

const StudentFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialForm);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, profilePhoto: null }); // don't pre-fill image
    } else {
      setFormData(initialForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profilePhoto') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
      setPreview(URL.createObjectURL(file)); // Preview image
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null) form.append(key, val);
    });
    onSubmit(form); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Edit Student' : 'Add Student'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="class"
            type="text"
            value={formData.class}
            onChange={handleChange}
            placeholder="Class"
            required
            className="w-full p-2 border rounded"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* 👇 Profile Photo Upload */}
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {preview && <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded" />}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="text-gray-500 hover:underline">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {initialData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
