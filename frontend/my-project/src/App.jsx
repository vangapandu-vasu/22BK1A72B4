import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './home'
import Signup from './signup'
import Login from './login'

function App() {
  

  return (
    <>
           <BrowserRouter>
        <Routes>
          <Route path='/' element={<Slash/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
