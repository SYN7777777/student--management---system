import TeacherTableRow from './TeacherTableRow';

const TeacherTable = ({ teachers }) => {
  if (!teachers || teachers.length === 0)
    return (
      <p className="text-center text-gray-500 italic mt-4">
        No teachers found.
      </p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 text-sm rounded-md shadow-sm">
        <caption className="text-lg font-semibold mb-2 text-left p-2">
          Teachers List
        </caption>
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="p-3 text-left font-medium text-gray-700">Teacher ID</th>
            <th className="p-3 text-left font-medium text-gray-700">Email</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t, idx) => (
            <TeacherTableRow key={t.id} teacher={t} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
