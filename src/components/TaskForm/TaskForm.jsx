import { useState, useEffect, useRef } from "react"; // Importamos los hooks de React
import { v4 as uuidv4 } from "uuid"; // Para generar un ID único por cada tarea

// Definimos el componente TaskForm que recibe varias props
const TaskForm = ({ addTask, updateTask, editingTask, setEditingTask }) => {
  // Creamos estados locales para el título y la descripción de la tarea
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Creamos una referencia al formulario para poder hacer scroll hacia él
  const formRef = useRef(null); // <- Aquí creas la ref

  // Este useEffect se activa cuando cambia editingTask
  useEffect(() => {
    if (editingTask) {
      // Si hay una tarea para editar, llenamos el formulario con sus datos
      setTitle(editingTask.title);
      setDescription(editingTask.description);

      // Hacemos scroll al formulario suavemente cuando se edita una tarea
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editingTask]);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenimos que se recargue la página

    // Validación: no permitir título vacío
    if (!title.trim()) {
      alert("El título no puede estar vacío");
      return;
    }

    // Creamos el objeto de la nueva tarea (o actualizada)
    const newTask = {
      id: editingTask ? editingTask.id : uuidv4(), // Si estamos editando, mantenemos el ID
      title,
      description,
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date(), // Reutilizamos o asignamos nueva fecha
    };

    // Si estamos editando, actualizamos la tarea
    if (editingTask) {
      updateTask(newTask);
    } else {
      // Si no, agregamos una nueva
      addTask(newTask);
    }

    // Limpiamos el formulario y salimos del modo edición
    setTitle("");
    setDescription("");
    setEditingTask(null);
  };

  // JSX del formulario
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="left-column">
      {/* Título del formulario: cambia si estamos editando */}
      <h2>{editingTask ? "Editar Tarea" : "Agregar Tarea"}</h2>

      {/* Campo de entrada para el título */}
      <input
        type="text"
        placeholder="Título de tu Tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        pattern='[A-Za-z0-9 ]{3,50}'
        maxLength={50}
        title="Debe tener entre 3 y 50 letras, números o espacios"
      />
      <p className={`char-counter ${title.length >= 50 ? "limit-reached" : ""}`}>
      {title.length} / 50 caracteres
      </p>

      {/* Campo de entrada para la descripción */}
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={300} // Limita a 300 caracteres
      ></textarea>
      <p className={`char-counter ${description.length >= 300 ? "limit-reached" : ""}`}>
      {description.length} / 300 caracteres
      </p>


      {/* Botón para enviar el formulario */}
      <button type="submit" className="form-submit-button">
        {editingTask ? "Actualizar" : "+ Agregar"}
      </button>
    </form>
  );
};

export default TaskForm;