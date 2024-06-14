'use client'
import React from 'react'
import { Sheet,SheetContent,SheetTrigger} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '../../../constants'
import { usePathname } from 'next/navigation'


const MobileSideBar = () => {
    let pathname = usePathname()

    return (
        <header className='header'>
            <Link href="/" className='flex items-center gap-2 md:py-2'>
                <Image src='/assets/images/ImaginatorLogo.png' width={50} height={40} alt='logo' />
                <p className='font-bold text-2xl '>Imaginator</p>
            </Link>
            <nav className="flex gap-2">
                <SignedIn>
                    <div className=' px-2 py-2 rounded-md bg-slate-200'>
                    <UserButton showName afterSignOutUrl='/' />
                    </div>
                    <Sheet>
                        <SheetTrigger><span className='ml-2'>| | |</span></SheetTrigger>
                        <SheetContent className='sheet-content sm:w-65'>
                            <div className='my-5'>
                                <Image src='/assets/images/ImaginatorLogo.png' width={50} height={40} alt='logo' />
                                <p className='font-bold text-2xl '>Imaginator</p>
                            </div>

                            <ul className='sidebar-nav_elements mt-2'>
                            {navLinks.map((link) => {
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
                        </SheetContent>
                    </Sheet>

                </SignedIn>
                <SignedOut>

                </SignedOut>
            </nav>
        </header>

    )
}

export default MobileSideBar