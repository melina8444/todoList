import {
  VStack,
  InputGroup,
  InputRightElement,
  Button,
  Input,
  Text,
  Box,
  Select,
} from "@chakra-ui/react";
import { IoAddCircle } from "react-icons/io5";
import { FcApproval } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";
import Item from "./Item";
import { useState } from "react";

const List = ({
  tareas,
  agregarTarea,
  eliminarTarea,
  editarTarea,
  tareaCompletada,
}) => {
  const [texto, setTexto] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("todos");

  const manejarAgregarTarea = () => {
    agregarTarea(texto);
    setTexto("");
  };

  const manejarCambioEstado = (e) => {
    setEstadoSeleccionado(e.target.value);
  };

  // Filtrar tareas según el estado seleccionado
  const tareasPendientes = tareas.filter((tarea) => !tarea.completada);
  const tareasCompletadas = tareas.filter((tarea) => tarea.completada);

  const tareasFiltradas =
    estadoSeleccionado === "pendientes"
      ? tareasPendientes
      : estadoSeleccionado === "completadas"
      ? tareasCompletadas
      : tareas;

  return (
    <VStack  spacing={4} bg="#d8bfdc" borderRadius="8px" p={4}>
      {/* Bloque con Select para elegir el estado de la tarea */}
      <div >
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Filtrar Tareas
        </Text>
        <Select
          value={estadoSeleccionado}
          onChange={manejarCambioEstado}
          bg="#f1f1f1"
          width="100%"
        >
          <option value="todos">Todas</option>
          <option value="pendientes">Pendientes</option>
          <option value="completadas">Completadas</option>
        </Select>
      </div>
      {/* Línea de separación */}
      <Box
        as="hr"
        border="0"
        borderTop="2px solid #7ca8ab"
        my={4}
        width="100%"
      />
      {/* Input y lista de tareas */}
      <div>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type="text"
            value={texto}
            placeholder="Ingrese la tarea"
            onChange={(e) => setTexto(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={manejarAgregarTarea}
              bg="#7ca8ab"
            >
              <IoAddCircle />
            </Button>
          </InputRightElement>
        </InputGroup>

        {/* Lista de tareas (pendientes o completadas según el filtro) */}
        <VStack spacing={2} width="100%">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Tareas
          </Text>
          {tareasFiltradas.map((tarea, index) => (
            <Item
              key={index}
              tarea={tarea}
              index={index}
              eliminarTarea={eliminarTarea}
              editarTarea={editarTarea}
              tareaCompletada={tareaCompletada}
            />
          ))}
        </VStack>
      </div>
    </VStack>
  );
};

export default List;
