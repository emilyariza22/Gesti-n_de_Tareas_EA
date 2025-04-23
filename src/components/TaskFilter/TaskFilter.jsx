const TaskFilter = ({ setFilter }) => {
  const filters = [
    { label: "Todas", value: "all", className: "button-all" },
    { label: "Activas", value: "active", className: "button-active" },
    { label: "Completadas", value: "completed", className: "button-completed" },
  ];

  return (
    <div className="TaskFilter-container">
      {filters.map(({ label, value, className }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={className}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;