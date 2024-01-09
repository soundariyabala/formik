import React from 'react'
import AddUser from './components/AddUser'
import Batch from './components/Batch'
import Class from './components/Class'
import Dashboard from './components/Dashboard'
import EditUser from './components/EditUser'
import Query from './components/Query'
import SideBar from './components/SideBar'
import User from './components/User'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'




function App() {
  return <div id="wrapper">
<BrowserRouter>
<SideBar/>

<Routes>
  <Route path='/dashboard' element={<Dashboard/>}></Route>
  <Route path='/adduser' element={<AddUser/>}></Route>
  <Route path='/edituser/:id' element={<EditUser/>}></Route>
      <Route path='/batch' element={<Batch/>}>
           <Route path='user' element={<User/>}></Route>
           <Route path='class' element={<Class/>}></Route>
           <Route path='query' element={<Query/>}></Route>
      </Route>
  <Route path='*' element={<Navigate to='/dashboard'/>}></Route>

</Routes>
</BrowserRouter>

  </div>
}

export default App