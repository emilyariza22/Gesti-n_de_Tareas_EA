// Importamos el componente TaskItem desde su ubicación
import TaskItem from '../TaskItem/TaskItem'

// Definimos el componente TaskList, recibe props necesarias para mostrar y manejar tareas
const TaskList = ({ tasks, filter, toggleComplete, deleteTask, setEditingTask }) => {

  // Filtramos las tareas según el filtro seleccionado: activas, completadas o todas
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;    // Solo tareas no completadas
    if (filter === "completed") return task.completed;  // Solo tareas completadas
    return true;                                         // Todas las tareas
  });

  return (
    // Contenedor principal de la lista de tareas
    <div className="task-list-container">
      
      {/* Si hay tareas luego de filtrar, las mostramos */}
      {filteredTasks.length > 0 ? (
        // Recorremos cada tarea y la mostramos usando el componente TaskItem
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id} // clave única por cada tarea
            task={task} // datos de la tarea
            toggleComplete={toggleComplete} // función para marcar completada
            deleteTask={deleteTask} // función para eliminar tarea
            setEditingTask={setEditingTask} // función para editar tarea
          />
        ))
      ) : (
        // Si no hay tareas, mostramos un mensaje
        <p className="no-tasks">No hay tareas</p>
      )}
    </div>
  );
};

export default TaskList;
