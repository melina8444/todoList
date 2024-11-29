import { useState } from "react";
import TodoList from "./components/TodoList";
import { setLocalStorage, getLocalStorage } from "./utils/localStorage";

import "./App.css";

function App() {
  const [tareas, setTareas] = useState(getLocalStorage("tareas") || []);

  const agregarTarea = (nuevaTarea) => {
    if (nuevaTarea.trim() !== "") {
      const nuevasTareas = [
        ...tareas,
        { texto: nuevaTarea, completada: false }, 
      ];
      setTareas(nuevasTareas);
      setLocalStorage("tareas", nuevasTareas); // Guarda en localStorage
    } else {
      
      alert("Debes ingresar una tarea válida");
    }
  };


  const editarTarea = (index, nuevoTexto) => {
    if (nuevoTexto.trim() !== "") {
      const nuevasTareas = [...tareas];
      nuevasTareas[index].texto = nuevoTexto;
      setTareas(nuevasTareas);
      setLocalStorage("tareas", nuevasTareas); // Guardo en localStorage
    } else {
      alert("La tarea no puede estar vacía.");
    }
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
    setLocalStorage("tareas", nuevasTareas); // Guardo en localStorage
  };

  const tareaCompletada = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
    setLocalStorage("tareas", nuevasTareas); // Guarda en localStorage
  };

  return (
    <div className="container">
      <TodoList
        tareas={tareas}
        agregarTarea={agregarTarea}
        eliminarTarea={eliminarTarea}
        editarTarea={editarTarea}
        tareaCompletada={tareaCompletada}
      />
    </div>
  );
}

export default App;
