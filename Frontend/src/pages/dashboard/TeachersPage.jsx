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
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Teachers</h1>
        <button onClick={() => setShowCreate(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Add Teacher
        </button>
      </div>

      {isLoading ? <p>Loading...</p> : <TeacherTable teachers={teachers} />}

      <TeacherFormModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreateTeacher}
      />
    </div>
  );
};

export default TeachersPage;
