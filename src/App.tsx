import { useState } from 'react'
import './App.css'
import Tarefas from './components/Tarefas'
import Input from './components/Input'

function App() {
  const [teste, setTeste] = useState<boolean>(true);

  return (
    <div className="conteudo">
      <div className="titulo">
        <h1>Lista de Tarefas</h1>
      </div>
      <div className='div-tarefas'>
        <div className='input-tarefa'>
          <Input value={teste} />
        </div>
        <Tarefas />
      </div>
    </div>  
  )
}

export default App
