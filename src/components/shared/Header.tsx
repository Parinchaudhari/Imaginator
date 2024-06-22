import React from 'react'

const Header = ({title,subtitle}:{title:string,subtitle?:string}) => {
  return (
    <>
        <h2 className='h2-bold text-dark-700 mx-4 lg:mx-0'>{title}</h2>
        {subtitle && <p className='p-16-regular mt-4 mx-4 lg:mx-0'>{subtitle}</p>}
    </>
  )
}

export default Header