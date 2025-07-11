import { useState } from 'react';

const TeacherFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;
const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit({ email: email.trim(), password });
};

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Add New Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Gmail"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-500 hover:underline">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherFormModal;
