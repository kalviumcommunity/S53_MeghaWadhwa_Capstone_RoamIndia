import React, { useEffect, useState } from 'react'
import { InfiniteMovingCards } from './infinite-moving-cards'
import Agra from './../assets/Agra.png'
import Assam from './../assets/Assam.png'
import ArunachalPradesh from './../assets/ArunachalPradesh.png'
import Delhi from './../assets/Delhi.png'
import TamilNadu from './../assets/TamilNadu.png'
import Goa from './../assets/Goa.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

const TrendingDestinations: React.FC = () => {
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("https://s53-meghawadhwa-capstone-roamindia.onrender.com/api/states");
    //             setData(response.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    const testimonials = [
        {
            Image: Agra,
            State_Name: "Agra",
        },
        {
            Image: ArunachalPradesh,
            State_Name: "Arunachal Pradesh",
        },
        {
            Image: Assam,
            State_Name: "Assam",
        },
        {
            Image: TamilNadu,
            State_Name: "Tamil Nadu",
        },
        {
            Image: Delhi,
            State_Name: "Delhi",
        },
        {
            Image: Goa,
            State_Name: "Goa",
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