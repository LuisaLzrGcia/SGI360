import React, { useContext, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import DashboardGral from '../Dashboards/DashboardGral'
import Tables from '../Tables/Tables'
import { SGIContext } from '../../Context/ContextGlobal'
import TableUsers from '../../View/TableUsers/TableUsers'

function LayoutMain() {
    const { selectedComponent } = useContext(SGIContext);
    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'dashboard':
                return <DashboardGral />;
            case 'tables':
                return <Tables />;
            case 'users':
                return <TableUsers/>;
            default:
                return null;
        }
    };
    return (
        <>
            <div className='grid grid-cols-7 w-screen h-screen fixed left-0 top-0 right-0'>
                <div className='z-50 col-span-1'>
                    <Sidebar />
                </div>
                <div className='z-1 col-span-6 overflow-y-scroll'>
                    <div className='z-20 sticky right-0 left-0 top-0'>
                        <Navbar />
                    </div>
                    <div className=''>
                        <div className='h-52'>
                            {renderSelectedComponent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutMain