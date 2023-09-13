import React from 'react'
import UserDropdownView from './UserDropdownView'

function UserDropdown() {

    const handleLogOut =()=>{
        sessionStorage.clear();
        window.location="/login";
    }
    return (
        <>
            <UserDropdownView handleLogOut={handleLogOut} />
        </>
    )
}

export default UserDropdown