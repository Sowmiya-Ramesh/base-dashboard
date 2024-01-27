import React from 'react';
import './SideBar.scss';
import { Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
export const SideBarData = [{
    title: 'Dashboard',
    icon: <DashboardIcon />,
}, {
    title: 'Upload',
    icon: <AssessmentIcon />,
}, {
    title: 'Invoice',
    icon: <AssessmentIcon />,
}, {
    title: 'Schdeule',
    icon: <AssessmentIcon />,
}, {
    title: 'Calendar',
    icon: <AssessmentIcon />,
}, {
    title: 'Notification',
    icon: <AssessmentIcon />,
}, {
    title: 'Settings',
    icon: <AssessmentIcon />,
}]


const SideBar = () => {
    console.log(SideBarData)
    {
        SideBarData.map((e, index) => {
            console.log(index, e.title)
        })
    }
    return (
        <div className='sideBar'>
            <div className='sideBarLogo'>
                <TimelineRoundedIcon />BASE
            </div>
            <ul className='sideBarList'>
                {SideBarData.map((e, index) => (
                    <li className='sideBarRow' key={index}>
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