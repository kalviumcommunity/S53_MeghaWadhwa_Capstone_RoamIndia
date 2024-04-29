import React from 'react'
import FoodBg from './../assets/FoodCuisinesBg.png';
import Navbar from './Navbar';
import Lakshwadeep from './../assets/LakshwadeepDestination.png'
import Delhi from './../assets/DelhiDestination.png'
import Sikkim from './../assets/SikkimDestination.png'
import Goa from './../assets/GoaDestination.png'
import DalLakeSrinagar from './../assets/DalLakeSrinagar.png'
import ArunachalPradesh from './../assets/ArunachalPradeshDestination.png'
import Footer from './Footer';

const Restaurants: React.FC = () => {
  const BgImage = `url(${FoodBg})`;

  return (
    <div>
      <Navbar />
      <div className='mx-6'>
        <div className='flex justify-center h-screen'>
          <div className={`bg-cover w-10/12 p-20 rounded-2xl mt-10`} style={{ backgroundImage: BgImage }}>
            <div>
              <h1 style={{ textShadow: "1px 1px 4px #000000bf" }} className='drop-shadow-sm asul-regular text-center text-5xl font-bold text-white mt-16'>FOODS & CUISINES</h1>
              <h1 style={{ textShadow: "1px 1px 4px #000000bf" }} className='drop-shadow-sm asul-regular text-center text-xl font-bold text-white mt-4 mb-16'>THE FLAVORS OF INDIA</h1>
            </div>
          </div>
        </div>
        <div className='py-20'>
          <form className="max-w-4xl ml-20">
            <label className='text-[#386367] text-3xl asul-regular'>Filter Restaurants by</label>
            <select id="countries" className="bg-gray-50 drop-shadow-md border-none text-gray-900 text-sm rounded-md block w-full p-3.5 mt-6">
              <option value={"Region"} selected>Region</option>
              <option value={"FamousAttractions"}>Famous Attractions Nearby</option>
              <option value={"State"}>State</option>
              <option value={"City"}>City</option>
            </select>
          </form>
        </div>
        <div>
          <div className='grid grid-cols-3 w-11/12 justify-center items-center ml-16 content-center gap-20 '>
            <div>
              <div style={{ backgroundImage: `url(${Lakshwadeep})` }} className="rounded-lg bg-no-repeat bg-cover min-w-64 min-h-64"></div>
              <h1 className='text-[#640000] asul-regular text-2xl text-center mt-2'>Lakshwadeep</h1>
            </div>
            <div>
              <div style={{ backgroundImage: `url(${Delhi})` }} className="rounded-lg bg-no-repeat bg-cover min-w-64 min-h-64"></div>
              <h1 className='text-[#640000] asul-regular text-2xl text-center mt-2'>Delhi</h1>
            </div>
            <div>
              <div style={{ backgroundImage: `url(${Goa})` }} className="rounded-lg bg-no-repeat bg-cover min-w-64 min-h-64"></div>
              <h1 className='text-[#640000] asul-regular text-2xl text-center mt-2'>Goa</h1>
            </div>
            <div>
              <div style={{ backgroundImage: `url(${DalLakeSrinagar})` }} className="rounded-lg bg-no-repeat bg-cover min-w-64 min-h-64"></div>
              <h1 className='text-[#640000] asul-regular text-2xl text-center mt-2'>Dal Lake, Srinagar</h1>
            </div>
            <div>
              <div style={{ backgroundImage: `url(${Sikkim})` }} className="rounded-lg bg-no-repeat bg-cover min-w-64 min-h-64"></div>
              <h1 className='text-[#640000] asul-regular text-2xl text-center mt-2'>Sikkim</h1>
            </div>
            <div>
              <div style={{ backgroundImage: `url(${ArunachalPradesh})` }} className="rounded-lg bg-no-repeat bg-cover min-w-64 min-h-64"></div>
              <h1 className='text-[#640000] asul-regular text-2xl text-center mt-2'>Arunachal Pradesh</h1>
            </div>
          </div>
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
      <Footer />
    </div>
  ) 
}

export default Restaurants