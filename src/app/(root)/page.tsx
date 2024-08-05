import MediaUploder from '@/components/shared/MediaUploder'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { navLinks } from '../../../constants'
import Link from 'next/link'
import Image from 'next/image'
import { Collection } from '@/components/shared/Collection'
import { getAllImages } from '@/lib/actions/imageAction'

const Home = async ({searchParams}:SearchParamProps) => {
  const page=Number(searchParams?.page) || 1
  const searchQuery=(searchParams?.query as String) || ''

  const images=await getAllImages({page,searchQuery})
  return (
    <>
      <section className='home'>
        <h1 className='home-heading'>Create your Ideas here</h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((links) => (
            <Link key={links.route} href={links.route} className="flex-center flex-col gap-2 text-bold text-white">
              <li className='flex-center w-fit rounded-full bg-white p-4'>
                <Image src={links.icon} width={24} height={24} alt="icons"/>
              </li>
                <p>{links.label}</p>
            </Link>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <Collection hasSearch={true} images={images?.data} totalPages={images?.totalPages} page={page}/>
      </section>
    </>
  )
}

export default Home