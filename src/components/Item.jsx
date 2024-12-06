import { HStack, Text, IconButton, Input, Button } from "@chakra-ui/react";
import { IoMdRemoveCircleOutline, IoMdCreate } from "react-icons/io";
import { CheckIcon } from "@chakra-ui/icons"; // Importamos el ícono de tilde

import { useState } from "react";

const Item = ({
  tarea,
  index,
  eliminarTarea,
  editarTarea,
  tareaCompletada,
}) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [textoEditado, setTextoEditado] = useState(tarea.texto);

  const guardarEdicion = () => {
    editarTarea(index, textoEditado);
    setModoEdicion(false);
  };

  return (
    <HStack
      justifyContent="space-between"
      width="100%"
      bg="white"
      p={2}
      borderRadius="8px"
      cursor="pointer"
      onClick={() => tareaCompletada(index)}
    >
      {modoEdicion ? (
        <HStack width="100%">
          <Input
            value={textoEditado}
            onChange={(e) => setTextoEditado(e.target.value)}
            placeholder="Editar tarea"
          />
          <Button size="sm" colorScheme="green" onClick={guardarEdicion}>
            Guardar
          </Button>
        </HStack>
      ) : (
        <>
          <HStack alignItems="center">
            {tarea.completada && <CheckIcon color="green.500" />}
            {/* Ícono de tilde */}

            <Text
              as={tarea.completada ? "s" : "span"} // Estilo tachado si está completada
              color={tarea.completada ? "gray.500" : "black"}
              ml={tarea.completada ? 2 : 0} // Espacio si hay un ícono
            >
              {tarea.texto}
            </Text>
          </HStack>
          <HStack>
            {/* Solo muestra los íconos si la tarea no está completada */}
            {!tarea.completada && (
              <>
                <IconButton
                  icon={<IoMdCreate />}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el clic afecte `tareaCompletada`
                    setModoEdicion(true);
                  }}
                  bg="blue.400"
                  color="white"
                />
                <IconButton
                  icon={<IoMdRemoveCircleOutline />}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el click afecte `tareaCompletada`
                    eliminarTarea(index);
                  }}
                  bg="red.400"
                  color="white"
                />
              </>
            )}
          </HStack>
        </>
      )}
    </HStack>
  );
};

export default Item;
