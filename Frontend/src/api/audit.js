import API from './axios';

export const fetchAuditLogs = async (token) => {
  const res = await API.get('/audit-logs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
