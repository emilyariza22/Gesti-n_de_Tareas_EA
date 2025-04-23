import { FaEdit, FaTrash } from "react-icons/fa";

const TaskItem = ({ task, toggleComplete, deleteTask, setEditingTask }) => {
  return (
    <div className="task-item">

      <div className="taskItem-buttons-row">
        <div className="button-editar">
          <button onClick={() => setEditingTask(task)} className="taskItem-button">
            <FaEdit />
            Editar
          </button>
        </div>
        <div className="button-eliminar">
          <button onClick={() => deleteTask(task.id)} className="taskItem-button">
            <FaTrash />
            Eliminar
          </button>
        </div>
        {task.createdAt && (
          <div className="task-created">
            <p>Fecha: {new Date(task.createdAt).toLocaleDateString()}</p>
            <p>Hora: {new Date(task.createdAt).toLocaleTimeString()}</p>
          </div>
        )}
      </div>

      <div className="taskItem-info">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="taskItem-checkbox"
        />
        <div className="taskItem-text">
          <h3 className={task.completed ? "taskItem-completed" : "taskItem-pending"}>
            {task.title}
          </h3>
          <p className="task-description">{task.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
