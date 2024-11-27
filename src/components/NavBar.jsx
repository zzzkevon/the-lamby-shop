import React, { useState } from "react";
import bunny from "../images/nav_bunny.png";
import web_title from "../images/web_title.png";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavBar = ({ userRole, setUserRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="main-bg flex justify-between items-center just-another-hand px-4 text-3xl font-medium">
      <nav className="md:block hidden">
        <ul className="flex list-none pt-32 ml-20">
          <li className="mr-4">
            <a href="/">home</a>
          </li>
          <li className="mr-4">
            <a href="/about">about</a>
          </li>
          <li className="mr-4">
            <a href="/shop">shop</a>
          </li>
          <li className="mr-4">
            <a href="/commissions">commissions</a>
          </li>
          <li className="mr-4">
            <a href="/contact">contact</a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          className="text-2xl focus:outline-none"
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      <div style={{ paddingRight: "250px" }}>
        <img src={web_title} alt="" />
        <img src={bunny} alt="" className="ml-20 pb-10" />
      </div>
      <div className="flex pt-32 mr-20">
        <a href="/profile">
          <VscAccount size={25} className="mr-4" />
        </a>

        <a href="/shoppingcart">
          <FiShoppingCart size={25} />
        </a>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 md:hidden">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <a href="/" className="block hover:text-gray-700">
                home
              </a>
            </li>
            <li>
              <a href="/about" className="block hover:text-gray-700">
                about
              </a>
            </li>
            <li>
              <a href="/shop" className="block hover:text-gray-700">
                shop
              </a>
            </li>
            <li>
              <a href="/commissions" className="block hover:text-gray-700">
                commissions
              </a>
            </li>
            <li>
              <a href="/contact" className="block hover:text-gray-700">
                contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
