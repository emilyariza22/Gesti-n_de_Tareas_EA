// Importo el componente funcional TaskFilter
const TaskFilter = ({ filter, setFilter }) => {
  return (
    // Contenedor principal que agrupa los botones de filtro
    <div className="TaskFilter-container">
      {[
        { label: "Todas", value: "all" },
        { label: "Activas", value: "active" },
        { label: "Completadas", value: "completed" }
        //.map() para recorrer el array y crear un botón para cada filtro.
      ].map(({ label, value }) => (
        <button
        // Usamos el valor del filtro como clave única
          key={value}
          // Cuando el botón se presiona, se actualiza el filtro actual
          onClick={() => setFilter(value)}
          // Asignamos clases: una clase base para el estilo y otra condicional si está activo
          className={`TaskFilter-button ${filter === value ? "active" : ""}`}
          >
          {/* Mostramos el texto del botón (label) */}
          {label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;