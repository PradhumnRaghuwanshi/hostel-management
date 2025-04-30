import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ManageRooms from './pages/Admin/ManageRoom'
import RoomAllocation from './pages/Admin/RoomAllocation'
import StudentRequest from './pages/Admin/StudentRequest'
import StudentStatusView from './pages/Admin/StudentStatusView'
import FeeManagement from './pages/Admin/FeeManagement'
import AdminComplaints from './pages/Admin/AdminComplaints'
import Login from './pages/Login'
import AdminSidebar from './pages/Admin/AdminSidebar'
import Settings from './pages/Admin/Settings'
import StudentHomePage from './pages/Student/StudentHomePage'
import FeeStatus from './pages/Student/FeeStatus';
import RoomStatus from './pages/Student/RoomStatus';
import StudentComplaints from './pages/Student/StudentComplaints';
import Signup from './pages/Signup'
import Home from './pages/Home'




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/AdminDashboard' element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path='/ManageRoom' element={<ManageRooms></ManageRooms>}></Route>
        <Route path='/RoomAllocation' element={<RoomAllocation></RoomAllocation>}></Route>
        <Route path='/StudentRequest' element={<StudentRequest></StudentRequest>}></Route>
        <Route path='/StudentStatusView' element={<StudentStatusView></StudentStatusView>}></Route>
        <Route path='/FeeManagement' element={<FeeManagement></FeeManagement>}></Route>
        <Route path='/AdminComplaints' element={<AdminComplaints />} />
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/AdminSidebar' element={<AdminSidebar></AdminSidebar>}></Route>
        <Route path='/Settings' element={<Settings></Settings>}></Route>
        <Route path='/StudentHomePage' element={<StudentHomePage></StudentHomePage>}></Route>
        <Route path='/FeeStatus' element={<FeeStatus></FeeStatus>}></Route>
        <Route path='/RoomStatus' element={<RoomStatus></RoomStatus>}></Route>
        <Route path='/StudentComplaints' element={<StudentComplaints></StudentComplaints>}></Route>
        <Route path='/Signup' element={<Signup></Signup>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
      
  
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
