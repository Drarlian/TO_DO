import { useState } from 'react'
import './App.css'
import Tarefas from './components/Tarefas'

function App() {

  return (
    <div className="conteudo">
      <div className="titulo">
        <h1>Lista de Tarefas</h1>
      </div>
      <div className='div-tarefas'>
        <div className='input-tarefa'>
          <input placeholder='Adicione uma tarefa aqui...' className='teste-input'></input>
        </div>
        <Tarefas />
      </div>
    </div>  
  )
}

export default App
