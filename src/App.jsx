import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Para generar un ID único
import TaskForm from "./components/TaskForm/TaskForm"; // Componente para agregar/editar tareas
import TaskList from "./components/TaskList/TaskList"; // Componente que muestra el listado de tareas
import TaskFilter from "./components/TaskFilter/TaskFilter"; // Componente para filtrar tareas (activas, completadas, todas)
import TaskStats from "./components/TaskStats/TaskStats"; // Componente que muestra estadísticas de tareas

const App = () => {
  // Estado que guarda la lista de tareas
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks"); // Intenta recuperar las tareas guardadas del localStorage
    return savedTasks ? JSON.parse(savedTasks) : []; // Si existen, los analiza; si no, empieza con un lista vacía
  });

  // Estado para el filtro de tareas (todos, activos, completados)
  const [filter, setFilter] = useState("all");

  // Estado para gestionar la tarea que se está editando
  const [editingTask, setEditingTask] = useState(null);

  // Efecto para actualizar el localStorage cuando las tareas cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Guarda las tareas actuales en localStorage
  }, [tasks]);

  // Función para agregar una nueva tarea
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: uuidv4(), completed: false }]); // Añade una tarea nueva con un ID único generado
  };

  // Función para actualizar una tarea existente
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))); // Reemplaza la tarea modificada
    setEditingTask(null); // Deja de estar en modo de edición
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId) => setTasks(tasks.filter((task) => task.id !== taskId)); // Filtra la tarea a eliminar

  // Función para alternar el estado de completado de una tarea
  const toggleComplete = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )); // Cambia el estado "completed" de la tarea indicada
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Gestión de Tareas</h1>
      <div className="main-content">
        <div className="left-column">
          {/* Componente para crear y editar tareas */}
          <TaskForm
            addTask={addTask}
            updateTask={updateTask}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        </div>
        <div className="right-column">
          {/* Componente para filtrar tareas por estado */}
          <TaskFilter filter={filter} setFilter={setFilter} />
          {/* Componente para mostrar estadísticas de tareas */}
          <TaskStats tasks={tasks} />
        </div>
      </div>
      <h2 className="task-list-title">Listado de tareas</h2>
      {/* Componente que lista las tareas filtradas */}
      <TaskList
        tasks={tasks.filter((task) => {
          if (filter === "active") return !task.completed; // Solo tareas no completadas
          if (filter === "completed") return task.completed; // Solo tareas completadas
          return true; // Si el filtro es 'all', muestra todas
        })}
        filter={filter}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        setEditingTask={setEditingTask}
      />
      <footer className="footer">
        <p>&copy; 2025 Gestión de Tareas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;