import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import TeacherFormModal from '../../components/teachers/TeacherFormModal';
import TeacherTable from '../../components/teachers/TeacherTable';
import { createTeacherApi, fetchTeachers } from '../../api/teacher';

const TeachersPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [showCreate, setShowCreate] = useState(false);

  const { data: teachers = [], refetch, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => fetchTeachers(token),
  });

  const handleCreateTeacher = async ({ email, password }) => {
    try {

       await createTeacherApi({ email: email.trim(), password }); // ✅ correct key
      setShowCreate(false);
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create teacher');
    }
  };

  return (
 <div className="p-6 space-y-6 bg-white rounded-lg shadow-md w-full">
  {/* Header */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Teachers</h1>
    <button
      onClick={() => setShowCreate(true)}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-lg shadow font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <span className="text-lg">➕</span>
      <span>Add Teacher</span>
    </button>
  </div>

  {/* Table or Loading */}
  <div className="bg-gray-50 rounded-md shadow-inner p-4 min-h-[120px] w-full">
    {isLoading ? (
      <div className="flex items-center justify-center h-24">
        <svg
          className="animate-spin h-6 w-6 text-blue-600 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span className="text-gray-500">Loading...</span>
      </div>
    ) : (
      <TeacherTable teachers={teachers} />
    )}
  </div>

  {/* Modal */}
  <TeacherFormModal
    isOpen={showCreate}
    onClose={() => setShowCreate(false)}
    onSubmit={handleCreateTeacher}
  />
</div>

  );
};

export default TeachersPage;
