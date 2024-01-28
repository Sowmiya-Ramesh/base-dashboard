import React from 'react'
import './Dashboard.scss'
import SideBar from './SideBar'
import Header from './Header'
import FileUpload from './FileUpload'


const Dashboard = () => {
  return (
    <div className='dashboardContainer'>
      <SideBar />
      <div className='landingPage'>
        <Header />
        <FileUpload />
      </div>
    </div>
  )
}

export default Dashboard
