import React, { useContext, useState } from 'react'
import DashboardGralManager from './Views/DashboardGralManager';
import NavbarView from '../Layout/Navbar/NavbarView';
import SidebarViewManager from './Views/Sidebar/SidebarViewManager';
import TableObjetiveManager from './Views/Objetive/TableObjetiveManager';
import TableDocumentsManager from './Views/Documents/TableDocumentsManager';
import TableSACManager from './Views/SAC/TableSACManager';
import DashboardGralView from '../Layout/Dashboards/DashboardGralView';

function LayoutMainManager() {
    const [selectedComponent, setSelectedComponent] = useState('dashboard');
    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'dashboard':
                return <DashboardGralView/>;
            case 'documents':
                return <TableDocumentsManager />
            case 'objetive':
                return <TableObjetiveManager />
                case 'sac':
                return <TableSACManager />
            default:
                return null;
        }
    };
    return (
        <>
            <div className='grid grid-cols-7 w-screen h-screen fixed left-0 top-0 right-0'>
                <div className='z-50 col-span-1'>
                    <SidebarViewManager selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} />
                </div>
                <div className='z-1 col-span-6 overflow-y-scroll bottom-0'>
                    <div className='z-20 sticky right-0 left-0 top-0'>
                        <NavbarView />
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

export default LayoutMainManager