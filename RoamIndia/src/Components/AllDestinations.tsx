import React, { useEffect, useState } from 'react';
import AllDestinationsBg from './../assets/AllDestinationsBg.png';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

interface DataItem {
  Image: string;
  State_Name: string;
}

const AllDestinations: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([])

  const BgImage = `url(${AllDestinationsBg})`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://s53-meghawadhwa-capstone-roamindia.onrender.com/api/states");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <Navbar />
      <div className='mx-6'>
        <div className='flex justify-center h-screen'>
          <div className={`bg-cover w-10/12 p-12 rounded-2xl mt-10`} style={{ backgroundImage: BgImage }}>
            <div className="text-black text-center p-5">
              <form className="max-w-md h-4/12 mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search" className="drop-shadow-2xl block w-full p-3 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none" placeholder="Search..." required />
                  <button type="submit" className="text-white absolute end-0 bottom-0 bg-[#42A69A] hover:bg-[#359388] focus:ring-3 focus:outline-none focus:ring-blue-300 font-sm rounded-r-lg text-md px-8 py-2.5">Search</button>
                </div>
              </form>
              <div>
                <h1 style={{ textShadow: "1px 1px 4px #000000bf" }} className='drop-shadow-sm bentham-regular text-center text-5xl text-white m-12'>Lifelong memories,
                  <br /> Just a few
                  <br />seconds away</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='py-20'>
          <form className="max-w-4xl ml-20">
            <label className='text-[#386367] text-3xl asul-regular'>Filter places by</label>
            <select id="countries" className="bg-gray-50 drop-shadow-md border-none text-gray-900 text-sm rounded-md block w-full p-3.5 mt-6">
              <option >Most Popular</option>
              <option>Region</option>
              <option selected>State</option>
              <option>City</option>
            </select>
          </form>
        </div>
        <div>
          <div className='grid grid-cols-3 w-12/12 justify-center items-center mx-16 content-center gap-16 '>
            {data.map((e,i)=>{
              return (
                <div key={i}>
                <div style={{ backgroundImage: `url(${e.Image})` }} className="rounded-lg bg-no-repeat bg-cover min-w-64 min-h-64"></div>
                <h1 className='text-[#640000] asul-regular text-xl text-center mt-2'>{e.State_Name}</h1>
              </div>
              )
            })}
          </div>
          <nav className="flex items-center justify-center -space-x-px h-12 text-md m-20">
            <ul className="flex items-center -space-x-px h-12 text-md">
              <li>
                <a href="#" className="flex items-center justify-center p-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                  <span className="sr-only">Previous</span>
                  <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center p-3 h-8 px-5 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-5 p-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 e">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="z-10 flex items-center justify-center p-3 h-8 leading-tight text-[#359388B3] border border-[#359388] bg-[#3593881A] hover:bg-[#35938866]  hover:text-[#359388FF] px-5">3</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center p-3 px-5 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">4</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center p-3 px-5 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">5</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center p-3 px-5 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                  <span className="sr-only">Next</span>
                  <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9 5 5l-4-4" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllDestinations;
