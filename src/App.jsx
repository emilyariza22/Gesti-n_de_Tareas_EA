// Importamos los hooks necesarios desde React
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";// Para generar un ID único por cada tarea
// Importamos los componentes que vamos a usar en esta app
import TaskForm from "./components/TaskForm/TaskForm"; // Formulario para crear/editar tareas
import TaskList from "./components/TaskList/TaskList"; // Lista de tareas
import TaskFilter from "./components/TaskFilter/TaskFilter"; // Botones de filtro
import TaskStats from "./components/TaskStats/TaskStats"; // Estadísticas de tareas

// Definimos el componente principal App
const App = () => {

  // Creamos el estado "tasks" (lista de tareas)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks"); // Intentamos recuperar tareas guardadas
    return savedTasks ? JSON.parse(savedTasks) : [];  // Si existen, las parseamos, si no, devolvemos un array vacío
  });

  // Estado para controlar qué filtro está activo (all, active, completed)
  const [filter, setFilter] = useState("all");
  // Estado para saber si estamos editando una tarea (y cuál)
  const [editingTask, setEditingTask] = useState(null);

  // Este guarda las tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Convertimos a string para guardarlo
  }, [tasks]); // Solo se ejecuta cuando 'tasks' cambia

  // Función que agrega una nueva tarea
  const addTask = (task) => {
    setTasks([
      ...tasks, // Copiamos las tareas anteriores
      { ...task, id: uuidv4(), completed: false } // Añadimos una nueva tarea con ID y estado "no completada"
    ]);
  };

  // Función que actualiza una tarea ya existente
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task // Reemplazamos la tarea editada
    ));
    setEditingTask(null); // Terminamos el modo edición
  };

  // Función que elimina una tarea usando su ID
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); // Filtramos la tarea a eliminar
  };

  // Función para cambiar el estado "completed" de una tarea
  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed } // Si es la tarea, invertimos su estado completado
          : task // Si no, la dejamos igual
      )
    );
  };

  // JSX que define lo que se renderiza en pantalla
  {/* Contenedor principal de la app */}
  return (
    <div className="app-container">
      
      <h1 className="main-title">Gestión de Tareas</h1>

      {/* Separa (formulario) de (filtros) */}
      <div className="main-content">

        {/* Columna formulario */}
        <div className="left-column">
          <TaskForm
            addTask={addTask} // Función para agregar tarea
            updateTask={updateTask} // Función para actualizar tarea
            editingTask={editingTask} // Tarea que se está editando
            setEditingTask={setEditingTask} // Cambia el estado de edición
          />
        </div>

        {/* Columna derecha: filtros y estadísticas */}
        <div className="right-column">
          <TaskFilter filter={filter} setFilter={setFilter} /> {/* Botones para filtrar */}
          <TaskStats tasks={tasks} /> {/* Muestra cuántas tareas pendientes hay */}
        </div>
      </div>

      {/* Encabezado para la sección de listado */}
      <h2 className="text-2xl font-bold mb-4 text-center drop-shadow">
        Listado de tareas
      </h2>

      {/* Aquí se muestra la lista filtrada de tareas */}
      <div className="task-list-container">
        <TaskList
          tasks={tasks} // Lista total de tareas
          filter={filter} // Filtro activo
          toggleComplete={toggleComplete} // Marcar como completada/incompleta
          deleteTask={deleteTask} // Eliminar tarea
          setEditingTask={setEditingTask} // Cambiar a modo edición
        />
      </div>
    </div>
  );
};

export default App;