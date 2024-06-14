'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '../../../constants'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"


const Sidebar = () => {
    let pathname = usePathname()
    return (
        <aside className='sidebar'>
            <div className="flex size-full flex-col gap-4">
                <Link href='/' className='sidebar-logo'>
                    <Image src='/assets/images/ImaginatorLogo.png' width={50} height={40} alt='logo' />
                    <p className='font-bold text-2xl '>Imaginator</p>
                </Link>

                <nav className='sidebar-nav'>
                    <SignedIn>
                        <ul className='sidebar-nav_elements'>
                            {navLinks.slice(0, 6).map((link) => {
                                const isActive = link.route === pathname
                                return (
                                    <li key={link.route} className={`sidebar-nav_element group border-r-4 ${isActive ? "bg-black text-white" : "text-black"}`}>

                                        <Link href={link.route} className='sidebar-link'>
                                            <Image src={link.icon} height={28} width={28} alt='icon' className='pr-2' />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        <ul>
                            {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname
                                return (
                                    <li key={link.route} className={`sidebar-nav_element group border-r-4 ${isActive ? "bg-black text-white" : "text-black"}`}>

                                        <Link href={link.route} className='sidebar-link'>
                                            <Image src={link.icon} height={28} width={28} alt='icon' className='pr-2' />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}

                            <li className='flex-center cursor-pointer gap-2 p-4'>
                                <UserButton showName afterSignOutUrl='/' />
                            </li>
                        </ul>

                    </SignedIn>
                    <SignedOut>
                        <Button className='bg-black'>
                            <Link href='sign-in'>Login</Link>
                        </Button>
                    </SignedOut>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar