const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 text-center">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  );
};

export default StatCard;
