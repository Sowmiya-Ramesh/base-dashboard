import React from 'react';
import './SideBar.scss';
import { Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useNavigate } from 'react-router-dom';

export const SideBarData = [{
    title: 'Dashboard',
    icon: <DashboardIcon />,
}, {
    title: 'Upload',
    icon: <AssessmentIcon />,
}, {
    title: 'Invoice',
    icon: <SpaceDashboardIcon />,
}, {
    title: 'Schdeule',
    icon: <DescriptionIcon />,
}, {
    title: 'Calendar',
    icon: <CalendarMonthIcon />,
}, {
    title: 'Notification',
    icon: <NotificationsNoneIcon />,
}, {
    title: 'Settings',
    icon: <SettingsIcon />,
}]


const SideBar = () => {
    
    const navigate = useNavigate();

    return (
        <div className='sideBar'>
            <div className='sideBarLogo' onClick={()=> navigate('/')} style={{cursor:'pointer'}}>
                <TimelineRoundedIcon sx={{backgroundColor: '#605bff', borderRadius:'50% 50%', width:'40px', height:'40%' ,color:'white'}}/>
                <Typography variant='h6'>BASE</Typography>
            </div>
            <ul className='sideBarList'>
                {SideBarData.map((e, index) => (
                    <li key={index}  className='sideBarRow' style={{color: e.title === 'Upload' ? '#605BFF' : '#9A9AA9', cursor: e.title === 'Upload' ? 'pointer' :'' }}>
                        <div className="listContainer">
                        <div className='icon'>{e.icon}</div>
                        <Typography className='title'>{e.title}</Typography>
                        </div>
                    </li>
                ))}

            </ul>

        </div>
    )
}

export default SideBar