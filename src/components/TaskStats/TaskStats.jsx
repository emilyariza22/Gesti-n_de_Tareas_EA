// Definimos el componente TaskStats, recibe las tareas como prop
const TaskStats = ({ tasks }) => {
  // Filtramos las tareas que no están completadas y contamos cuántas hay
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    // Mostramos el número de tareas pendientes sobre el total de tareas
    <p className="task-stats">
      Tareas pendientes: {pendingTasks} de {tasks.length}
    </p>
  );
};

export default TaskStats;
