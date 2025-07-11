const Filters = ({ search, setSearch, className, setClassName }) => {
  return (
    <div className="flex gap-4">
      <input
        className="border p-2 rounded w-60"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        className="border p-2 rounded w-60"
        placeholder="Filter by class"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
    </div>
  );
};

export default Filters;
