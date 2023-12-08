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
    const [tasks, setTaks] = useState<Task[]>([]); 

    function adicionaTask(name: string){
    }
    
    function editaNameTask(id: number, Newname: string){
    }

    function editaStatusTask(id: number){
    }

    function removeTask(id: number){
    }

    return <TaskContext.Provider value={{tasks, adicionaTask, editaNameTask, editaStatusTask, removeTask}}>{children}</TaskContext.Provider>
}