import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Slash from './slash'
import Home from './home'
import Signup from './signup'
import Login from './loginp'

function App() {
  

  return (
    <>
           <BrowserRouter>
        <Routes>
          <Route path='/' element={<Slash/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/loginp' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
