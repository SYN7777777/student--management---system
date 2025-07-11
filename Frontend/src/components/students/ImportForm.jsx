import { useRef, useState } from 'react';
import axios from 'axios';

const ImportForm = ({ onSuccess }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleImport = async (e) => {
    e.preventDefault();

    const file = inputRef.current.files[0];
    if (!file) {
      alert('❌ Please choose a .xlsx file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const res = await axios.post('/api/students/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`✅ Imported: ${res.data.imported}, Skipped: ${res.data.skipped}`);
      onSuccess(); // refetch students
    } catch (err) {
      console.error(err);
      alert('❌ Failed to import file');
    } finally {
      setLoading(false);
      inputRef.current.value = ''; // clear the file input
    }
  };

  return (
    <form onSubmit={handleImport} className="flex gap-3 items-center">
      <input
        type="file"
        ref={inputRef}
        accept=".xlsx"
        className="border text-sm p-1"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        {loading ? 'Importing...' : '📤 Import Excel'}
      </button>
    </form>
  );
};

export default ImportForm;
