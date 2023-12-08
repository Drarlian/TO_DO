import { useState, useContext } from 'react'
import { TaskContext } from '../../contexts/TaskContext'
import './style.css'

function Tarefas() {

    const {tasks} = useContext(TaskContext);

    return (
    <div className='lista-tarefas'>
        {tasks.map((e) => (
            <input type='checkbox'>{e.name}</input>
        ))}
    </div>  
    )
}

export default Tarefas
