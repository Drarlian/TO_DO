import {createContext, useState} from 'react';
import {ReactNode} from 'react';
import { toast } from 'react-toastify';

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
    const [tasks, setTaks] = useState<Task[]>(pegarLocal()); // Array de Objetos, onde cada objeto é uma tarefa.

    const [estadoInput, setEstadoInput] = useState<boolean>(true);  // Define se o Input vai estar em Modo Normal ou Modo de Edição.
    const [objInput, setObjInput] = useState<Task>({
        id: 0,
        name: 'None',
        status: false
    });  // Objeto contendo a tarefa que será editada no Input de Edição.

    function adicionaTask(name: string){
        //  Adiciona um tarefa ao array de tarefas.

        let newId;

        if (tasks.length == 0){
            newId = 1;
        } else{
            newId = tasks.slice(-1)[0].id + 1;
        }

        const obj = {
            id: newId,
            name: name,
            status: false,
        }

        setTaks(() => {
            salvarLocal([...tasks, obj]);
            return [...tasks, obj];
        })

        toast.success('Tarefa Adicionada com Sucesso');
    }
    
    function editaNameTask(){
        /* 
            Altera a tarefa que possui o id informado. 
            O id para busca e o novo nome estão presentes no objInput.
        */

        let tarefasAlteradas = tasks.map((tarefa) => {
            if (tarefa.id === objInput.id){
                return {...tarefa, name: objInput.name};
            }
            return tarefa;
        })

        setTaks(() => {
            salvarLocal(tarefasAlteradas);
            return tarefasAlteradas;
        } )

        toast.warning('Tarefa Editada com Sucesso');
    }

    function editaStatusTask(id: number) {
        // Procura pela tarefa no array, quando achar inverte o status da task.
        let tarefasAlteradas = tasks.map((tarefa) => {
            if (tarefa.id === id) {
                return { ...tarefa, status: !tarefa.status };
            }
                return tarefa;
        })

        setTaks(() => {
            salvarLocal(tarefasAlteradas);
            return tarefasAlteradas
        });
      }

    function removeTask(id: number){
        // Remove uma tarefa baseada no id.

        if (!estadoInput && id === objInput.id){  
            // Troca de volta para o Input Normal caso esteja no Input de Edição e a tarefa removida foi a que está sendo editada.
            setEstadoInput(!estadoInput);
        }
        const newObj = tasks.filter((tarefa) => tarefa.id !== id);
        setTaks(() => {
            salvarLocal(newObj);
            return newObj;
        });

        toast.error('Tarefa Deletada com Sucesso')
    }

    function salvarLocal(task: Task[]){
        // Salva as tarefas no LocalStorage.

        localStorage.setItem('tarefas', JSON.stringify(task));
    }

    function pegarLocal(){
        // Pega as tarefas salvas no LocalStorage.

        let tarefasLocais = localStorage.getItem('tarefas');
        if (tarefasLocais){
            return JSON.parse(tarefasLocais);
        }
        return [];
    }

    return <TaskContext.Provider value={{tasks, estadoInput, setEstadoInput, objInput, setObjInput, adicionaTask, editaNameTask, editaStatusTask, removeTask}}>{children}</TaskContext.Provider>
}
