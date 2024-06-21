import MediaUploder from '@/components/shared/MediaUploder'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <UserButton afterSignOutUrl='/' />
      <MediaUploder />
    </div>
  )
}

export default Home