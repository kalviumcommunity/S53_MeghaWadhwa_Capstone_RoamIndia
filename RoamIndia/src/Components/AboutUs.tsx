import React from 'react'
import { TextGenerateEffect } from './text-generate-effect'

const AboutUs: React.FC = () => {
  const words = "RoamIndia is your ultimate travel companion, designed exclusively for visitors and travelers exploring the enchanting landscapes of India. Whether you're a family seeking adventure, a couple in search of romance, or a solo traveler on a journey of self-discovery, RoamIndia offers personalized trip planning and detailed city guides to unlock the essence of India's rich cultural tapestry."
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h1 className='text-[#24758F] asul-regular mt-20 text-4xl lg:text-6xl'>About Us</h1>
      <TextGenerateEffect words={words} className=' flex w-full items-center justify-center lg:mb-20'/>
    </div>
  )
}

export default AboutUs