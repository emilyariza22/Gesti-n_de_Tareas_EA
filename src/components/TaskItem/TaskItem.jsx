// Definimos el componente TaskItem que recibe props relacionadas con la tarea
const TaskItem = ({ task, toggleComplete, deleteTask, setEditingTask }) => {
  return (
    // Contenedor principal de la tarea
    <div className="task-item">
      
      {/* Contenedor para la información de la tarea (checkbox + texto) */}
      <div className="taskItem-info">
        
        {/* Checkbox para marcar como completada la tarea */}
        <input
          type="checkbox" // tipo de input
          checked={task.completed} // marcado si la tarea está completada
          onChange={() => toggleComplete(task.id)} // cambia el estado completado
          className="taskItem-checkbox" // clase para estilos
        />
        
        {/* Contenedor del título y descripción */}
        <div className="taskItem-text">
          
          {/* Título de la tarea, cambia de clase si está completada */}
          <h3 className={task.completed ? "taskItem-completed" : "taskItem-pending"}>
            {task.title} {/* Mostramos el título */}
          </h3>

          {/* Descripción de la tarea */}
          <p className="task-description">{task.description}</p>
        </div>
      </div>

      {/* Contenedor de los botones de acción */}
      <div className="taskItem-buttons">
        
        {/* Botón para editar la tarea, activa el modo edición */}
        <button onClick={() => setEditingTask(task)} className="taskItem-button">
          Editar
        </button>

        {/* Botón para eliminar la tarea */}
        <button onClick={() => deleteTask(task.id)} className="taskItem-button">
          Eliminar
        </button>
      </div>
    </div>
  );
};

// Exportamos el componente para usarlo en otros archivos
export default TaskItem;
