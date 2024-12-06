import { VStack, Heading, Box} from "@chakra-ui/react";
import List from "./List";
import { IoListSharp } from "react-icons/io5";


const TodoList = ({
  tareas,
  agregarTarea,
  eliminarTarea,
  editarTarea,
  tareaCompletada,
}) => {
  return (
    <VStack minHeight='100vh' minWidth={20} spacing={20} justifyContent="center">
      <Heading
        bgGradient="linear(to-tr, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="extrabold"
        
      >
        Lista de Tareas
        <Box
          as="span"
          display="inline-block"
          p={2}
          bg="##e1c6b3"
          borderRadius="50%"
          ml={2}
          justifyContent="Center"
          alignItems="center"
        >
          <IoListSharp />
        </Box>
      </Heading>

      <List
        tareas={tareas}
        agregarTarea={agregarTarea}
        eliminarTarea={eliminarTarea}
        editarTarea={editarTarea}
        tareaCompletada={tareaCompletada}
      />
    </VStack>
  );
};

export default TodoList;
