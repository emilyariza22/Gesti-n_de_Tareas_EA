// Definimos el componente funcional TaskStats que recibe las tareas como prop
const TaskStats = ({ tasks }) => {
  // Contamos el total de tareas
  const totalTasks = tasks.length;

  // Filtramos las tareas activas (no completadas)
  const activeTasks = tasks.filter(task => !task.completed).length;

  // Filtramos las tareas completadas
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    // Contenedor principal con clases opcionales para estilizar (centrado y márgenes)
    <div className="task-stats text-center mt-4">
      {/* Mostramos el total de tareas */}
      <p><strong>Total:</strong> {totalTasks}</p>

      {/* Mostramos cuántas tareas están activas (pendientes) */}
      <p><strong>Activas:</strong> {activeTasks}</p>

      {/* Mostramos cuántas tareas fueron completadas */}
      <p><strong>Completadas:</strong> {completedTasks}</p>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otros archivos
export default TaskStats;
