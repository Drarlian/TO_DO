import { useState, useContext } from 'react'
import { TaskContext } from '../../contexts/TaskContext'
import './style.css'

function Tarefas() {

    const {tasks, editaStatusTask} = useContext(TaskContext);
    
    return (
    <div className='lista-tarefas'>
        {tasks.map((e) => (
            <label key={e.id} className='input-check' style={{textDecoration: e.status? 'line-through': 'none'}}>
                <input type='checkbox' onChange={() => editaStatusTask(e.id)}></input>
                {e.name}
            </label>
        ))}
    </div>  
    )
}

export default Tarefas
