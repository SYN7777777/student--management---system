import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
  createStudentApi,
  deleteStudent,
  fetchStudents,
  updateStudent,
} from '../../api/students';

import StudentTable from '../../components/students/StudentTable';
import Filters from '../../components/students/Filters';
import Pagination from '../../components/students/Pagination';
import StudentFormModal from '../../components/students/StudentFormModal';
import ImportForm from '../../components/students/ImportForm';
import ExportButton from '../../components/students/ExportButton';

const StudentsPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [className, setClassName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editData, setEditData] = useState(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['students', page, search, className],
    queryFn: () => fetchStudents({ page, search, className, token }),
    keepPreviousData: true,
  });

  const { students = [], pages = 1, page: currentPage = 1 } = data ?? {};

  

  const handleCreateStudent = async (formData) => {
    try {
      await createStudentApi(formData);
      setShowCreate(false);
      refetch();
    } catch (err) {
      console.error(err);
      alert('Failed to create student');
    }
  };

  const handleUpdateStudent = async (formData) => {
    try {
      await updateStudent({ id: editData.id, formData });
      setEditData(null);
      refetch();
    } catch (err) {
      console.error(err);
      alert('Failed to update student');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      await deleteStudent(id);
      refetch();
    } catch (err) {
      console.error(err);
      alert('Failed to delete student');
    }
  };

  return (
   <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold">Students</h1>
      <p className="text-gray-500 mt-1">Manage student records, import/export data, and more.</p>
    </div>
    {user.role === 'admin' && (
      <div className="flex items-center gap-2">
        <ImportForm onSuccess={refetch} />
        <ExportButton />
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded shadow"
        >
          <span>➕</span> Add Student
        </button>
      </div>
    )}
  </div>

  <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
    <Filters
      search={search}
      setSearch={setSearch}
      className={className}
      setClassName={setClassName}
    />
  </div>

  {isLoading && <p className="text-gray-600">Loading students...</p>}
  {isError && <p className="text-red-600">Failed to load students.</p>}

  

  {!isLoading && !isError && (
    
    <>
      <StudentTable
        students={students}        
        role={user.role}
        onEdit={setEditData}
        onDelete={handleDeleteStudent}
      />
      <div className="mt-4">
       <Pagination
  totalPages={pages}
  currentPage={currentPage}
  onPageChange={setPage}
/>

      </div>
    </>
  )}

  {user.role === 'admin' && showCreate && (
    <StudentFormModal
      isOpen={showCreate}
      onClose={() => setShowCreate(false)}
      onSubmit={handleCreateStudent}
    />
  )}

  {user.role === 'admin' && editData && (
    <StudentFormModal
      isOpen={!!editData}
      initialData={editData}
      onClose={() => setEditData(null)}
      onSubmit={handleUpdateStudent}
    />
  )}
</div>

  );
};

export default StudentsPage;
