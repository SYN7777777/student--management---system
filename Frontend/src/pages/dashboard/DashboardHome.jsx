import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

import {
  fetchGenderRatio,
  fetchStudentsPerClass,
  fetchTotalStudents,
} from '../../api/students';

import StatCard from './components/StarCard';
import ChartBox from './components/ChartBox';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardHome = () => {
  const { user } = useSelector((state) => state.auth);

  // 👉 If the user is a teacher, show a welcome message only
  if (user?.role === 'teacher') {
    return (
      <div className="text-2xl font-semibold text-gray-700">
        Welcome, Teacher 👋 <br />
        Your dashboard is under construction or limited.
      </div>
    );
  }

  // 👇 Only runs for admin (because of `enabled`)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard-admin-stats'],
    queryFn: async () => {
      const [totalStudents, genderRatio, studentsPerClass] = await Promise.all([
        fetchTotalStudents(),
        fetchGenderRatio(),
        fetchStudentsPerClass(),
      ]);
      return { totalStudents, genderRatio, studentsPerClass };
    },
    enabled: user?.role === 'admin',
  });

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Error loading dashboard data.</p>;

  const { totalStudents, genderRatio, studentsPerClass } = data;

  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold text-gray-700 mb-4">Welcome, Admin</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Students" value={totalStudents} />
        <StatCard title="Male Students" value={genderRatio.male} />
        <StatCard title="Female Students" value={genderRatio.female} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartBox title="Gender Ratio">
          <Pie 
            data={{
              labels: ['Male', 'Female'],
              datasets: [
                {
                  data: [genderRatio.male, genderRatio.female],
                  backgroundColor: ['#36A2EB', '#FF6384'],
                },
              ],
            }}
          />
        </ChartBox>

        <ChartBox title="Students Per Class">
          <Bar
            data={{
              labels: Object.keys(studentsPerClass),
              datasets: [
                {
                  label: 'Students',
                  data: Object.values(studentsPerClass),
                  backgroundColor: '#4CAF50',
                },
              ],
            }}
          />
        </ChartBox>
      </div>
    </div>
  );
};

export default DashboardHome;
