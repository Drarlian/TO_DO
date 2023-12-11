import './App.css'
import Tarefas from './components/Tarefas'
import Input from './components/Input'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="conteudo">
      <ToastContainer/>
      <div className="titulo">
        <h1>Lista de Tarefas</h1>
      </div>
      <div className='div-tarefas'>
        <div className='input-tarefa'>
          <Input />
        </div>
        <Tarefas />
      </div>
    </div>  
  )
}

export default App
