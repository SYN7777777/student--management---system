// src/components/students/ExportButton.jsx
import React from 'react';

const ExportButton = () => {
  const handleDownload = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/students/export', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return alert('Export failed');
    }

    const blob = await res.blob();
    const url  = window.URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'students.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Export Students
    </button>
  );
};

export default ExportButton;
