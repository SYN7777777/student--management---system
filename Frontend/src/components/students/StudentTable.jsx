import StudentTableRow from './StudentTableRow';

const StudentTable = ({ students, role, onEdit, onDelete }) => {
  if (!Array.isArray(students) || students.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 text-lg bg-gray-50 rounded-lg shadow-inner">
        No students to display.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700">
            <th className="p-3 font-semibold text-left rounded-tl-lg">Photo</th>
            <th className="p-3 font-semibold text-left">Name</th>
            <th className="p-3 font-semibold text-left">Email</th>
            <th className="p-3 font-semibold text-left">Class</th>
            <th className="p-3 font-semibold text-left">Gender</th>
            <th className="p-3 font-semibold text-left">DOB</th>
            {role === 'admin' && (
              <th className="p-3 font-semibold text-center rounded-tr-lg">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {students.map((stu, idx) => (
            <StudentTableRow
              key={stu.id}
              student={stu}
              role={role}
              onEdit={onEdit}
              onDelete={onDelete}
              isEven={idx % 2 === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
