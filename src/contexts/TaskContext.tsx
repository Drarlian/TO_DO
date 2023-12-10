import {createContext, useState} from 'react';
import react, {ReactNode} from 'react';

interface Props{
    tasks: Task[];
    estadoInput: boolean;
    setEstadoInput: React.Dispatch<React.SetStateAction<boolean>>;
    objInput: Task;
    setObjInput: React.Dispatch<React.SetStateAction<Task>>;
    adicionaTask: (name: string) => void;
    editaNameTask: () => void;
    editaStatusTask: (id: number) => void;
    removeTask: (id: number) => void;
}

interface TypeChildrenNode{
    children: ReactNode;
}

export type Task = {
    id: number,
    name: string,
    status: boolean,  // Se refere ao estado em que a tarefa está, true = Concluida | false = Em progresso.
}

export const TaskContext = createContext({} as Props);

export function TaskProvider({children}: TypeChildrenNode){
    const [tasks, setTaks] = useState<Task[]>([
        {
            id: 1,
            name: 'Comprar pão',
            status: false,
        },
        {
            id: 2,
            name: 'Ir na academia',
            status: false,
        },
        {
            id: 3,
            name: 'Estudar',
            status: false,
        }
    ]); // Array de Objetos, onde cada objeto é uma tarefa.

    const [estadoInput, setEstadoInput] = useState<boolean>(true);  // Define se o Input vai estar em Modo Normal ou Modo de Edição.
    const [objInput, setObjInput] = useState<Task>({
        id: 0,
        name: 'None',
        status: false
    });  // Objeto contendo a tarefa que será editada no Input de Edição.

    function adicionaTask(name: string){
        //  Adiciona um tarefa ao array de tarefas.

        const newId = tasks.length + 1

        const obj = {
            id: newId,
            name: name,
            status: false,
        }

        setTaks([...tasks, obj])
    }
    
    function editaNameTask(){
        /* 
            Altera a tarefa que possui o id informado. 
            O id para busca e o novo nome estão presentes no objInput.
        */

        setTaks((prevTasks) => {
            return prevTasks.map((tarefa) => {
                if (tarefa.id === objInput.id){
                    return {...tarefa, name: objInput.name};
                }
                return tarefa;
            })
        } )
    }

    function editaStatusTask(id: number) {
        // Procura pela tarefa no array, quando achar inverte o status da task.

        setTaks((prevTasks) => {
            return prevTasks.map((task) => {
                if (task.id === id) {
                return { ...task, status: !task.status };
                }
                return task;
          });
        });
      }

    function removeTask(id: number){
        // Remove uma tarefa baseada no id.

        if (!estadoInput && id === objInput.id){  
            // Troca de volta para o Input Normal caso esteja no Input de Edição e a tarefa removida foi a que está sendo editada.
            setEstadoInput(!estadoInput);
        }
        const newObj = tasks.filter((tarefa) => tarefa.id != id);
        setTaks(newObj);
    }

    return <TaskContext.Provider value={{tasks, estadoInput, setEstadoInput, objInput, setObjInput, adicionaTask, editaNameTask, editaStatusTask, removeTask}}>{children}</TaskContext.Provider>
}
