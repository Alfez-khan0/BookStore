import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='h-[75vh] flex'>
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-4x1 lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>
            Discover Your Next Great Read
        </h1>
        <p className='mt-4 text text-x1 text-zinc-300 text-center lg:text-left'>
            Upcover captivating stories, enriching knowledge, and endless 
            inspiration in our curated collection of books 
        </p>
        <div className='mt-8'>
            <Link to="/all-books"
             className='text-yellow-100 text-x1 lg:text-2x1 font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>Dicover Books</Link>
        </div>
      </div>
      <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
        <img src='./hero-bg.png' alt='hero' className='w-[500px] lg:w-[700px] h-auto'/>
      </div>
    </div>
  )
}

export default Hero
