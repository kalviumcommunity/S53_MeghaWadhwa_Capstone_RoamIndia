import React from "react";
import Phone from './../assets/Phone.png'
import Email from './../assets/Email.png'
import Location from './../assets/Location.png'
import Logo from './../assets/RoamIndiaBigLogo.png'

const Footer: React.FC = () => {
  const date = new Date().getFullYear()

  return (
    <div className="bg-[#133039] text-white px-20">
      <div className=" flex  justify-between p-7 items-center">
        <div className="flex gap-3">
          <div className="border-r-[0.2px] pr-3 asul-regular text-lg">ROAM INDIA</div>
          <div className="text-sm">DISCOVER
            <br /> THE SOUL OF INDIA</div>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-10">
            <div className="flex gap-2">
              <img src={Phone} className="w-5" />
              <div>+91 839-696-9870</div>
            </div>
            <div className="flex gap-2">
              <img src={Email} className="w-5" />
              <div>meghawadhwa20@gmail.com</div>
            </div>
          </div>
          <div className="flex">
            <img src={Location} className="w-5" />
            <div>Lovely Professional University, Phagwara, Jalandhar, Punjab</div>
          </div>
        </div>
      </div>
      <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 lg:mb-8" />
      <div className="flex">
        <div>
          <img src={Logo} alt="" className="w-6/12 ml-20" />
        </div>
        <form className="w-4/12 flex flex-col gap-10">
          <div className="relative z-0 w-full">
            <input
              type="text"
              id="name_input"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-[#4BD4FF] focus:outline-none focus:ring-0 focus:border-[#4BD4FF] peer "
              placeholder=""
            />
            <label
              htmlFor="name_input"
              className="absolute text-xl  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#4BD4FF] peer-focus:dark:text-[#4BD4FF]peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Name (Required)
            </label>
          </div>
          <div className="relative z-0 w-full">
            <input
              type="text"
              id="email_input"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-[#4BD4FF] focus:outline-none focus:ring-0 focus:border-[#4BD4FF] peer "
              placeholder=""
            />
            <label
              htmlFor="email_input"
              className="absolute text-xl  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#4BD4FF] peer-focus:dark:text-[#4BD4FF]peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Email (Required)
            </label>
          </div>
          <div className="relative z-0 w-full">
            <input
              type="text"
              id="message_input"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-[#4BD4FF] focus:outline-none focus:ring-0 focus:border-[#4BD4FF] peer "
              placeholder=""
            />
            <label
              htmlFor="message_input"
              className="absolute text-xl  text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#4BD4FF] peer-focus:dark:text-[#4BD4FF]peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              How can we help you?  (Required)
            </label>
          </div>
          <button className="btn text-white bg-black w-40">Submit</button>
        </form>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {date} RoamIndia. All Rights Reserved. | Designed by Megha Wadhwa</span>
    </div>
  );
};

export default Footer;
