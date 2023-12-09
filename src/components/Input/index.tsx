import './style.css'
import {useContext, useState, KeyboardEvent, ChangeEvent} from 'react';
import { TaskContext } from '../../contexts/TaskContext';

interface InputProps {
    value: boolean;
}

export function Input(tipo: InputProps){

    const {adicionaTask, editaNameTask} = useContext(TaskContext);
    const [valorInput, setValorInput] = useState<string>('');

    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter'){
            if (tipo){
                if (valorInput != ''){
                    adicionaTask(valorInput);  // Adiciona a lista de task
                    setValorInput('');
                }
            } else{
                return undefined  // Atualizar uma task
            }
        }
    }

    return (
        <>
            {tipo.value? (
                <input type="text" value={valorInput} onChange={(e) => setValorInput(e.target.value)} onKeyDown={keyPress} placeholder='Adicione uma tarefa aqui...' className='teste-input'></input>
            ): (
                <input type="text" value={valorInput} onChange={(e) => setValorInput(e.target.value)} onKeyDown={keyPress} placeholder='Edite sua tarefa...' className='teste-input'></input>
            )}
        </>
    )
}

export default Input