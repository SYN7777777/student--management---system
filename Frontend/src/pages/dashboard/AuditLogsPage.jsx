import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchAuditLogs } from '../../api/audit';

const AuditLogs = () => {
  const { token } = useSelector((state) => state.auth);

  const { data: logs = [], isLoading, isError } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: () => fetchAuditLogs(token),
  });

  if (isLoading) return <p>Loading logs...</p>;
  if (isError) return <p>Failed to fetch logs.</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Audit Logs</h2>
      <div className="overflow-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">User Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Action</th>
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b">
                <td className="p-2 border">{log.user?.email}</td>
                <td className="p-2 border">{log.user?.role}</td>
                <td className="p-2 border capitalize">{log.action}</td>
                <td className="p-2 border">{log.studentId}</td>
                <td className="p-2 border">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
