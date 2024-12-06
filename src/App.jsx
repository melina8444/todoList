import { useState } from "react";
import { useToast } from "@chakra-ui/react";//importo useToast de chakra
import TodoList from "./components/TodoList";
import { setLocalStorage, getLocalStorage } from "./utils/localStorage";

import "./App.css";

function App() {
  const [tareas, setTareas] = useState(getLocalStorage("tareas") || []);
  const toast = useToast(); // Hooks para manejar las notificaciones

  const agregarTarea = (nuevaTarea) => {
    if (nuevaTarea.trim() === "") {
      toast({
        title: "Error",
        description: "Debes ingresar una tarea válida.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else if (nuevaTarea.trim().length < 4) {
      toast({
        title: "Error",
        description: "La tarea debe tener al menos 4 caracteres.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      const nuevasTareas = [
        ...tareas,
        { texto: nuevaTarea, completada: false },
      ];
      setTareas(nuevasTareas);
      setLocalStorage("tareas", nuevasTareas);
      toast({
        title: "Tarea agregada con éxito 👍",
        description: "Tu tarea se agregó correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const editarTarea = (index, nuevoTexto) => {
    if (nuevoTexto.trim() === "") {
      toast({
        title: "Error",
        description: "La tarea no puede estar vacía.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else if (nuevoTexto.trim().length < 4) {
      toast({
        title: "Error",
        description: "La tarea editada debe tener al menos 4 caracteres.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      const nuevasTareas = [...tareas];
      nuevasTareas[index].texto = nuevoTexto;
      setTareas(nuevasTareas);
      setLocalStorage("tareas", nuevasTareas);
      toast({
        title: "Tarea editada",
        description: "Tu tarea fue actualizada con éxito.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
    setLocalStorage("tareas", nuevasTareas);
    toast({
      title: "Tarea eliminada",
      description: "La tarea fue eliminada correctamente.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const tareaCompletada = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
    setLocalStorage("tareas", nuevasTareas);
    toast({
      title: "Estado actualizado",
      description: `La tarea fue marcada como ${
        nuevasTareas[index].completada ? "completada" : "incompleta"
      }.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
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
