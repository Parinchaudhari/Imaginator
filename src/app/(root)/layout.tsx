import MobileSideBar from '@/components/shared/MobileSideBar'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='root'>
            <MobileSideBar/>
            <Sidebar/>
            <div className="root-container">
                <div className="wrapper">
                    {children}
                </div>
            </div>
        </main>
    )
}
export default Layout