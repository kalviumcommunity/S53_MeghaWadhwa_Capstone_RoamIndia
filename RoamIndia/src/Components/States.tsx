import React from 'react'
import Navbar from './Navbar'
import Agra from './../assets/Agra.png'

const States: React.FC = () => {
  return (
    <div>
        <Navbar />
        <div className='h-screen'>
        <div className='w-full h-[300px] bg-cover' style={{ backgroundImage: Agra }}>
          <img src={Agra}/>
        </div>
        </div>
    </div>
  )
}

export default States