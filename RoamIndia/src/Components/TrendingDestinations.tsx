import React from 'react'
import { InfiniteMovingCards } from './infinite-moving-cards'
import Agra from './../assets/Agra.png'
import Assam from './../assets/Assam.png'
import ArunachalPradesh from './../assets/ArunachalPradesh.png'
import Delhi from './../assets/Delhi.png'
import TamilNadu from './../assets/TamilNadu.png'
import Goa from './../assets/Goa.png'
import { Link } from 'react-router-dom'

const TrendingDestinations: React.FC = () => {
    const testimonials = [
        {
            image: Agra,
            name: "Agra",
        },
        {
            image: ArunachalPradesh,
            name: "Arunachal Pradesh",
        },
        {
            image: Assam,
            name: "Assam",
        },
        {
            image: TamilNadu,
            name: "Tamil Nadu",
        },
        {
            image: Delhi,
            name: "Delhi",
        },
        {
            image: Goa,
            name: "Goa",
        },
    ];
    return (
        <div className=' pt-20 px-6 lg:px-20 md:px-16'>
            <div className='flex justify-between'>
                <h1 className='text-[#0C3A25] text-xl md:text-4xl asul-regular'>Trending Destinations</h1>
                <Link to="/alldestinations"><button className='btn text-sm text-white'>View All Destinations</button></Link>
            </div>
            <div className="h-[25rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="normal"
                />
            </div>
        </div>
    )
}

export default TrendingDestinations