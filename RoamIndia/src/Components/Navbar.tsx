import React from "react";
import Logo from "./../assets/RoamIndiaLogo.png";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";

const Navbar: React.FC = () => {
  return (
    <div>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52"
            >
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Contact Us</a>
              </li>
              <li>
                <a>Restaurants</a>
              </li>
              <li>
                <a>Hotels</a>
              </li>
            </ul>
          </div>
          {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
          <img src={Logo} alt="Logo" className="w-20" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black text-lg jacques-francois-regular">
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Contact Us</a>
            </li>
            <li>
              <a>Restaurants</a>
            </li>
            <li>
              <a>Hotels</a>
            </li>
            <li>
              <a></a>
            </li>
          </ul>
        </div>
        <button className="inline-flex text-white h-24 py-2.5 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Sign up
        </button>

      </div>
    </div>
  );
};

export default Navbar;
