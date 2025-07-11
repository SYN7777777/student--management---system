import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const SidebarLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-4 py-2 rounded-lg transition font-medium ${
        isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
      }`}
    >
      {label}
    </Link>
  );
};

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          {user?.role === 'admin' ? 'Admin Panel' : 'Teacher Panel'}
        </h1>

        <SidebarLink to="/dashboard" label="Dashboard" />
        <SidebarLink to="/dashboard/students" label="Students" />

        {/* Admin-only links */}
        {user?.role === 'admin' && (
          <>
            <SidebarLink to="/dashboard/teachers" label="Teachers" />
            <SidebarLink to="/dashboard/audit-logs" label="Audit Logs" />
          </>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white p-4 rounded shadow mb-4 text-gray-800 text-lg font-semibold">
          Welcome, {user?.role === 'admin' ? 'Admin' : user?.email}
        </div>

        {/* Route Children */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
