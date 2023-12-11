import './style.css'
import {useContext, useState, KeyboardEvent} from 'react';
import { TaskContext } from '../../contexts/TaskContext';

export function Input(){

    const {estadoInput, setEstadoInput, objInput, setObjInput, adicionaTask, editaNameTask} = useContext(TaskContext);
    const [valorInput, setValorInput] = useState<string>('');  // Valor do Input Normal, posteriormente será adicionado as tarefas.

    const keyPressNormal = (event: KeyboardEvent<HTMLInputElement>) => {
        // Ação a ser executada quando o 'Enter' for apertado durante o Input Normal.
        if (event.key === 'Enter'){
            if (valorInput != ''){
                adicionaTask(valorInput);  // Adiciona a task na lista.
                setValorInput('');
            }
        }
    }

    const keyPressEdit = (event: KeyboardEvent<HTMLInputElement>) => {
        // Ação a ser excutada quando o 'Enter' for apertado durante o Input de Edição.
        if (event.key === 'Enter'){
            if (objInput.name != ''){
                editaNameTask();  // Adiciona a task na lista.
                setEstadoInput(!estadoInput);
            }
        }
    }

    return (
        <>
            {estadoInput? (
                <input type="text" value={valorInput} onChange={(e) => setValorInput(e.target.value)} onKeyDown={keyPressNormal} placeholder='Adicione uma tarefa aqui...' className='teste-input'></input>
            ): (
                <input type="text" value={objInput.name} onChange={(e) => setObjInput({...objInput, name: e.target.value})} onKeyDown={keyPressEdit} placeholder='Edite sua tarefa...' className='teste-input'></input>
            )}
        </>
    )
}

export default Input
