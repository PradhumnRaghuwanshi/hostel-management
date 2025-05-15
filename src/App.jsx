import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RoomManagementPage from './pages/Admin/RoomManagementPage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import StudentManagementPage from './pages/Admin/StudentManagementPage'
import AdminComplaints from './pages/Admin/AdminComplaints'
import RentManagementPage from './pages/Admin/RentManagementPage'
import UtilityBillPage from './pages/Admin/UtilityBillPage'
import NoticesPage from './pages/Admin/NoticesPage'
import Settings from './pages/Admin/Settings'
import MessManagementPage from './pages/Admin/MessManagementPage'
import StudentComplaints from './pages/Student/StudentComplaints'







function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/Signup' element={<Signup></Signup>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/AdminDashboard' element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path="/RoomManagementPage" element={<RoomManagementPage />} />
        <Route path="/StudentRequest" element={<StudentManagementPage />} />
        <Route path="/AdminComplaints" element={<AdminComplaints />} />
        <Route path="/RentManagementPage" element={<RentManagementPage />} />
        <Route path="/Utilities" element={<UtilityBillPage />} />
        <Route path="/Mess" element={<MessManagementPage />} />
        <Route path="/Notices" element={<NoticesPage />} />
        <Route path="/Settings" element={<Settings/>} />
        <Route path="/Studentcomplaints" element={<StudentComplaints/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
