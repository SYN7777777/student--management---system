import TeacherTableRow from './TeacherTableRow';

const TeacherTable = ({ teachers }) => {
  if (!teachers || teachers.length === 0)
    return <p className="text-center text-gray-500">No teachers found.</p>;

  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Teacher ID</th>
          <th className="p-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((t) => (
          <TeacherTableRow key={t.id} teacher={t} />
        ))}
      </tbody>
    </table>
  );
};

export default TeacherTable;
