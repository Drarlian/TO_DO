import {createContext, useState} from 'react';
import react, {ReactNode} from 'react';

interface Props{
    tasks: Task[];
    adicionaTask: (name: string) => void;
    editaNameTask: (id: number, Newname: string) => void;
    editaStatusTask: (id: number) => void;
    removeTask: (id: number) => void;
}

interface TypeChildrenNode{
    children: ReactNode;
}

type Task = {
    id: number,
    name: string,
    status: boolean,
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
    ]); 

    function adicionaTask(name: string){
        const newId = tasks.length + 1

        const obj = {
            id: newId,
            name: name,
            status: false 
        }

        setTaks([...tasks, obj])
    }
    
    function editaNameTask(id: number, Newname: string){
    }

    function editaStatusTask(id: number) {
        // Procura pela task no array, quando achar inverte o status da task.

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
    }

    return <TaskContext.Provider value={{tasks, adicionaTask, editaNameTask, editaStatusTask, removeTask}}>{children}</TaskContext.Provider>
}