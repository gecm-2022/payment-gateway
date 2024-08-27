import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import IconWithCaption from '../Components/IconWithCaption'
import Intro from '../Components/Intro'
import Body from '../Components/Body'

const Home = () => {
  return (
    <div className='text-white bg-sky-600'>
    {/* <Navbar className='bg-white' /> */}
    <div className='max-sm:px-[20px]'>
      <Hero />
    <div className="flex flex-col justify-between">
      <IconWithCaption />
    </div>
    <div className="py-10">
      <Intro />
    </div>
    <div className="">
      <Body />
    </div>
    </div>
  
  </div>
  )
}

export default Home
