const StudentTableRow = ({ student, role, onEdit, onDelete, isEven }) => (


  
  <tr className={`transition-colors ${isEven ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
    <td className="p-3">
      <img
        src={`http://localhost:5000/uploads/${student.profilePhoto}`} 
        alt={student.name}
        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-200 shadow-sm"
      />
    </td>
    
    
    <td className="p-3 font-medium text-gray-800">{student.name}</td>
    <td className="p-3 text-gray-600">{student.email}</td>
    <td className="p-3">
      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
        {student.class}
      </span>
    </td>
    <td className="p-3 capitalize">{student.gender}</td>
    <td className="p-3">{student.dateOfBirth}</td>
    {role === 'admin' && (
      <td className="p-3 space-x-2 text-center">
        <button
          onClick={() => onEdit(student)}
          className="inline-block px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded shadow transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(student.id)}
          className="inline-block px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow transition"
        >
          Delete
        </button>
      </td>
    )}
  </tr>
);

export default StudentTableRow;
