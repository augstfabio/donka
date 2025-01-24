import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LayoutWithSidebar() {
  const navigate = useNavigate()
  const {user, loading} = useAuth()
  useEffect(() => {
    if (user === null && !loading) {
        navigate('/login')
    }
}, [user])
  return (

    <div className="layout-with-sidebar">
      <Sidebar />
      <div className="content">
        <Outlet /> 
      </div>
    </div>
  )
}
