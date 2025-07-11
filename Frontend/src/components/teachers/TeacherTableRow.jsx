const TeacherTableRow = ({ teacher }) => {
  return (
    <tr className="border-t">
      <td className="p-2">{teacher.teacherId}</td>
      <td className="p-2">{teacher.email}</td>
    </tr>
  );
};

export default TeacherTableRow;
