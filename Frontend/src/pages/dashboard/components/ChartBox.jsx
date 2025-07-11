const ChartBox = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-lg font-bold mb-4 text-gray-700">{title}</h3>
      {children}
    </div>
  );
};

export default ChartBox;
