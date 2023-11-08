import React, { useContext, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import DashboardGral from '../Dashboards/DashboardGral'
import { SGIContext } from '../../Context/SGIContext'
import ManagerView from '../../View/TableManagers/ManagerView'
import TableDocumentsView from '../../View/TableDocuments/TableDocumentsView'
import TableObjetiveView from '../../View/TableObjetive/TableObjetiveView'
import SidebarView from '../Sidebar/SidebarView'
import TableSacView from '../../View/TableSAC/TableSacView'

function LayoutMain() {
    const { selectedComponent } = useContext(SGIContext);
    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'dashboard':
                return <DashboardGral />;
            case 'users':
                return <ManagerView />;
            case 'documents':
                return <TableDocumentsView />
            case 'objetive':
                return <TableObjetiveView />
            case 'sac':
                return <TableSacView/>
            default:
                return null;
        }
    };
    return (
        <>
            <div className='grid grid-cols-7 w-screen h-screen fixed left-0 top-0 right-0'>
                <div className='z-50 col-span-1'>
                    <SidebarView />
                </div>
                <div className='z-1 col-span-6 overflow-y-scroll bottom-0'>
                    <div className='z-20 sticky right-0 left-0 top-0'>
                        <Navbar />
                    </div>
                    <div className=' mb-1'>
                        <div className=''>
                            {renderSelectedComponent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutMain