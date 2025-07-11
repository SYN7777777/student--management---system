const TeacherTableRow = ({ teacher }) => {
  return (
    <tr className="border-t hover:bg-blue-50 transition-colors">
      <td className="p-3 font-mono text-gray-800">{teacher.teacherId}</td>
      <td className="p-3 text-gray-700">{teacher.email}</td>
    </tr>
  );
};

export default TeacherTableRow;
