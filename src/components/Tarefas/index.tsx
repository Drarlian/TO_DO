import { useContext } from 'react'
import { TaskContext } from '../../contexts/TaskContext'
import './style.css'
import { Task } from '../../contexts/TaskContext';

function Tarefas() {

    const {tasks, estadoInput ,setEstadoInput, setObjInput, editaStatusTask, removeTask} = useContext(TaskContext);

    function alteraValores(obj: Task){
        // Altera o valor do Input e do ObjInput
        setEstadoInput(!estadoInput);
        setObjInput(obj);
    }
    
    return (
    <div className='lista-tarefas'>
        {tasks.map((e) => (
            <div className='lista-elementos' key={e.id}>
                <label className='input-check' style={{textDecoration: e.status? 'line-through': 'none'}}>
                    <input type='checkbox' onChange={() => editaStatusTask(e.id)} checked={e.status}/>
                    {e.name}
                </label>
                <div className="lista-botoes">
                    <button onClick={() => alteraValores(e)}>Edit</button>
                    <button onClick={() => removeTask(e.id)}>Del</button>
                </div>
            </div>
            
        ))}
    </div>  
    )
}

export default Tarefas
